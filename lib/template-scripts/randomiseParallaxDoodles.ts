import { PageData } from "../types/PageData";
import fs = require('fs-extra');

function randomFromRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomOffset() {
    // TODO: Make this more uniform and avoid collisions
    const Y_OFFSET_LIMIT = 10000;
    const xOffset = Math.random() * 100;
    const yOffset = Math.random() * Y_OFFSET_LIMIT;
    return { xOffset, yOffset };
}

export default function (pageData: PageData) {
    const PARALLAX_CSS_PATH = `${pageData.targetDirectory}/styles/parallax.css`;
    const document = pageData.document;
    // 
    const parallaxElement = document.getElementById('parallax');
    const parallaxAnimations: { hash: string, translateAmount: number }[] = [];
    for (let child of parallaxElement.children) {
        const doodleElement = child as HTMLElement;
        // 
        const { xOffset, yOffset } = getRandomOffset();
        doodleElement.style.translate = `${xOffset}vw ${yOffset}px`;
        //
        const translateAmount = -randomFromRange(2000, 6000);
        const hash = translateAmount.toString(36).substring(7);
        doodleElement.style.animationName = `parallax-${hash}`;
        parallaxAnimations.push({ hash, translateAmount });
    }
    //
    const css = fs.readFileSync(PARALLAX_CSS_PATH, 'utf8');
    let newCss = css;
    parallaxAnimations.forEach(({ hash, translateAmount }) => {
        newCss += `
            @keyframes parallax-${hash} {
                to { transform: translateY(${translateAmount}px); }
            }
        `;
    });
    fs.writeFileSync(PARALLAX_CSS_PATH, newCss);
}