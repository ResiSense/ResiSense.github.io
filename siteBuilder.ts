import fs = require('fs-extra');
import path = require('path');
import { JSDOM } from "jsdom";
import { PaintableHtml, TemplateCache, compileTemplates, paintPageHtml } from './lib/templatePainter';
import { Page, flattenedPageConfig, getTrace } from './lib/PageConfig';
import { populatePageFromMarkdown } from './lib/markdownPopulator';
import { promisifyCallback, toTitleCase } from './lib/utils';
import { PageData } from './lib/PageData';


console.log(`Running ${path.basename(__filename)}...`)

const mode = process.argv[2].substring(2);
const targetDirectory = mode === 'dev' ? 'test' : mode === 'prod' ? 'docs' : null;
if (!targetDirectory) { throw new Error('Invalid mode!') };

(async () => {
    await Promise.all([
        cloneDirectory('assets', targetDirectory),
        cloneDirectory('styles', targetDirectory),
        cloneDirectory('scripts', targetDirectory),
    ]);
    console.log(`Cloned directories to ${targetDirectory}.`);
    // 
    const templateCache: TemplateCache = await compileTemplates();
    console.log(`Compiled templates.`);
    // 
    await Promise.all(flattenedPageConfig.pages.map(page => buildFile(page, templateCache).catch(error => console.error(error))));
    // 
    console.log(`${path.basename(__filename)} is done!`);
})();

/* -------------------------------------------------------------------------- */
function cloneDirectory(source: string, destination: string): Promise<void> {
    fs.emptyDirSync(targetDirectory);
    const FS_CP = promisifyCallback(fs.cp, path.resolve(source), path.resolve(destination, path.basename(source)), { recursive: true });
    return FS_CP;
}
/* -------------------------------------------------------------------------- */
async function buildFile(page: Page, templateCache: TemplateCache): Promise<void> {
    const filename = 'boiler-plate.html';
    const rawHtml = fs.readFileSync(filename, 'utf8');
    const paintedHtml: PaintableHtml = paintPageHtml({ html: rawHtml }, templateCache);
    const document = new JSDOM(paintedHtml.html).window.document;
    document.title = page.title || toTitleCase(page.name);

    const pageData: PageData = {
        page,
        document,
        paintedHtml,
    };

    insertCssEmbeds(pageData);
    insertJsRuntimes(pageData);

    runTsPostPaints(pageData);
    switch (page.populator || 'markdown ') {
        case 'html':
            break;
        case 'markdown':
            await populatePageFromMarkdown(pageData);
            break;
        default:
            throw new Error(`Invalid populator: ${page.populator}`);
    }
    runTsPostPopulations(pageData);
    runTsIncludes(pageData);

    fs.writeFileSync(path.resolve(targetDirectory, `${getTrace(page).join('/')}.html`), `<!DOCTYPE html>\n${document.documentElement.outerHTML}`, 'utf8');
}
/* -------------------------------------------------------------------------- */
function insertCssEmbeds(pageData: PageData) {
    const paintedHtml = pageData.paintedHtml;
    const document = pageData.document;
    const cssIncludes = pageData.page.includes?.css;
    // 
    const cssPaths: string[] = [];
    cssPaths.push(...paintedHtml.css?.embed || []);
    cssPaths.push(...cssIncludes || []);
    cssPaths.forEach(cssPath => {
        const linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.type = 'text/css';
        linkTag.href = cssPath;
        document.head.appendChild(linkTag);
    });
}
function runTsPostPaints(pageData: PageData) {
    const paintedHtml = pageData.paintedHtml;
    // 
    const tsPaths: string[] = [];
    tsPaths.push(...paintedHtml.ts?.postPaint || []);
    tsPaths.forEach(tsPath => {
        const scriptPath = `.${tsPath}`;
        console.log(`Running postPaint: ${scriptPath}`);
        const postPaintFunction: (pageData: PageData) => void = require(scriptPath).default;
        postPaintFunction(pageData);
    });
}
function runTsPostPopulations(pageData: PageData) {
    const paintedHtml = pageData.paintedHtml;
    // 
    const tsPaths: string[] = [];
    tsPaths.push(...paintedHtml.ts?.postPopulation || []);
    tsPaths.forEach(tsPath => {
        const scriptPath = `.${tsPath}`;
        console.log(`Running postPopulation: ${scriptPath}`);
        const postPopulationFunction: (pageData: PageData) => void = require(scriptPath).default;
        postPopulationFunction(pageData);
    });
}
function insertJsRuntimes(pageData: PageData) {
    const paintedHtml = pageData.paintedHtml;
    const document = pageData.document;
    const jsIncludes = pageData.page.includes?.js;
    // 
    const jsPaths: string[] = [];
    jsPaths.push(...paintedHtml.js?.runtime || []);
    jsPaths.push(...jsIncludes || []);
    jsPaths.forEach(jsFile => {
        const scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = jsFile;
        scriptTag.defer = true;
        document.head.appendChild(scriptTag);
    });
}
function runTsIncludes(pageData: PageData) {
    const tsPaths: string[] = [];
    tsPaths.push(...pageData.page.includes?.ts || []);
    tsPaths.forEach(tsFile => {
        const tsPath = `.${tsFile}`;
        console.log(`Running tsInclude: ${tsPath}`);
        const tsIncludeFunction: (pageData: PageData) => void = require(tsPath).default;
        tsIncludeFunction(pageData);
    });
}
/* -------------------------------------------------------------------------- */