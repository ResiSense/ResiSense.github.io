import { PageData } from "../types/PageData";

export default function wrapHumanCards(pageData: PageData) {
    const document = pageData.document;
    // 
    const humanCardEnds = document.getElementsByClassName('--human-card-above');
    Array.from(humanCardEnds).forEach(humanCardEnd => {
        const h3 = humanCardEnd.parentElement.parentElement.getElementsByTagName('h3')[0];
        const img = humanCardEnd.parentElement.getElementsByTagName('img')[0];
        const p = humanCardEnd.parentElement;
        humanCardEnd.remove();

        const humanCard = document.createElement('div');
        humanCard.classList.add('human-card');
        h3.parentElement.insertBefore(humanCard, h3);

        humanCard.appendChild(img);

        const humanCardBox = document.createElement('div');
        humanCardBox.classList.add('human-card-box');
        humanCard.appendChild(humanCardBox);

        const humanCardTextContainer = document.createElement('div');
        humanCardTextContainer.classList.add('human-card-text-container');
        humanCardTextContainer.appendChild(h3);
        humanCardTextContainer.appendChild(p);
        humanCardBox.appendChild(humanCardTextContainer);

        const brs = humanCard.getElementsByTagName('br');
        for (let j = 0; j < brs.length; j++) {
            brs[j].remove();
        }
    });
}