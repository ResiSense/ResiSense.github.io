import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;
    // 
    const outlineElement: HTMLElement = document.querySelector('painted-outline')
        || (() => { throw new Error('Outline element not found!') })();
    if (page.name === '404') { outlineElement.style.visibility = 'hidden'; }

    const outlineTreeElement = document.getElementById('outline-tree')
        || (() => { throw new Error('Outline tree element not found!') })();
    const outlineHeadingTemplateElement = document.getElementById('outline-heading-template') as HTMLTemplateElement;

    if (!Object.isFrozen(pageData.contentHeadingElements)) { throw new Error('contentHeadingElements is not yet computed.'); }
    if (!pageData.contentHeadingElements?.length) {
        outlineElement.style.visibility = 'hidden';
        return;
    }
    let currentElements: (HTMLElement | undefined)[] = [];
    pageData.contentHeadingElements.forEach((heading: HTMLHeadingElement) => {
        const level = parseInt(heading.tagName.charAt(1)) - 1;
        const currentElement = outlineHeadingTemplateElement.content.cloneNode(true) as HTMLElement;
        const aElement = currentElement.querySelector('a')
            || (() => { throw new Error('Anchor element not found!') })();
        aElement.href = `#${heading.id}`;
        aElement.textContent = heading.textContent;
        aElement.id = `--outline-${heading.id}`;

        if (level > 2) { return; }
        if (level === 0) {
            outlineTreeElement.appendChild(currentElement);
            currentElements[level] = outlineTreeElement.lastElementChild as HTMLElement;
        } else {
            const lastLevelUl = currentElements[level - 1]?.querySelector('ul')
                || (() => { throw new Error('Last level ul not found!') })();
            lastLevelUl.appendChild(currentElement);
            currentElements[level] = lastLevelUl.lastElementChild as HTMLElement;
        }
    });
}