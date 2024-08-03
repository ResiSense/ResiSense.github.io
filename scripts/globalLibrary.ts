window.setTimeout(() => {
    document.body.classList.add('post-buffered');
}, 100);


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

export { convertToPixels };