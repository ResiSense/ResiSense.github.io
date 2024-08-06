import fuzzysort from 'fuzzysort';
import { IndexableFields, SearchTarget } from '../lib/types/Searchable';

const SEARCH_RESULTS_HIGHLIGHT_CLASS = 'highlight';

enum SearchMode {
    NORMAL = 'normal',
    TITLE = 'title',
    CONTENT = 'content',
    // HEADING = 'heading',
};
const SEARCH_PREFIX: Map<string, SearchMode> = Object.freeze(
    new Map([
        ['!', SearchMode.TITLE],
        [':', SearchMode.CONTENT],
        // ['#', SearchMode.HEADING],
    ])
);
const SEARCH_KEYS: Map<SearchMode, string[]> = Object.freeze(
    new Map([
        [SearchMode.NORMAL, [IndexableFields.TITLE, IndexableFields.CONTENT]],
        [SearchMode.TITLE, [IndexableFields.TITLE]],
        [SearchMode.CONTENT, [IndexableFields.CONTENT]],
        // [SearchMode.HEADING, [IndexableFields.HEADING]],
    ])
);

type CompiledSearchResult = {
    path: string;
    score: number;
    title: string;
    highlightedTitleChunks: string[];
    highlightedContentChunks: string[];
};

export type SearchResponse = {
    searchMode: SearchMode;
    results: CompiledSearchResult[];
    usedCache: boolean;
    aborted: false;
} | {
    aborted: true;
};

const searchResultsCache: Map<string, CompiledSearchResult[]> = new Map();
async function doSearch(query: string, searchTargets: SearchTarget[]): Promise<SearchResponse> {
    query = query.trim();
    const cacheResult = searchResultsCache.get(query);
    const searchMode = SEARCH_PREFIX.get(query[0]) ?? SearchMode.NORMAL;
    if (searchMode !== SearchMode.NORMAL) { query = query.slice(1).trim(); }
    return query === ''
        ? { aborted: true }
        : {
            aborted: false,
            searchMode: searchMode,
            results: cacheResult
                ?? await (async () => {
                    const compiledResults: CompiledSearchResult[] = await compileSearchResults(searchMode, query, searchTargets);
                    searchResultsCache.set(query, compiledResults);
                    return compiledResults;
                })(),
            usedCache: cacheResult !== undefined
        };
}

async function compileSearchResults(searchMode: SearchMode, query: string, searchTargets: SearchTarget[]): Promise<CompiledSearchResult[]> {
    const compiledResults: CompiledSearchResult[] = [];

    //! PERFORMANCE
    const fuzzysortStartTime = performance.now();
    //! -----------
    const results = fuzzysort.go(query, searchTargets, {
        keys: SEARCH_KEYS.get(searchMode)
            ?? (() => { throw new Error(`Search keys not found for search mode ${searchMode}`); })(),
    });
    //! PERFORMANCE
    const fuzzysortEndTime = performance.now();
    //! -----------

    //! PERFORMANCE
    const compilationStartTime = performance.now();
    //! -----------
    results.forEach(result => {
        console.log(result);
        const { titleResult, contentResult } = (() => {
            switch (searchMode) {
                case SearchMode.NORMAL:
                    return { titleResult: result[0], contentResult: result[1] };
                case SearchMode.TITLE:
                    return { titleResult: result[0], contentResult: undefined };
                case SearchMode.CONTENT:
                    return { titleResult: undefined, contentResult: result[0] };
                default:
                    throw new Error(`Search mode ${searchMode} not implemented`);
            }
        })();
        compiledResults.push({
            path: result.obj.path,
            score: result.score,
            title: result.obj.title.target,
            highlightedTitleChunks:
                titleResult !== undefined
                    ? getHighlighted(query, titleResult)
                    : [result.obj.title.target],
            highlightedContentChunks:
                contentResult !== undefined
                    ? getHighlighted(query, contentResult)
                    : [getAbbreviated(result.obj.content.target)],
        });
    });
    //! PERFORMANCE
    const compilationEndTime = performance.now();
    console.log('Fuzzysort took', fuzzysortEndTime - fuzzysortStartTime, 'ms');
    console.log('Compilation took', compilationEndTime - compilationStartTime, 'ms');
    //! -----------
    return compiledResults;
    //
    function getHighlighted(query: string, result: Fuzzysort.Result): string[] {
        const OPEN_TAG = `<span class="${SEARCH_RESULTS_HIGHLIGHT_CLASS}">`;
        const CLOSE_TAG = '</span>';

        // preliminary highlight using fuzzysort highlight function
        // this only cares about the first match and ignores the rest
        const preHighlightedTokens = result.highlight((highlightText: string) => `${OPEN_TAG}${highlightText}${CLOSE_TAG}`);
        if (preHighlightedTokens.length === 0) { return []; }

        // highlight the rest, atomise them, and push them into the same array
        const TAGGED_REGEX = new RegExp(String.raw`^${OPEN_TAG}.*${CLOSE_TAG}$`, 'g');
        const comprehensiveTokens: string[] = getComprehensiveTokens(preHighlightedTokens);
        const [atomicTokens, tagTokenIndices]: [string[], number[]] = atomiseTokens(comprehensiveTokens);

        // condense the tokens
        const condensedTokens: string[] = condenseTokens(atomicTokens, tagTokenIndices);

        return condensedTokens;
        //
        function getComprehensiveTokens(inputTokens: string[]): string[] {
            const compTokens: string[] = [];
            inputTokens.forEach(token => {
                if (token.match(TAGGED_REGEX)) {
                    // is tag
                    compTokens.push(token);
                } else {
                    // is sentences
                    const taggedSentences = highlightMore(token);
                    const tokenisedHighlightedSentences = tokeniseTaggedSentences(taggedSentences);
                    compTokens.push(...tokenisedHighlightedSentences);
                }
            });
            return compTokens;
            //
            function highlightMore(text: string): string {
                const queries = query.split(' ')
                    .filter(word => word.length > 0)
                    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                const comprehensiveQueryRegex = new RegExp(
                    String.raw`(${queries.join('|')})`,
                    'gi'
                );
                return text.replace(comprehensiveQueryRegex, `${OPEN_TAG}$1${CLOSE_TAG}`);
            }
            function tokeniseTaggedSentences(taggedSentences: string): string[] {
                const tagSplitRegex = new RegExp(String.raw`(?=${OPEN_TAG})|(?<=${CLOSE_TAG})`, 'g');
                return taggedSentences.split(tagSplitRegex);
            }
        }
        function atomiseTokens(inputTokens: string[]): [string[], number[]] {
            const tokens: string[] = [];
            const tokenIndices: number[] = [];
            inputTokens.forEach(token => {
                if (token.match(TAGGED_REGEX)) {
                    // is tag
                    tokenIndices.push(tokens.length);
                    tokens.push(token);
                } else {
                    // is sentences
                    tokens.push(...tokeniseSentences(token));
                }
            });
            return [tokens, tokenIndices];
            //
            function tokeniseSentences(sentences: string): string[] {
                const tokens = sentences.split(/(?<=\n|\.\s|\?\s|!\s)/g).filter(sentence => sentence.length > 0);
                const paddedTokens = replaceNewlinesWithEmptyElements(tokens);
                return paddedTokens;
                //
                function replaceNewlinesWithEmptyElements(tokens: string[]): string[] {
                    for (let i = 0; i < tokens.length; i++) {
                        const splitTokens = tokens[i].split('\n');
                        if (splitTokens.length > 1) {
                            const withEmptyElements: string[] = interweaveEmptyElements(splitTokens);
                            tokens.splice(i, 1, ...withEmptyElements);
                            i += withEmptyElements.length - 1;
                        }
                    }
                    return tokens;
                }
                function interweaveEmptyElements(splitTokens: string[]) {
                    const interweaved: string[] = [];
                    for (let j = 0; j < splitTokens.length; j++) {
                        interweaved.push(splitTokens[j]);
                        if (j < splitTokens.length - 1) { interweaved.push(''); }
                    }
                    return interweaved;
                }
            }
        }
        function condenseTokens(inputTokens: string[], tagIndices: number[]): string[] {
            const condensedTokens: string[] = [];
            let condensedTokenIndex = 0;
            while (condensedTokenIndex < inputTokens.length) {
                let currentCondensedToken = '';
                let position: PositionBooleans;
                while (isTruthy(position = tokenIsTagOrAdjacentToTag(condensedTokenIndex))) {
                    const token = inputTokens[condensedTokenIndex];
                    if (token === undefined) { break; }
                    condensedTokenIndex++;
                    //
                    currentCondensedToken += token;
                    if (!position.isBefore && position.isAfter) { break; }
                }
                if (currentCondensedToken.length > 0) {
                    condensedTokens.push(currentCondensedToken.trim());
                } else {
                    condensedTokenIndex++;
                }
            }
            return condensedTokens;
            //
            type PositionBooleans = { isBefore: boolean, isTag: boolean, isAfter: boolean };
            function tokenIsTagOrAdjacentToTag(index: number): PositionBooleans {
                return {
                    isBefore: tagIndices.includes(index + 1),
                    isTag: tagIndices.includes(index),
                    isAfter: tagIndices.includes(index - 1),
                };
            }
            function isTruthy(position: PositionBooleans): boolean {
                return position.isBefore || position.isTag || position.isAfter;
            }
        }
    }
    function getAbbreviated(text: string): string {
        const MAX_LENGTH = 200;
        return text.length > MAX_LENGTH
            ? text.slice(0, MAX_LENGTH) + '...'
            : text;
    }
}

export default class Search {
    static doSearch = doSearch;
}