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
    trace?: string[];
}


const pageConfig: PageConfig = ((): PageConfig => {
    const rawJsonc = fs.readFileSync('./meta/pageConfig.jsonc', 'utf8');
    const singleLineCommentRegex = /\/\/.*/g;
    const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
    const json = rawJsonc.replace(singleLineCommentRegex, '').replace(multiLineCommentRegex, '');
    return JSON.parse(json);
})();

const flattenedPageConfig: FlattenedPageConfig = ((): FlattenedPageConfig => {
    const flattenedPageConfig: FlattenedPageConfig = { pages: [] };
    flattenPages(pageConfig.pages);
    return flattenedPageConfig;

    function flattenPages(pages: Page[], trace: string[] = []) {
        pages.forEach(page => {
            flattenedPageConfig.pages.push({ ...page, trace: [...trace, page.name] });
            if (page.pages) {
                flattenPages(page.pages, [...trace, page.name]);
            }
        });
    }
})();

function getFlattenedPage(page: Page | FlattenedPage): FlattenedPage {
    return flattenedPageConfig.pages.find(flattenedPage => flattenedPage.name === page.name);
}
function getTrace(page: Page | FlattenedPage): string[] {
    return getFlattenedPage(page).trace;
}

export default class Pages {
    static pageConfig = pageConfig;
    static flattenedPageConfig = flattenedPageConfig;
    static getTrace = getTrace;
}