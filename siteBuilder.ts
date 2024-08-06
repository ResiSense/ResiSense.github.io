import fs = require('fs-extra');
import path = require('path');
import { JSDOM } from 'jsdom';

import TemplatePainter, { PaintableHtml, TemplateCache } from './lib/framework-lib/TemplatePainter';
import Pages, { Page } from './lib/types/Pages';
import MarkdownPopulator from './lib/framework-lib/MarkdownPopulator';
import Utils from './lib/framework-lib/Utils';
import { PageData } from './lib/types/PageData';
import HtmlFullReplacer from './lib/framework-lib/HtmlFullReplacer';
import HtmlFramePopulator from './lib/framework-lib/HtmlFramePopulator';
import Searchable from './lib/types/Searchable';

const mode = process.env.NODE_ENV?.trim() as typeof MODES[keyof typeof MODES];
console.log(`Running ${path.basename(__filename)}...`);

enum MODES {
    DEV = 'dev',
    PROD = 'prod',
}
const targetDirectory = (() => {
    switch (mode) {
        case MODES.DEV:
            return 'test';
        case MODES.PROD:
            return 'docs';
    }
})();
if (!targetDirectory) { throw new Error('Invalid mode!'); }

(async () => {
    await Promise.all([
        cloneDirectory('assets', targetDirectory),
        cloneDirectory('styles', targetDirectory),
        // cloneDirectory('scripts', targetDirectory).then(addIdentifierLogToTsEmbeds),
    ]);
    console.log(`Cloned directories to ${targetDirectory}.`);
    // 
    const templateCache: TemplateCache = await TemplatePainter.compileTemplates();
    console.log(`Compiled templates.`);
    // 
    await Promise.all(Pages.flattenedPageConfig.pages.map(page => buildFile(page, templateCache)));
    console.log(`Built all pages.`);
    // 
    await Promise.all(Pages.flattenedPageConfig.pages.map(page => buildAliasFile(page)));
    console.log(`Built all aliases.`);
    //
    await fs.writeJson(path.resolve(targetDirectory, 'search-index.json'), Searchable.index);
    //? This has serialisation issues
    // await fs.writeJson(path.resolve(targetDirectory, 'search-targets.json'), Searchable.targets);
    // 
    console.log(`${path.basename(__filename)} is done!`);
})();

/* -------------------------------------------------------------------------- */
function cloneDirectory(source: string, destination: string): Promise<void> {
    const FS_CP = Utils.promisifyCallback(fs.cp, path.resolve(source), path.resolve(destination, path.basename(source)), { recursive: true });
    return FS_CP;
}
/* -------------------------------------------------------------------------- */
function addIdentifierLogToTsEmbeds() {
    const jsDirectory = path.resolve(targetDirectory, 'scripts');
    const jsFiles = fs.readdirSync(jsDirectory);
    jsFiles.forEach(jsFile => {
        const jsPath = path.resolve(jsDirectory, jsFile);
        const jsContent = fs.readFileSync(jsPath, 'utf8');
        const jsContentWithLog = `console.log(\`Script running: \${ document.currentScript.src }\`);\n//\n${jsContent}`;
        fs.writeFileSync(jsPath, jsContentWithLog);
    });
}
/* -------------------------------------------------------------------------- */
async function buildFile(page: Page, templateCache: TemplateCache): Promise<void> {
    console.log(`Building ${page.trace.join('/')}...`);
    //
    const filename: string = (() => {
        switch (page.populator || 'markdown ') {
            case 'html-full':
                return HtmlFullReplacer.baseFilename(page);
            case 'html-frame':
                return HtmlFramePopulator.baseFilename;
            case 'markdown':
                return MarkdownPopulator.baseFilename;
            default:
                throw new Error(`Invalid populator: ${page.populator}`);
        }
    })();
    const rawHtml = fs.readFileSync(filename, 'utf8');
    const paintedHtml: PaintableHtml = TemplatePainter.paintPageHtml({ html: rawHtml }, templateCache);
    const document = new JSDOM(paintedHtml.html).window.document;
    page.title = page.title || Utils.toTitleCase(page.name);
    document.title = page.title;

    const pageData: PageData = {
        targetDirectory,
        page,
        document,
        paintedHtml,
    };

    insertCssEmbeds(pageData);
    insertTsEmbeds(pageData);

    runTsPostPaints(pageData);
    switch (page.populator || 'markdown ') {
        case 'html-full':
            await HtmlFullReplacer.replacePageWithFullHtml(pageData);
            break;
        case 'html-frame':
            await HtmlFramePopulator.populatePageWithHtmlFrame(pageData);
            break;
        case 'markdown':
            await MarkdownPopulator.populatePageFromMarkdown(pageData);
            break;
        default:
            throw new Error(`Invalid populator: ${page.populator}`);
    }
    runTsPostPopulations(pageData);
    runTsIncludes(pageData);

    if (mode === MODES.DEV) { addHtmlExtensionsToAnchorHrefs(pageData); }

    if (pageData.page.hideFromCatalogue) {
        console.log(`Skipping indexing ${page.trace.join('/')}...`);
    } else {
        pageData.htmlPollutedRawContent === undefined
            ? console.warn(`htmlPollutedRawContent not found for ${page.trace.join('/')}`)
            : Searchable.addEntry(page.trace.join('/'), page.title, pageData);
    }

    const htmlFileContent = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
    Utils.writeFileSyncWithMakeDirectory(path.resolve(targetDirectory, `${page.trace.join('/')}.html`), htmlFileContent);
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
function insertTsEmbeds(pageData: PageData) {
    const paintedHtml = pageData.paintedHtml;
    const document = pageData.document;
    const jsIncludes = pageData.page.includes?.js;
    // 
    const jsPaths: string[] = [];
    jsPaths.push(...paintedHtml.js?.embed || []);
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
function addHtmlExtensionsToAnchorHrefs(pageData: PageData) {
    const document = pageData.document;
    const anchors = document.querySelectorAll('a');
    anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href) { return; }
        if (href.endsWith('.html')) { return; }
        if (href === '/') {
            anchor.href = '/index.html';
            return;
        }
        if (href.startsWith('/') && !href.endsWith('/')) {
            anchor.href = `${href}.html`;
            return;
        }
    });
}
/* -------------------------------------------------------------------------- */
async function buildAliasFile(page: Page): Promise<void> {
    if (!page.redirectAliasPaths) { return; }
    const pathName = page.trace.join('/');
    const redirectHtml = await fs.readFile('./redirect.html', 'utf8');

    console.log(`Building aliases for ${pathName}...`);
    page.redirectAliasPaths.forEach(aliasPath => {
        const aliasHtml = redirectHtml.replace('[[path]]', pathName);
        Utils.writeFileSyncWithMakeDirectory(path.resolve(targetDirectory, `${aliasPath}.html`), aliasHtml);
    });
}