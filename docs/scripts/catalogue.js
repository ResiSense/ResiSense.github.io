console.log(`Script running: ${ document.currentScript.src }`);
//
const catalogueItems = document.getElementsByClassName("catalogue-item");

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

window.addEventListener('DOMContentLoaded', () => {
    calculateTranslateAmount();
    function calculateTranslateAmount() {
        if (contentScrollPastHeader.current === undefined) {
            requestAnimationFrame(calculateTranslateAmount);
            return;
        }
        Array.from(catalogueItems).forEach(catalogueElement => {
            const firstCatalogueItemLeftBoundClientPosition = document.querySelector('.catalogue-item:not(.catalogue-arrow)').getBoundingClientRect().left;
            const catalogueItemLeftBoundClientPosition = catalogueElement.getBoundingClientRect().left;
            catalogueElement.setAttribute('translate-amount', firstCatalogueItemLeftBoundClientPosition - catalogueItemLeftBoundClientPosition);
            window.dispatchEvent(new CustomEvent(eventType.contentScrollPastHeader, { detail: contentScrollPastHeader.current }));
        });
    }
});