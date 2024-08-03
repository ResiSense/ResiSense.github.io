import Searchable, { SearchTarget } from './../lib/types/Searchable';
import { safeURIEncode } from './globalLibrary';
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
    const searchResultsEndTemplate = (() => {
        const searchResultsEndTemplateElement = (document.getElementById('search-results-end-template')
            ?? (() => { throw new Error('Search results end template not found') })()
        ) as HTMLTemplateElement;
        return searchResultsEndTemplateElement.content.cloneNode(true) as HTMLDivElement;
    })();
    //
    const BASE_URL = document.head.querySelector('meta[base-url]')?.getAttribute('base-url') ?? '.';
    Searchable.index = await (await fetch(`/${BASE_URL}/search-index.json`)).json();
    const searchTargets: SearchTarget[] = Searchable.targets;
    // console.log({ index: Searchable.index, targets: Searchable.targets });
    /* -------------------------------------------------------------------------- */
    headerSearchFieldElement.addEventListener('focusin', () => { mainSearchFieldElement.focus(); });
    /* -------------------------------------------------------------------------- */
    let oldSearchFieldQuery: string;
    mainSearchFieldElement.addEventListener('keydown', onSearchFieldKeyDown);
    function onSearchFieldKeyDown() {
        //? the query is inexplicably one character behind if we don't use requestAnimationFrame
        //? + slight throttling
        requestAnimationFrame(updateSearch);
    }
    function updateSearch() {
        headerSearchFieldElement.value = mainSearchFieldElement.value;
        const query = mainSearchFieldElement.value.trim();
        if (query === oldSearchFieldQuery) { return; }
        oldSearchFieldQuery = query;
        if (query === '') {
            searchResultsElement.innerHTML = '';
        } else {
            redrawSearchResults(query)
        }
    }
    /* -------------------------------------------------------------------------- */
    searchbarElement.addEventListener('keydown', (event: KeyboardEvent) => {
        // allow non-typing keys pass through
        const nonTypingKeys = [
            'Shift', 'Control', 'Alt', 'Meta',
            'Enter', 'Tab', 'CapsLock', 'Home', 'End', 'PageUp', 'PageDown'
        ];
        if (nonTypingKeys.includes(event.key)) { return; }

        // allow arrow up down navigation
        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            const isDown = event.key === 'ArrowDown';

            // focus on the next or previous search result
            const searchResults = searchResultsElement.children;
            const focusedElement = document.activeElement;
            const focusedIndex = Array.from(searchResults).indexOf(focusedElement as HTMLElement);
            if (focusedIndex === -1 && !isDown) { return; }
            const nextIndex = Math.min(focusedIndex + (isDown ? 1 : -1), searchResults.length - 1);
            const elementToFocus = (searchResults[nextIndex] || mainSearchFieldElement) as HTMLElement;
            elementToFocus.focus();
            elementToFocus.scrollIntoView({ block: 'start', behavior: 'instant' });
            return;
        }

        // allow escape to close the search dialog when the search field is empty
        if (event.key === 'Escape' && mainSearchFieldElement.value === '') {
            mainSearchFieldElement.focus();
            mainSearchFieldElement.blur();
            return;
        }

        // regular typing
        mainSearchFieldElement.focus();
        searchResultsElement.scrollTo(0, 0);
        requestAnimationFrame(() => {
            headerSearchFieldElement.value = mainSearchFieldElement.value;
            updateSearch();
        });
    });
    searchbarElement.addEventListener('focusin', () => { searchDialogElement.toggleAttribute('open', true); });
    searchbarElement.addEventListener('focusout', () => { searchDialogElement.toggleAttribute('open', false); });
    //
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'F') {
            event.preventDefault();
            mainSearchFieldElement.focus();
        }
    });
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
        //
        searchResultsElement.innerHTML = '';
        for (const searchResult of searchResults.sort((a, b) => b.score - a.score)) {
            const newSearchResultElement = searchResultTemplate.cloneNode(true) as DocumentFragment;
            //
            const baselessResultPageHref = `/${searchResult.path}${window.location.pathname.endsWith('.html') ? '.html' : ''}`;
            const resultPageHref = `/${BASE_URL}${baselessResultPageHref}`;
            (newSearchResultElement.querySelector('#result-title') as HTMLDivElement).innerHTML = searchResult.highlightedTitleChunks.join(' ').trim() || searchResult.title;
            (newSearchResultElement.querySelector('#result-path') as HTMLDivElement).textContent = searchResult.path;
            //
            const contentElement = newSearchResultElement.querySelector('#result-content') as HTMLDivElement;
            for (const contentChunk of searchResult.highlightedContentChunks) {
                const contentChunkElement = document.createElement('a');
                contentChunkElement.innerHTML = contentChunk;
                //
                const safeText = safeURIEncode((
                    contentChunkElement.textContent
                    || (() => { throw new Error('Empty content chunk') })()
                ).trim());
                const resultTextHref = `${resultPageHref}#:~:text=${safeText}`;
                contentChunkElement.href = resultTextHref;
                if (window.location.href.endsWith(baselessResultPageHref)) {
                    // same page search
                    contentChunkElement.addEventListener('click', () => {
                        searchDialogElement.toggleAttribute('open', false);
                        const oParent = searchDialogElement.parentNode;
                        document.body.appendChild(searchDialogElement);
                        window.location.href = resultTextHref;
                        requestAnimationFrame(() => { oParent?.appendChild(searchDialogElement); });
                    });
                }
                //
                contentElement.appendChild(contentChunkElement);
            }
            //
            searchResultsElement.appendChild(newSearchResultElement);
            // I have no idea why this jank is necessary
            (searchResultsElement.lastElementChild as HTMLAnchorElement).href = resultPageHref;
        }
        searchResultsElement.appendChild(searchResultsEndTemplate.cloneNode(true));
    }
})();