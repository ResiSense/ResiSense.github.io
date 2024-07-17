import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;
    // 
    const outlineElement: HTMLElement = document.querySelector('painted-outline');
    if (page.name === '404') { outlineElement.style.visibility = 'hidden'; }

    const outlineTreeElement = document.getElementById('outline-tree');
    const outlineHeadingTemplateElement = document.getElementById('outline-heading-template') as HTMLTemplateElement;

    if (!Object.isFrozen(pageData.contentHeadingElements)) { throw new Error('contentHeadingElements is not yet computed.'); }
    if (!pageData.contentHeadingElements?.length) {
        outlineElement.style.visibility = 'hidden';
        return;
    }
    let currentElements: HTMLElement[] = [undefined, undefined, undefined, undefined, undefined, undefined];
    pageData.contentHeadingElements.forEach((heading: HTMLHeadingElement) => {
        const level = parseInt(heading.tagName.charAt(1)) - 1;
        const currentElement = outlineHeadingTemplateElement.content.cloneNode(true) as HTMLElement;
        const aElement = currentElement.querySelector('a');
        aElement.href = `#${heading.id}`;
        aElement.textContent = heading.textContent;
        aElement.id = `--outline-${heading.id}`;

        if (level === 0) {
            outlineTreeElement.appendChild(currentElement);
            currentElements[level] = outlineTreeElement.lastElementChild as HTMLElement;
        } else {
            currentElements[level - 1].querySelector('ul').appendChild(currentElement);
            currentElements[level] = currentElements[level - 1].querySelector('ul').lastElementChild as HTMLElement;
        }
    });
}