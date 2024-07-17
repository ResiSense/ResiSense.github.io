import Pages, { Page, PageConfig } from "./Pages";

export type CatalogueEntry = {
    name: string;
    path: string;
}

const catalogueEntries: CatalogueEntry[] = flattenConfig(Pages.pageConfig);

function flattenConfig(config: PageConfig): CatalogueEntry[] {
    const entries: CatalogueEntry[] = [];
    config.pages.forEach(page => addFlattenedPageToEntries(page));
    return entries;
    // 
    function addFlattenedPageToEntries(page: Page, pathTrace = '') {
        if (page.hideFromCatalogue) { return; }
        const entry: CatalogueEntry = {
            name: page.title ? page.title.toLowerCase() : page.name,
            path: `${pathTrace}/${page.name}`,
        }
        entries.push(entry);
        if (page.pages) { page.pages.forEach(subPage => addFlattenedPageToEntries(subPage, entry.path)); }
    }
}

export default class Catalogue {
    static catalogueEntries = catalogueEntries;
}