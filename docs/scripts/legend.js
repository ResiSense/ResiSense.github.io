const contentLegendElement = document.getElementById('content-legend');
const headerItemsContainerElement = document.getElementsByClassName('header-items-container');
window.addEventListener('scroll', () => {
    if (contentLegendElement.getBoundingClientRect().top < headerItemsContainerElement[0].getBoundingClientRect().bottom) {
        contentLegendElement.classList.add('hide-text-shadow');
    } else {
        contentLegendElement.classList.remove('hide-text-shadow');
    }
});