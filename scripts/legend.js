if (window.location.pathname.split('/').includes('404')) {
    const contentLegendElement = document.getElementById('content-legend');
    contentLegendElement.innerHTML = "404: Page not found ☹️";
}

const contentLegendElement = document.getElementById('content-legend');
const headerItemsContainerElement = document.getElementsByClassName('header-items-container');
window.addEventListener('scroll', () => {
    const shouldHideContentLegend = contentLegendElement.getBoundingClientRect().top < headerItemsContainerElement[0].getBoundingClientRect().bottom;
    contentLegendElement.classList.toggle('hide-text-shadow', shouldHideContentLegend);
});