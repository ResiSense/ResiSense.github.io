if (window.location.pathname.split('/').includes('404')) {
    const contentLegendElement = document.getElementById('content-legend');
    contentLegendElement.innerHTML = "404: Page not found ☹️";
}

const contentLegendElement = document.getElementById('content-legend');
const headerItemsContainerElement = document.getElementsByClassName('header-items-container');
window.addEventListener('scroll', () => {
    if (contentLegendElement.getBoundingClientRect().top < headerItemsContainerElement[0].getBoundingClientRect().bottom) {
        contentLegendElement.classList.add('hide-text-shadow');
    } else {
        contentLegendElement.classList.remove('hide-text-shadow');
    }
});