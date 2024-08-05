import { convertToPixels } from "./globalLibrary";

{
    const paintedContentElement = document.getElementsByTagName('painted-content')[0];
    const stickyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6',] as const;
    const STICKY_TOLERANCE_PX = 1;
    const stickyHeaderElements = paintedContentElement.querySelectorAll(stickyTags.join(', '));
    type StickyTag = typeof stickyTags[number];

    let stickyTopHeights: { [key in StickyTag]?: number } = {};
    window.addEventListener('DOMContentLoaded', calculateStickyTopHeights);
    function calculateStickyTopHeights() {
        stickyTags.forEach(tagName => {
            const element = paintedContentElement.getElementsByTagName(tagName)[0];
            if (!element) { return; }
            const thisTop = convertToPixels(element, getComputedStyle(element).getPropertyValue('--this-top'));
            stickyTopHeights[tagName] = thisTop + STICKY_TOLERANCE_PX;
        });
    }
    /* -------------------------------------------------------------------------- */
    window.addEventListener('DOMContentLoaded', determineStickiness);
    window.addEventListener('scroll', determineStickiness);
    window.addEventListener('resize', () => {
        calculateStickyTopHeights();
        determineStickiness();
    });
    function determineStickiness() {
        for (const element of stickyHeaderElements) { element.classList.toggle('sticky', false); }
        for (const element of stickyHeaderElements) {
            //
            const tagName = element.tagName.toLowerCase() as StickyTag;
            const elementTop = element.getBoundingClientRect().top;
            const stickyTopHeight = stickyTopHeights[tagName] ?? 0;
            const shouldBeSticky = elementTop <= stickyTopHeight;
            element.classList.toggle('sticky', shouldBeSticky);
            if (!shouldBeSticky) { break; }
        };
    }
    /* -------------------------------------------------------------------------- */
    window.addEventListener('DOMContentLoaded', updateScrollMarkerMargins);
    window.addEventListener('resize', updateScrollMarkerMargins);
    function updateScrollMarkerMargins() {
        const headingElements = document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6')
            || (() => { throw new Error('Heading elements not found!') })();
        headingElements.forEach(heading => {
            const scrollMarker = paintedContentElement.querySelector(`.scroll-marker[id="${heading.id}"]`) as HTMLElement;
            scrollMarker.style.scrollMarginTop = getComputedStyle(heading).scrollMarginTop;
        });
    }
}