const contentLegendElement = document.getElementById('content-legend');
contentLegendElement.innerHTML = document.title;

const headerItemsContainerElement = document.getElementsByClassName('header-items-container')[0];
window.addEventListener('scroll', () => {
    if (contentLegendElement.getBoundingClientRect().top < headerItemsContainerElement.getBoundingClientRect().bottom) {
        contentLegendElement.classList.add('hide-text-shadow');
    } else {
        contentLegendElement.classList.remove('hide-text-shadow');
    }
});