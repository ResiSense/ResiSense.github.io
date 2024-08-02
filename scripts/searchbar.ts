import Searchable, { SearchTarget } from './../lib/types/Searchable';
import SearchResults from './SearchResults';

(async () => {
    const searchbarElement = (document.getElementById('searchbar')
        ?? (() => { throw new Error('Searchbar not found') })()
    ) as HTMLElement;
    const headerSearchFieldElement = (document.getElementById('header-search-field')
        ?? (() => { throw new Error('Search field not found') })()
    ) as HTMLInputElement;
    const mainSearchFieldElement = (document.getElementById('main-search-field')
        ?? (() => { throw new Error('Search field not found') })()
    ) as HTMLInputElement;
    const searchButtonElement = (document.getElementById('search-button')
        ?? (() => { throw new Error('Search button not found') })()
    ) as HTMLButtonElement;
    const searchDialogElement = (document.getElementById('search-dialog')
        ?? (() => { throw new Error('Search dialog not found') })()
    ) as HTMLDialogElement;
    const searchResultsElement = (document.getElementById('search-results')
        ?? (() => { throw new Error('Search results not found') })()
    ) as HTMLDivElement;
    const searchResultTemplate = (() => {
        const searchResultTemplateElement = (document.getElementById('search-result-template')
            ?? (() => { throw new Error('Search result template not found') })()
        ) as HTMLTemplateElement;
        return searchResultTemplateElement.content.cloneNode(true) as HTMLDivElement;
    })();
    //
    const BASE_URL = document.head.querySelector('meta[base-url]')?.getAttribute('base-url') ?? '.';
    Searchable.index = await (await fetch(`/${BASE_URL}/search-index.json`)).json();
    const searchTargets: SearchTarget[] = Searchable.targets;
    // console.log({ index: Searchable.index, targets: Searchable.targets });

    let oldSearchFieldQuery: string;
    mainSearchFieldElement.addEventListener('keydown', onSearchFieldKeyDown);
    function onSearchFieldKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && mainSearchFieldElement.value === '') {
            searchDialogElement.toggleAttribute('open', false);
            return;
        }
        //
        //? the query is inexplicably one character behind if we don't use requestAnimationFrame
        //? + slight throttling
        requestAnimationFrame(() => {
            headerSearchFieldElement.value = mainSearchFieldElement.value;
            const query = mainSearchFieldElement.value.trim();
            if (query === oldSearchFieldQuery) { return; }
            oldSearchFieldQuery = query;
            if (query === '') {
                searchResultsElement.innerHTML = '';
            } else {
                redrawSearchResults(query)
            }
        });
    }

    searchbarElement.addEventListener('keydown', () => {
        mainSearchFieldElement.focus();
        requestAnimationFrame(() => { headerSearchFieldElement.value = mainSearchFieldElement.value; });
    });
    searchbarElement.addEventListener('focusin', () => { searchDialogElement.toggleAttribute('open', true); });
    searchbarElement.addEventListener('focusout', () => { searchDialogElement.toggleAttribute('open', false); });

    //
    async function redrawSearchResults(query: string) {
        //! PERFORMANCE
        const startTime = performance.now();
        //! -----------
        const [searchResults, usedCache] = await SearchResults.search(query, searchTargets);
        //! PERFORMANCE
        const endTime = performance.now();
        console.log(`Querying for "${query}" took`, endTime - startTime, 'ms', usedCache ? '(from cache)' : '');
        //! -----------
        console.log(searchResults);

        searchResultsElement.innerHTML = '';
        for (const searchResult of searchResults.sort((a, b) => b.score - a.score)) {
            const newSearchResultElement = searchResultTemplate.cloneNode(true) as DocumentFragment;
            //
            (newSearchResultElement.querySelector('#result-title') as HTMLDivElement).innerHTML = searchResult.highlightedTitleChunks.join(' ').trim() || searchResult.title;
            (newSearchResultElement.querySelector('#result-path') as HTMLDivElement).textContent = searchResult.path;
            //
            const contentElement = newSearchResultElement.querySelector('#result-content') as HTMLDivElement;
            for (const contentChunk of searchResult.highlightedContentChunks) {
                const contentChunkElement = document.createElement('div');
                contentChunkElement.innerHTML = contentChunk;
                contentElement.appendChild(contentChunkElement);
            }
            //
            searchResultsElement.appendChild(newSearchResultElement);

            // I have no idea why this jank is necessary
            (searchResultsElement.lastElementChild as HTMLAnchorElement).href = `/${BASE_URL}/${searchResult.path}`;
        }
    }
})();