import fs = require('fs-extra');

export type PageConfig = {
    pages: Page[];
}
export type Page = FlattenedPage & {
    includes?: Includes;
    pages?: Page[]; // Nested pages for hierarchical structure
}
export type Includes = {
    ts?: string[];
    js?: string[];
    css?: string[];
}

type FlattenedPageConfig = {
    pages: FlattenedPage[];
}
export type FlattenedPage = {
    name: string;
    title: string;
    populator?: 'html-full' | 'html-frame' | 'markdown' | 'custom';
    hideFromCatalogue?: boolean;
    hideFromHamburgerMenu?: boolean;
    hamburgerPrefixIcon?: string;
    trace: string[];
    redirectAliasPaths?: string[];
}

type Entry = {
    name: string;
    path: string;
    hideFromCatalogue?: boolean;
    hideFromHamburgerMenu?: boolean;
    hamburgerPrefixIcon?: string;
}

let _pageConfig: PageConfig | undefined = undefined;
const pageConfig: PageConfig = ((): PageConfig => {
    if (_pageConfig !== undefined) { return _pageConfig; }
    //
    const rawJsonc = fs.readFileSync('./meta/pageConfig.jsonc', 'utf8');
    const singleLineCommentRegex = /\/\/.*/g;
    const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
    const json = rawJsonc.replace(singleLineCommentRegex, '').replace(multiLineCommentRegex, '');
    _pageConfig = JSON.parse(json) as PageConfig;
    return _pageConfig!;
})();

let _flattenedPageConfig: FlattenedPageConfig | undefined = undefined;
const flattenedPageConfig: FlattenedPageConfig = ((): FlattenedPageConfig => {
    if (_flattenedPageConfig !== undefined) { return _flattenedPageConfig; }
    //
    _flattenedPageConfig = flattenPages(pageConfig.pages);
    return _flattenedPageConfig;
    //  
    function flattenPages(pages: Page[], trace: string[] = []): FlattenedPageConfig {
        const config: FlattenedPageConfig = { pages: [] };
        pages.forEach(page => {
            config.pages.push({ ...page, trace: [...trace, page.name] });
            if (page.pages) {
                config.pages.push(...flattenPages(page.pages, [...trace, page.name]).pages);
            }
        });
        return config;
    }
})();

let _pageEntries: Entry[] | undefined = undefined;
const pageEntries: Entry[] = (() => {
    if (_pageEntries !== undefined) { return _pageEntries; }
    //
    const entries: Entry[] = [];
    pageConfig.pages.forEach(page => addFlattenedPageToEntries(page));
    _pageEntries = entries;
    return _pageEntries;
    // 
    function addFlattenedPageToEntries(page: Page, pathTrace = '') {
        const entry: Entry = {
            name: page.title ? page.title.toLowerCase() : page.name,
            path: `${pathTrace}/${page.name}`,
            hideFromCatalogue: page.hideFromCatalogue,
            hideFromHamburgerMenu: page.hideFromHamburgerMenu,
            hamburgerPrefixIcon: page.hamburgerPrefixIcon
        }
        entries.push(entry);
        if (page.pages) { page.pages.forEach(subPage => addFlattenedPageToEntries(subPage, entry.path)); }
    }
})();

export default class Pages {
    static pageConfig = pageConfig;
    static flattenedPageConfig = flattenedPageConfig;
    static pageEntries = pageEntries;
}