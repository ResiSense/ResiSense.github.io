/*
    This module replaces a page with content from an HTML file.
    It grabs the HTML file from /pages/{pageTrace}.html and replaces the page with it entirely.
*/

import { Page, getTrace } from "./PageConfig";
import fs = require('fs-extra');
import { PageData } from "./PageData";

export default class htmlFullReplacer {
    static baseFilename = (page: Page) => {
        return `pages/${getTrace(page).join('.')}.html`;
    };

    static async replacePageWithFullHtml(pageData: PageData) {
        const page = pageData.page;
        // 
        const htmlPath = `pages/${getTrace(page).join('.')}.html`;
        console.log(`Replacing ${page.name}.html with ${htmlPath}...`);
        const html = await fs.readFile(htmlPath, 'utf8').catch(() => { throw new Error(`Failed to read ${htmlPath}!`) });
        pageData.paintedHtml.html = html;
        return;
    }
}