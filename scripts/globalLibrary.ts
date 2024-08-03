window.setTimeout(() => {
    document.body.classList.add('post-buffered');
}, 100);

function safeURIEncode(string: string): string {
    return encodeURIComponent(string)
        .replace(/[-]/g, '%2D')
        .replace(/[.]/g, '%2E')
        .replace(/[_]/g, '%5F')
        .replace(/[~]/g, '%7E')
        .replace(/[*]/g, '%2A')
        .replace(/['']/g, '%27')
        .replace(/[(]/g, '%28')
        .replace(/[)]/g, '%29')
        .replace(/[,]/g, '%2C');
}

function convertToPixels(element: Element | HTMLElement, value: string): number {
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.height = value;
    element.appendChild(tempElement);
    const pixels = window.getComputedStyle(tempElement).height;
    element.removeChild(tempElement);
    return parseFloat(pixels);
}

export { convertToPixels, safeURIEncode };