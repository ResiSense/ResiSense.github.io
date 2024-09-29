import { PageData } from "../types/PageData";
import fs = require('fs-extra');
import PDFGrid from "./randomiseParallaxDoodles-PDFGrid";
import Vector2 from "../types/Vector2";

const DOODLE_Y_DENSITY_PER_PX = 3 / 1000;
const GRID_Y_CELL_SIZE_PX = 20;

const PDF_σ = 16; //! Infinite loop potential if this is too high
const PDF_RADIUS_PX = 240; //! Infinite loop potential if this is too high
//? This is a Gaussian function that returns a value between 0 and 1 based on the distance between two doodles, modified with a radius where the value is 1
const PDF_REPULSION_PROBABILITY_FUNCTION =
    (d: number) => d > PDF_RADIUS_PX / GRID_Y_CELL_SIZE_PX ? Math.exp(-d * d / (2 * PDF_σ * PDF_σ)) : 1;

function randomFromRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function calculatePageSizeHeuristic(contentLength: number, pageName: string): number {
    const x = contentLength;
    console.log(pageName, 'content length:', x);
    //! This is a magic number heuristic formula from regression
    //$ Update this for every major style change
    return -1E-06 * x ** 2 + 0.3693 * x + 824.75; // quadratic
}

function cloneDoodlesToFillPool(parallaxDoodleContainer: HTMLElement, Y_PAGE_SIZE_HEURISTIC: number) {
    // 
    const requiredDoodleCount = DOODLE_Y_DENSITY_PER_PX * Y_PAGE_SIZE_HEURISTIC * 2;
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
        (parallaxDoodleContainer.lastElementChild as HTMLElement).remove();
    }
}

const randomDoodleOffsets: Map<PDFGrid, Vector2[]> = new Map();
const placeRandomTimes: Map<PDFGrid, number[]> = new Map();
const placeRandomAttempts: Map<PDFGrid, number[]> = new Map();
function calculateRandomDoodleOffset(pdfGrid: PDFGrid): Vector2 {
    //! PERFORMANCE
    const startTime = performance.now();
    //! -----------

    const [randomOffset, attempts] = pdfGrid.placeRandom();

    //! PERFORMANCE
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    placeRandomTimes.set(pdfGrid, (placeRandomTimes.get(pdfGrid) ?? []).concat(elapsedTime));
    placeRandomAttempts.set(pdfGrid, (placeRandomAttempts.get(pdfGrid) ?? []).concat(attempts));
    console.log('Doodle placement took', Math.round(elapsedTime * 1000) / 1000, 'ms', 'in', attempts, 'attempts');
    //! -----------

    randomOffset.y *= GRID_Y_CELL_SIZE_PX;
    randomDoodleOffsets.set(pdfGrid, (randomDoodleOffsets.get(pdfGrid) ?? []).concat(randomOffset));
    return randomOffset;
}

function calculateRandomTranslateAmount(Y_PAGE_SIZE_HEURISTIC: number) {
    const MEDIAN_FACTOR = 17e-5;
    const DEVIATION_FACTOR = MEDIAN_FACTOR / 2;
    const median = -Y_PAGE_SIZE_HEURISTIC * Y_PAGE_SIZE_HEURISTIC * MEDIAN_FACTOR;
    const deviation = Y_PAGE_SIZE_HEURISTIC * Y_PAGE_SIZE_HEURISTIC * DEVIATION_FACTOR;
    return randomFromRange(median - deviation, median + deviation);
}

function reportDoodleDistribution(pdfGrid: PDFGrid, Y_PAGE_SIZE_HEURISTIC: number) {
    const offsets = randomDoodleOffsets.get(pdfGrid);
    if (offsets === undefined) { return; }
    const averageDistance = offsets.reduce((acc, offset, i, arr) => {
        let sum = 0;
        for (let otherOffset of arr) {
            sum += Vector2.distanceTo(offset, otherOffset);
        }
        return acc + sum / arr.length;
    }, 0) / offsets.length / Y_PAGE_SIZE_HEURISTIC;
    console.log('Average distance between doodles:', averageDistance);
}

export default function (pageData: PageData) {
    const PARALLAX_DOODLE_CSS_PATH = `${pageData.targetDirectory}/styles/parallax-doodle.css`;
    const document = pageData.document;
    // 
    const parallaxDoodleContainer = document.getElementById('parallax-doodle-container')
        || (() => { throw new Error('Parallax doodle container not found!') })();
    if (parallaxDoodleContainer.childElementCount === 0) {
        console.warn('Parallax doodle container is empty!');
        return;
    }
    const ANIMATION_NAME_PREFIX = 'parallax-doodle';
    const parallaxDoodleAnimations: { hash: string, translateAmount: number }[] = [];
    const contentLength = document.getElementsByTagName('painted-content')[0].innerHTML.length;
    const Y_PAGE_SIZE_HEURISTIC = calculatePageSizeHeuristic(contentLength, pageData.page.name);
    try {
        cloneDoodlesToFillPool(parallaxDoodleContainer, Y_PAGE_SIZE_HEURISTIC);
    } catch (e) {
        console.error(e);
        console.warn(`Skipping doodles for ${pageData.page.name}`);
        return;
    }
    const pdfGrid = new PDFGrid(100, Y_PAGE_SIZE_HEURISTIC / GRID_Y_CELL_SIZE_PX * 1.5, PDF_REPULSION_PROBABILITY_FUNCTION);

    //! PERFORMANCE
    const startTime = performance.now();
    //! -----------
    for (let child of parallaxDoodleContainer.children) {
        const doodleElement = child as HTMLElement;
        // 
        const offset = calculateRandomDoodleOffset(pdfGrid);
        doodleElement.style.translate = `${offset.x}vw ${offset.y}px`;
        //
        const translateAmount = calculateRandomTranslateAmount(Y_PAGE_SIZE_HEURISTIC);
        const hash = translateAmount.toString(36).substring(7);
        doodleElement.style.animationName = `${ANIMATION_NAME_PREFIX}-${hash}`;
        parallaxDoodleAnimations.push({ hash, translateAmount });
    }
    //! PERFORMANCE
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    const times = placeRandomTimes.get(pdfGrid) ?? [];
    const attempts = placeRandomAttempts.get(pdfGrid) ?? [];
    console.log('Placing', times.length, 'doodles for', pageData.page.name, 'took', Math.round(elapsedTime * 1000) / 1000, 'ms');
    console.log(
        'Time:',
        'avg', Math.round(times.reduce((acc, time) => acc + time, 0) / times.length * 1000) / 1000, 'ms;',
        'max', Math.round(Math.max(...times) * 1000) / 1000, 'ms'
    );
    console.log(
        'Attempts:',
        'avg', Math.round(attempts.reduce((acc, attempts) => acc + attempts, 0) / attempts.length * 10) / 10, ';',
        'max', Math.max(...attempts)
    );
    //! -----------
    reportDoodleDistribution(pdfGrid, Y_PAGE_SIZE_HEURISTIC);

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