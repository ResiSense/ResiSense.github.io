const catalogueElement = document.getElementById("catalogue");
const catalogueItemTemplateElement = document.getElementById("catalogue-item-template");
const catalogueDividerTemplateElement = document.getElementById("catalogue-divider-template");


buildCatalogue();

function buildCatalogue() {
    getPageConfig().then(pageConfig => {
        listPages(pageConfig).forEach(page => {
            // console.log(page);
            const catalogueItemElement = catalogueItemTemplateElement.content.cloneNode(true);
            catalogueItemElement.querySelector("a").href = page.path;
            catalogueItemElement.querySelector("a").textContent = page.name;
            if (page.path.replace(/^\//, '') === currentPathTree.join('/')) {
                catalogueItemElement.querySelector("div").classList.add("catalogue-item-active");
            }
            catalogueElement.appendChild(catalogueItemElement);

            const catalogueDividerElement = catalogueDividerTemplateElement.content.cloneNode(true);
            catalogueElement.appendChild(catalogueDividerElement);
        });
    });
}

function listPages(pageConfig, pathTrace = '') {
    const pages = [];
    pageConfig.pages.forEach(page => {
        if (page.hideFromCatalogue) { return; }
        pages.push({ name: page.name, path: `${pathTrace}/${page.name}` });
        if (page.pages) { pages.push(...listPages(page, `${pathTrace}/${page.name}`)); }
    });
    return pages;
}

/* -------------------------------------------------------------------------- */

const catalogueItems = document.getElementsByClassName("catalogue-item");
var firstCatalogueItemLeftBoundClientPosition = undefined;
window.addEventListener(eventType.contentScrollPastHeader, (e) => {
    const shouldHideCatalogue = e.detail;

    // ? hide entire catalogue
    // catalogueElement.style.transform = shouldHideCatalogue ? "translateY(-100%)" : "translateY(0)";

    // ? hide only inactive items
    Array.from(catalogueItems).forEach(catalogueElement => {
        if (catalogueElement.classList.contains("catalogue-arrow")) { return; }
        if (!firstCatalogueItemLeftBoundClientPosition) {
            firstCatalogueItemLeftBoundClientPosition = catalogueElement.getBoundingClientRect().left;
            Object.freeze(firstCatalogueItemLeftBoundClientPosition);
        }

        if (!catalogueElement.hasAttribute('left-bound-client-position')) { catalogueElement.setAttribute('left-bound-client-position', catalogueElement.getBoundingClientRect().left); }
        // console.log(catalogueElement.getAttribute('left-bound-client-position'));
        catalogueElement.style.transform = shouldHideCatalogue ?
            `translateX(${firstCatalogueItemLeftBoundClientPosition - catalogueElement.getAttribute('left-bound-client-position')}px)`
            : "translateX(0)";
        if (catalogueElement.classList.contains("catalogue-item-active")) { return; }
        catalogueElement.style.opacity = shouldHideCatalogue ? 0 : 1;
        catalogueElement.style.pointerEvents = shouldHideCatalogue ? "none" : "auto";
    });
});