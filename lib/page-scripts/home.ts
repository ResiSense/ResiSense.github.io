import { PageData } from "../types/PageData";

export default function wrapHumanCards(pageData: PageData) {
    const document = pageData.document;
    const page = pageData.page;

    const pageTitleElements = document.querySelectorAll('.page-title')
        || (() => { throw new Error('Page title elements not found!') })();
    pageTitleElements.forEach(pageTitleElement => {
        const row1 = pageTitleElement;
        const row2 = pageTitleElement.cloneNode(true) as HTMLElement;
        const row3 = pageTitleElement.cloneNode(true) as HTMLElement;
        pageTitleElement.parentNode?.appendChild(row2);
        pageTitleElement.parentNode?.appendChild(row3);
        row1.classList.add('row-1');
        row2.classList.add('row-2');
        row3.classList.add('row-3');

        row1.textContent = "- ResiSense -"
        row2.textContent = "A Cell-Free Detection System"
        row3.textContent = "For Antibiotic Resistance Genes";
    });
}