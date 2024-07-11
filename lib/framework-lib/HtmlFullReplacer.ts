/*
    This module replaces a page with content from an HTML file.
    It grabs the HTML file from /pages/{pageTrace}.html and replaces the page with it entirely.
*/

import fs = require('fs-extra');

import Pages from '../types/Pages';
import type { Page } from '../types/Pages';
import type { PageData } from '../types/PageData';

export default class htmlFullReplacer {
    static baseFilename = (page: Page) => {
        return `pages/${Pages.getTrace(page).join('.')}.html`;
    };

    static async replacePageWithFullHtml(pageData: PageData) {
        const page = pageData.page;
        // 
        const htmlPath = `pages/${Pages.getTrace(page).join('.')}.html`;
        console.log(`Replacing ${page.name}.html with ${htmlPath}...`);
        const html = await fs.readFile(htmlPath, 'utf8').catch(() => { throw new Error(`Failed to read ${htmlPath}!`) });
        pageData.paintedHtml.html = html;
        return;
    }
}