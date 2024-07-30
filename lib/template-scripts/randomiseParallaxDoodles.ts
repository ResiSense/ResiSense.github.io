import { PageData } from "../types/PageData";
import fs = require('fs-extra');

const Y_DENSITY_PER_PX = 5 / 1000; // in count per px
const GRADATION_HEIGHT = 100; // in px

class Vector2 {
    constructor(public x: number, public y: number) { }
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    divide(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }
    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get normalised(): Vector2 {
        return this.divide(this.magnitude);
    }
    distanceTo(other: Vector2): number {
        return this.subtract(other).magnitude;
    }

    static distanceTo(a: Vector2, b: Vector2): number {
        return a.distanceTo(b);
    }
}

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

const randomDoodleOffsets: Vector2[] = [];
function calculateRandomDoodleOffset(siblingCount: number): Vector2 {
    // I'm not sure doing the randomisation in two steps is any better than doing it in one step?
    const gradationCount = siblingCount / Y_DENSITY_PER_PX / GRADATION_HEIGHT;
    const gradationNumber = Math.floor(Math.random() * gradationCount);
    const offset = new Vector2(
        randomFromRange(0, 100), // in vw
        (gradationNumber + randomFromRange(0, 1)) * GRADATION_HEIGHT, // in px
    );
    const repulsedOffset = applyRepulsion(offset);
    randomDoodleOffsets.push(repulsedOffset);
    return repulsedOffset;
    // 
    function applyRepulsion(offset: Vector2): Vector2 {
        const repulsionFalloff = 10;
        const repulsionStrength = 20;
        const repulsedOffset = new Vector2(offset.x, offset.y);
        for (let otherOffset of randomDoodleOffsets) {
            // use a repulsion force based on distance, exponential decay
            const distance = Vector2.distanceTo(offset, otherOffset);
            const repulsion = Math.exp(-distance / repulsionFalloff) * repulsionStrength;
            const repulsionDirection = offset.subtract(otherOffset).normalised;
            repulsedOffset.add(repulsionDirection.multiply(repulsion));
        }
        return repulsedOffset;
    }
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
        const offset = calculateRandomDoodleOffset(parallaxDoodleContainer.childElementCount);
        doodleElement.style.translate = `${offset.x}vw ${offset.y}px`;
        //
        const translateAmount = calculateRandomTranslateAmount(Y_PAGE_SIZE_HEURISTIC);
        const hash = translateAmount.toString(36).substring(7);
        doodleElement.style.animationName = `${ANIMATION_NAME_PREFIX}-${hash}`;
        parallaxDoodleAnimations.push({ hash, translateAmount });
    }
    // calculate the average doodle offset distance from each other
    const averageDistance = randomDoodleOffsets.reduce((acc, offset, i, arr) => {
        let sum = 0;
        for (let otherOffset of arr) {
            sum += Vector2.distanceTo(offset, otherOffset);
        }
        return acc + sum / arr.length;
    }, 0) / randomDoodleOffsets.length / Y_PAGE_SIZE_HEURISTIC;
    console.log('Average distance between doodles:', averageDistance);
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