import Pages from "../types/Pages";
import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;
    // 
    const catalogueElement = document.getElementById('catalogue')
        || (() => { throw new Error('Catalogue element not found!') })();
    const catalogueItemTemplateElement = document.getElementById('catalogue-item-template') as HTMLTemplateElement;
    const catalogueDividerTemplateElement = document.getElementById('catalogue-divider-template') as HTMLTemplateElement;

    Pages.pageEntries.forEach(entry => {
        const catalogueItemElement = catalogueItemTemplateElement.content.cloneNode(true);
        const anchorElement = (catalogueItemElement as HTMLDivElement).querySelector('a')
            || (() => { throw new Error('Anchor element not found!') })();
        anchorElement.href = entry.path;
        anchorElement.textContent = entry.name;

        if (entry.path.replace(/^\//, '') === page.trace.join('/')) {
            ((catalogueItemElement as HTMLDivElement).querySelector('div')
                || (() => { throw new Error('Catalogue div element not found!') })()
            ).classList.add('catalogue-item-active');
        }
        catalogueElement.appendChild(catalogueItemElement);

        const catalogueDividerElement = catalogueDividerTemplateElement.content.cloneNode(true);
        catalogueElement.appendChild(catalogueDividerElement);
    });
}