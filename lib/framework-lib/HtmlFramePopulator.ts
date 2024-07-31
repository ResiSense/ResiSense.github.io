/*
    This module populates a page with content from an HTML file.
    It grabs the HTML file from /pages/{pageTrace}.html and pushes it into the content frame.
*/

import fs = require('fs-extra');

import Pages from "../types/Pages";
import { PageData } from "../types/PageData";

const baseFilename = 'boiler-plate.html';

async function populatePageWithHtmlFrame(pageData: PageData) {
    const page = pageData.page;
    const document = pageData.document;
    // 
    const htmlPath = `pages/${Pages.getTrace(page).join('.')}.html`;
    console.log(`Populating ${page.name}.html from ${htmlPath}...`);
    const html = await fs.readFile(htmlPath, 'utf8').catch(() => { throw new Error(`Failed to read ${htmlPath}!`) });
    const paintableContentElement = document.createElement('painted-content');
    (document.querySelector('paintable-content')
        || (() => { throw new Error('<paintable-content> not found!') })()
    ).replaceWith(paintableContentElement);
    paintableContentElement.innerHTML = html;
    return;
}

export default class HtmlFramePopulator {
    static baseFilename = baseFilename;
    static populatePageWithHtmlFrame = populatePageWithHtmlFrame;
}