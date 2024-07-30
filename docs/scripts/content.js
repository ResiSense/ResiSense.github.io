console.log(`Script running: ${document.currentScript.src}`);
//
{
    const stickyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const paintedContentElement = document.getElementsByTagName('painted-content')[0];
    const stickyHeaderElements = paintedContentElement.querySelectorAll(stickyTags.join(', '));
    const stickyTopHeights = stickyTags.reduce((acc, tag) => {
        const element = paintedContentElement.getElementsByTagName(tag)[0];
        element
            ? (acc[element.tagName] = convertToPixels(getComputedStyle(element).getPropertyValue('--this-top')))
            : null;
        return acc;
    }, {});

    document.addEventListener('DOMContentLoaded', determineStickiness);
    document.addEventListener('scroll', determineStickiness);
    function determineStickiness() {
        for (const element of stickyHeaderElements) {
            const elementTop = element.getBoundingClientRect().top;
            const stickyTopHeight = stickyTopHeights[element.tagName];
            const shouldBeSticky = stickyTopHeight && elementTop <= stickyTopHeight;
            element.classList.toggle('sticky', stickyTopHeight && elementTop <= stickyTopHeight);
            if (!shouldBeSticky) {
                break;
            }
        }
    }

    function convertToPixels(value) {
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
