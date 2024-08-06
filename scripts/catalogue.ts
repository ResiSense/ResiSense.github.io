import EventType from './EventType';
import ResponsivenessHandler from './responsivenessHandler';
{
    const catalogueItems = document.getElementsByClassName("catalogue-item");
    /* -------------------------------------------------------------------------- */
    window.addEventListener(EventType.contentScrollPastHeader.toString(), determineCatalogueVisibility);
    function determineCatalogueVisibility() {
        const shouldHideCatalogue = ResponsivenessHandler.contentIsPastHeader.current;

        // ? hide entire catalogue
        // catalogueElement.style.transform = shouldHideCatalogue ? "translateY(-100%)" : "translateY(0)";

        // ? hide only inactive items
        Array.from(catalogueItems).forEach(el => {
            const catalogueElement = el as HTMLElement;
            // ? remove this when attr() has better browser support
            if (catalogueElement.classList.contains("catalogue-arrow")) { return; }
            catalogueElement.style.translate = shouldHideCatalogue ? `${catalogueElement.getAttribute('translate-amount')}px` : '0';

            catalogueElement.classList.toggle("catalogue-item-hidden", shouldHideCatalogue);
        });
    }
    /* -------------------------------------------------------------------------- */
    window.addEventListener('DOMContentLoaded', calculateTranslateAmount);
    window.addEventListener('resize', calculateTranslateAmount);
    function calculateTranslateAmount() {
        const contentIsPastHeader = ResponsivenessHandler.contentIsPastHeader;
        if (contentIsPastHeader.current === undefined) {
            requestAnimationFrame(calculateTranslateAmount);
            return;
        }
        Array.from(catalogueItems).forEach(catalogueElement => {
            const firstCatalogueItemLeftBoundClientPosition = (document.querySelector('.catalogue-item:not(.catalogue-arrow)')
                || (() => { throw new Error('First catalogue item not found!') })()
            ).getBoundingClientRect().left;
            const catalogueItemLeftBoundClientPosition = catalogueElement.getBoundingClientRect().left;
            catalogueElement.setAttribute('translate-amount', `${firstCatalogueItemLeftBoundClientPosition - catalogueItemLeftBoundClientPosition}`);
            window.dispatchEvent(new CustomEvent(EventType.contentScrollPastHeader.toString()));
        });
    }
}