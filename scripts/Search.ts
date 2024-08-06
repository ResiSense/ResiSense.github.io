import fuzzysort from 'fuzzysort';
import { SearchTarget } from '../lib/types/Searchable';

const SEARCH_RESULTS_HIGHLIGHT_CLASS = 'highlight';

type CompiledSearchResult = {
    path: string;
    score: number;
    title: string;
    highlightedTitleChunks: string[];
    highlightedContentChunks: string[];
};

export type SearchResponse = {
    results: CompiledSearchResult[];
    usedCache: boolean;
};

const searchResultsCache: Map<string, CompiledSearchResult[]> = new Map();
async function doSearch(query: string, searchTargets: SearchTarget[]): Promise<SearchResponse> {
    const cacheResult = searchResultsCache.get(query);
    return {
        results: cacheResult
            ?? await (async () => {
                const compiledResults: CompiledSearchResult[] = await compileSearchResults(query, searchTargets);
                searchResultsCache.set(query, compiledResults);
                return compiledResults;
            })(),
        usedCache: cacheResult !== undefined
    };
    //
    async function compileSearchResults(query: string, searchTargets: SearchTarget[]): Promise<CompiledSearchResult[]> {
        const compiledResults: CompiledSearchResult[] = [];

        //! PERFORMANCE
        const fuzzysortStartTime = performance.now();
        //! -----------
        const results = fuzzysort.go(query, searchTargets, {
            keys: ['title', 'content'],
            all: true,
        });
        //! PERFORMANCE
        const fuzzysortEndTime = performance.now();
        //! -----------

        //! PERFORMANCE
        const compilationStartTime = performance.now();
        //! -----------
        results.forEach(result => {
            compiledResults.push({
                path: result.obj.path,
                score: result.score,
                title: result.obj.title.target,
                highlightedTitleChunks: getHighlighted(query, result[0]),
                highlightedContentChunks: getHighlighted(query, result[1]),
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
                    const queries = query.split(' ').filter(word => word.length > 0);
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
    }
}

export default class Search {
    static doSearch = doSearch;
}