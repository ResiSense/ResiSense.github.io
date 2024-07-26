import { PageData } from "../types/PageData";
import fs = require('fs-extra');


const Y_PAGE_SIZE_LIMIT = 10000; // in px
const Y_DENSITY_PER_PX = 5 / 1000; // in count per px
const GRADATION_HEIGHT = 100; // in px

function randomFromRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function cloneDoodlesToFillPool(parallaxElement: HTMLElement) {
    const requiredDoodleCount = Y_DENSITY_PER_PX * Y_PAGE_SIZE_LIMIT;
    // make a doodle bag to clone from
    const doodleBag: HTMLElement[] = Array.from(parallaxElement.children).map(child => child.cloneNode(true) as HTMLElement);
    // fill the pool
    while (parallaxElement.childElementCount < requiredDoodleCount) {
        doodleBag.forEach(doodle => {
            const clone = doodle.cloneNode(true) as HTMLElement;
            parallaxElement.appendChild(clone);
        });
    }
    // shuffle the pool
    const pool = Array.from(parallaxElement.children);
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // put the shuffled pool back in the parallax element
    parallaxElement.innerHTML = '';
    pool.forEach(doodle => parallaxElement.appendChild(doodle));
    // remove excess doodles
    while (parallaxElement.childElementCount > requiredDoodleCount) {
        parallaxElement.removeChild(parallaxElement.lastElementChild);
    }
}

function calculateRandomDoodleOffset(siblingCount: number) {
    // TODO: Make this avoid collisions?
    const gradationCount = siblingCount / Y_DENSITY_PER_PX / GRADATION_HEIGHT;
    const gradationNumber = Math.floor(Math.random() * gradationCount);
    const xOffset = randomFromRange(0, 100); // in vw
    const yOffset = (gradationNumber + randomFromRange(0, 1)) * GRADATION_HEIGHT; // in px
    return { xOffset, yOffset };
}

export default function (pageData: PageData) {
    const PARALLAX_CSS_PATH = `${pageData.targetDirectory}/styles/parallax.css`;
    const document = pageData.document;
    // 
    const parallaxElement = document.getElementById('parallax');
    const parallaxAnimations: { hash: string, translateAmount: number }[] = [];
    cloneDoodlesToFillPool(parallaxElement);
    for (let child of parallaxElement.children) {
        const doodleElement = child as HTMLElement;
        // 
        const { xOffset, yOffset } = calculateRandomDoodleOffset(parallaxElement.childElementCount);
        doodleElement.style.translate = `${xOffset}vw ${yOffset}px`;
        //
        const translateAmount = randomFromRange(-2000, -6000);
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