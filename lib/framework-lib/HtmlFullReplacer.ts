/*
    This module replaces a page with content from an HTML file.
    It grabs the HTML file from /pages/{pageTrace}.html and replaces the page with it entirely.
*/

import fs = require('fs-extra');

import { Page } from '../types/Pages';
import { PageData } from '../types/PageData';

const baseFilename = (page: Page) => {
    return `pages/${page.trace.join('.')}.html`;
};

async function replacePageWithFullHtml(pageData: PageData) {
    const page = pageData.page;
    // 
    const htmlPath = `pages/${page.trace.join('.')}.html`;
    console.log(`Replacing ${page.name}.html with ${htmlPath}...`);
    const html = await fs.readFile(htmlPath, 'utf8').catch(() => { throw new Error(`Failed to read ${htmlPath}!`) });
    pageData.paintedHtml.html = html;
    pageData.htmlPollutedRawContent = html;
    return;
}

export default class HtmlFullReplacer {
    static baseFilename = baseFilename;
    static replacePageWithFullHtml = replacePageWithFullHtml;
}