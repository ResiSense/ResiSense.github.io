/*
    This module populates a page with content from an HTML file.
    It grabs the HTML file from /pages/{pageTrace}.html and pushes it into the content frame.
*/

import { getTrace } from "./PageConfig";
import fs = require('fs-extra');
import { PageData } from "./PageData";

export default class htmlFramePopulator {
    static baseFilename = 'boiler-plate.html';

    static async populatePageFromMarkdown(pageData: PageData) {
        const page = pageData.page;
        const document = pageData.document;
        // 
        const htmlPath = `pages/${getTrace(page).join('.')}.html`;
        console.log(`Populating ${page.name}.html from ${htmlPath}...`);
        const html = await fs.readFile(htmlPath, 'utf8').catch(() => { throw new Error(`Failed to read ${htmlPath}!`) });
        const paintableContentElement = document.createElement('painted-content');
        document.querySelector('paintable-content').replaceWith(paintableContentElement);
        paintableContentElement.innerHTML = html;
        return;
    }
}