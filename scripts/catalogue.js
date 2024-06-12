const catalogueElement = document.getElementById("catalogue");
const catalogueItemTemplateElement = document.getElementById("catalogue-item-template");
const catalogueDividerTemplateElement = document.getElementById("catalogue-divider-template");

window.addEventListener(eventType.pathTreeResolved, buildCatalogue());

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

        window.dispatchEvent(new CustomEvent(eventType.catalogueBuilt));
    });
}

function listPages(pageConfig, pathTrace = '') {
    const pages = [];
    pageConfig.pages.forEach(page => {
        if (page.hideFromCatalogue) { return; }
        pages.push({ name: page.title ? page.title.toLowerCase() : page.name, path: `${pathTrace}/${page.name}` });
        if (page.pages) { pages.push(...listPages(page, `${pathTrace}/${page.name}`)); }
    });
    return pages;
}

/* -------------------------------------------------------------------------- */

const catalogueItems = document.getElementsByClassName("catalogue-item");
window.addEventListener(eventType.catalogueBuilt, (e) => {
    // maybe recompute this on window resize
    Array.from(catalogueItems).forEach(catalogueElement => {
        waitForRender(catalogueElement)
            .then(() => {
                const firstCatalogueItemLeftBoundClientPosition = document.querySelector('.catalogue-item:not(.catalogue-arrow)').getBoundingClientRect().left;
                const catalogueItemLeftBoundClientPosition = catalogueElement.getBoundingClientRect().left;
                catalogueElement.setAttribute('translate-amount', firstCatalogueItemLeftBoundClientPosition - catalogueItemLeftBoundClientPosition);
            });
    });
});
window.addEventListener(eventType.contentScrollPastHeader, (e) => {
    const shouldHideCatalogue = e.detail;

    // ? hide entire catalogue
    // catalogueElement.style.transform = shouldHideCatalogue ? "translateY(-100%)" : "translateY(0)";

    // ? hide only inactive items
    Array.from(catalogueItems).forEach(catalogueElement => {
        // ? remove this when attr() has better browser support
        if (catalogueElement.classList.contains("catalogue-arrow")) { return; }
        catalogueElement.style.translate = shouldHideCatalogue ? `${catalogueElement.getAttribute('translate-amount')}px` : 0;

        catalogueElement.classList.toggle("catalogue-item-hidden", shouldHideCatalogue);
    });
});