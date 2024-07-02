import { catalogueEntries } from "./CatalogueEntry";
import { getTrace } from "./PageConfig";
import { PageData } from "./PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;
    // 
    const catalogueElement = document.getElementById('catalogue');
    const catalogueItemTemplateElement = document.getElementById('catalogue-item-template') as HTMLTemplateElement;
    const catalogueDividerTemplateElement = document.getElementById('catalogue-divider-template') as HTMLTemplateElement;

    catalogueEntries.forEach(entry => {
        const catalogueItemElement = catalogueItemTemplateElement.content.cloneNode(true) as HTMLElement;
        const anchorElement = catalogueItemElement.querySelector('a');
        anchorElement.href = entry.path;
        anchorElement.textContent = entry.name;

        if (entry.path.replace(/^\//, '') === getTrace(page).join('/')) {
            catalogueItemElement.querySelector('div').classList.add('catalogue-item-active');
        }
        catalogueElement.appendChild(catalogueItemElement);

        const catalogueDividerElement = catalogueDividerTemplateElement.content.cloneNode(true) as HTMLElement;
        catalogueElement.appendChild(catalogueDividerElement);
    });
}