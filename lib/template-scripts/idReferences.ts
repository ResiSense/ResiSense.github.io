import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    // 
    const referencesSectionElement: HTMLElement = document.querySelector('h1#references')?.parentElement
        || (() => { throw new Error('References section element not found!') })();
    referencesSectionElement.querySelectorAll('li').forEach((li: HTMLElement, index: number) => {
        console.log(li);
        li.id = `reference-${index + 1}`;
    });
}