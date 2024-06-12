if (currentPathTree[0] == '404') {
    const processedCustomOutlineElement = document.getElementsByTagName('processed-custom-outline')[0];
    processedCustomOutlineElement.style.visibility = 'hidden';
}

const outlineTreeElement = document.getElementById('outline-tree');
const outlineHeadingTemplateElement = document.getElementById('outline-heading-template');

window.addEventListener(eventType.contentHeadingElementsIdentified, () => {
    let currentElements = [undefined, undefined, undefined, undefined, undefined, undefined];

    contentHeadingElements.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1)) - 1;
        const currentElement = outlineHeadingTemplateElement.content.cloneNode(true);
        const aElement = currentElement.querySelector('a');
        aElement.href = `#${heading.id}`;
        aElement.textContent = heading.textContent;
        aElement.id = `--outline-${heading.id}`;

        if (level === 0) {
            outlineTreeElement.appendChild(currentElement);
            currentElements[level] = outlineTreeElement.lastElementChild;
        } else {
            currentElements[level - 1].querySelector('ul').appendChild(currentElement);
            currentElements[level] = currentElements[level - 1].querySelector('ul').lastElementChild;
        }
    });
});

const outlineProgressPointerElement = document.getElementById('outline-progress-pointer');
window.addEventListener('scroll', (e) => {
    const latestHeading =
        [...contentHeadingElements].reverse()
            .find(heading => heading.getBoundingClientRect().top < 180) || contentHeadingElements[0];
    const currentProgressOutlineElement = document.getElementById(`--outline-${latestHeading.id}`);
    const firstProgressOutlineElement = document.getElementById(`--outline-${contentHeadingElements[0].id}`);
    outlineProgressPointerElement.style.top = `${currentProgressOutlineElement.getBoundingClientRect().top - firstProgressOutlineElement.getBoundingClientRect().top}px`;
    outlineProgressPointerElement.style.left = `${2 + currentProgressOutlineElement.getBoundingClientRect().left - firstProgressOutlineElement.getBoundingClientRect().left}px`;
});
