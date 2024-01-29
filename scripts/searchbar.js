const searchbarElement = document.getElementById('searchbar');
const searchButtonElement = document.getElementById('search-button');

searchButtonElement.addEventListener('click', () => {
    const searchQuery = searchbarElement.value;
    console.log(searchQuery);
    getPageConfig().then(pageConfig => {
        console.log(listPages(pageConfig));
    });
});

function listPages(pageConfig) {
    const pages = [];
    pageConfig.pages.forEach(page => {
        pages.push(page.name);
        if (page.pages) { pages.push(...listPages(page)); }
    });
    return pages;
}