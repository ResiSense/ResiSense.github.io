{
    const stickyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    type StickyTag = typeof stickyTags[number];
    const paintedContentElement = document.getElementsByTagName('painted-content')[0];
    const stickyHeaderElements = paintedContentElement.querySelectorAll(stickyTags.join(', '));
    const stickyTopHeights: { [key in StickyTag]?: number } = {};
    stickyTags.forEach(tag => {
        const element = paintedContentElement.getElementsByTagName(tag)[0];
        if (element) {
            stickyTopHeights[tag] = convertToPixels(getComputedStyle(element).getPropertyValue('--this-top'));
        }
    });

    document.addEventListener('DOMContentLoaded', determineStickiness);
    document.addEventListener('scroll', determineStickiness);
    function determineStickiness() {
        for (const element of stickyHeaderElements) {
            const tagName = element.tagName.toLowerCase() as StickyTag;
            const elementTop = element.getBoundingClientRect().top;
            const stickyTopHeight = stickyTopHeights[tagName] ?? 0;
            const shouldBeSticky = elementTop <= stickyTopHeight;
            element.classList.toggle('sticky', elementTop <= stickyTopHeight);
            if (!shouldBeSticky) { break; }
        };
    }

    function convertToPixels(value: string): number {
        const tempElement = document.createElement('div');
        tempElement.style.position = 'absolute';
        tempElement.style.visibility = 'hidden';
        tempElement.style.height = value;
        document.body.appendChild(tempElement);
        const pixels = window.getComputedStyle(tempElement).height;
        document.body.removeChild(tempElement);
        return parseFloat(pixels);
    }
}