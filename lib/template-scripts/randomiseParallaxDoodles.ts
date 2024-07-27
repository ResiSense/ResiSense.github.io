import { PageData } from "../types/PageData";
import fs = require('fs-extra');

const Y_DENSITY_PER_PX = 5 / 1000; // in count per px
const GRADATION_HEIGHT = 100; // in px

function randomFromRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function calculatePageSizeHeuristic(contentLength: number): number {
    const x = contentLength;
    //! This is a magic number heuristic formula from regression
    return -9E-06 * x ** 2 + 0.3999 * x + 633.12; // quadratic
    // return 0.2332 * x + 1147.2; // linear
    // return 10000; // constant
}

function cloneDoodlesToFillPool(parallaxDoodleContainer: HTMLElement, Y_PAGE_SIZE_HEURISTIC: number) {
    // 
    const requiredDoodleCount = Y_DENSITY_PER_PX * Y_PAGE_SIZE_HEURISTIC * 2;
    // make a doodle bag to clone from
    const doodleBag: HTMLElement[] = Array.from(parallaxDoodleContainer.children).map(child => child.cloneNode(true) as HTMLElement);
    // fill the pool
    while (parallaxDoodleContainer.childElementCount < requiredDoodleCount) {
        doodleBag.forEach(doodle => {
            const clone = doodle.cloneNode(true) as HTMLElement;
            parallaxDoodleContainer.appendChild(clone);
        });
    }
    // shuffle the pool
    const pool = Array.from(parallaxDoodleContainer.children);
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // put the shuffled pool back in the parallax doodle container
    parallaxDoodleContainer.innerHTML = '';
    pool.forEach(doodle => parallaxDoodleContainer.appendChild(doodle));
    // remove excess doodles
    while (parallaxDoodleContainer.childElementCount > requiredDoodleCount) {
        parallaxDoodleContainer.removeChild(parallaxDoodleContainer.lastElementChild);
    }
}

function calculateRandomDoodleOffset(siblingCount: number) {
    // I'm not sure doing the randomisation in two steps is any better than doing it in one step?
    const gradationCount = siblingCount / Y_DENSITY_PER_PX / GRADATION_HEIGHT;
    const gradationNumber = Math.floor(Math.random() * gradationCount);
    const xOffset = randomFromRange(0, 100); // in vw
    const yOffset = (gradationNumber + randomFromRange(0, 1)) * GRADATION_HEIGHT; // in px
    return { xOffset, yOffset };
}

function calculateRandomTranslateAmount(Y_PAGE_SIZE_HEURISTIC: number) {
    const MEDIAN_FACTOR = 17e-5;
    const DEVIATION_FACTOR = MEDIAN_FACTOR / 2;
    const median = -Y_PAGE_SIZE_HEURISTIC * Y_PAGE_SIZE_HEURISTIC * MEDIAN_FACTOR;
    const deviation = Y_PAGE_SIZE_HEURISTIC * Y_PAGE_SIZE_HEURISTIC * DEVIATION_FACTOR;
    return randomFromRange(median - deviation, median + deviation);
}

export default function (pageData: PageData) {
    const PARALLAX_DOODLE_CSS_PATH = `${pageData.targetDirectory}/styles/parallax-doodle.css`;
    const document = pageData.document;
    // 
    const parallaxDoodleContainer = document.getElementById('parallax-doodle-container');
    if (parallaxDoodleContainer.childElementCount === 0) {
        console.warn('Parallax doodle container is empty!');
        return;
    }
    const ANIMATION_NAME_PREFIX = 'parallax-doodle';
    const parallaxDoodleAnimations: { hash: string, translateAmount: number }[] = [];
    const contentLength = document.getElementsByTagName('painted-content')[0].innerHTML.length;
    const Y_PAGE_SIZE_HEURISTIC = calculatePageSizeHeuristic(contentLength);
    cloneDoodlesToFillPool(parallaxDoodleContainer, Y_PAGE_SIZE_HEURISTIC);
    for (let child of parallaxDoodleContainer.children) {
        const doodleElement = child as HTMLElement;
        // 
        const { xOffset, yOffset } = calculateRandomDoodleOffset(parallaxDoodleContainer.childElementCount);
        doodleElement.style.translate = `${xOffset}vw ${yOffset}px`;
        //
        const translateAmount = calculateRandomTranslateAmount(Y_PAGE_SIZE_HEURISTIC);
        const hash = translateAmount.toString(36).substring(7);
        doodleElement.style.animationName = `${ANIMATION_NAME_PREFIX}-${hash}`;
        parallaxDoodleAnimations.push({ hash, translateAmount });
    }
    //
    const css = fs.readFileSync(PARALLAX_DOODLE_CSS_PATH, 'utf8');
    let newCss = css;
    parallaxDoodleAnimations.forEach(({ hash, translateAmount }) => {
        newCss += `
            @keyframes ${ANIMATION_NAME_PREFIX}-${hash} {
                to { transform: translateY(${translateAmount}px); }
            }
        `;
    });
    fs.writeFileSync(PARALLAX_DOODLE_CSS_PATH, newCss);
}