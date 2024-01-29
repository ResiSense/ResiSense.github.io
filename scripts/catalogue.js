const catalogueElement = document.getElementById("catalogue");
const catalogueItemTemplateElement = document.getElementById("catalogue-item-template");

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
    });
});

function listPages(pageConfig, pathTrace = '') {
    const pages = [];
    pageConfig.pages.forEach(page => {
        if (page.hideFromCatalogue) { return; }
        pages.push({ name: page.name, path: `${pathTrace}/${page.name}` });
        if (page.pages) { pages.push(...listPages(page, `${pathTrace}/${page.name}`)); }
    });
    return pages;
}