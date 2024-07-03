/*
    This module populates a page with content from a markdown file.
    It grabs the markdown file from /pages/{pageTrace}.md and parses it with the marked module into HTML elements.
    It then adds IDs to headings for hash navigation and wraps heading sections in <section> elements.
*/

import { marked } from "marked";
import { getTrace } from "./PageConfig";
import fs = require('fs-extra');
import { PageData } from "./PageData";

async function populatePageFromMarkdown(pageData: PageData) {
    const page = pageData.page;
    const document = pageData.document;
    // 
    const markdownPath = `pages/${getTrace(page).join('.')}.md`;
    console.log(`Populating ${page.name}.html from ${markdownPath}...`);
    const markdown = await fs.readFile(markdownPath, 'utf8').catch(() => { throw new Error(`Failed to read ${markdownPath}!`) });
    const parsedMarkdown = await marked.parse(markdown);
    const paintableContentElement = document.createElement('painted-content');
    document.querySelector('paintable-content').replaceWith(paintableContentElement);
    paintableContentElement.innerHTML = parsedMarkdown;

    var contentHeadingElements: HTMLHeadingElement[] = [];
    addIdsToHeadings();
    wrapHeadingSectionsInSections();
    coerceRedirectsToNewTabs();
    pageData.contentHeadingElements = contentHeadingElements;
    return;

    function addIdsToHeadings() {
        // console.log('Adding IDs to headings...');
        paintableContentElement.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading: HTMLHeadingElement) => {
            const scrollMarker = document.createElement('div');
            scrollMarker.classList.add('scroll-marker');
            scrollMarker.dataset.scrollMarkerLevel = heading.tagName;
            var id = heading.textContent.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
            while (document.getElementById(id)) { id += '-'; }
            scrollMarker.id = id;
            heading.id = id;
            heading.parentElement.insertBefore(scrollMarker, heading);

            contentHeadingElements.push(heading);
        });
        Object.freeze(contentHeadingElements);
    }
    function wrapHeadingSectionsInSections() {
        // console.log('Wrapping heading sections...');
        wrapHeadingSection(paintableContentElement, 0);
        // 
        function wrapHeadingSection(wrapParentElement: HTMLElement, level: number) {
            const headingTagNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
            const headingTagName = headingTagNames[level];
            Array.from(wrapParentElement.getElementsByTagName(headingTagName)).forEach(heading => {
                const children = [];

                children.push(heading);
                let nextElement = heading.nextElementSibling;
                while (nextElement && nextElement.tagName !== headingTagName) {
                    children.push(nextElement);
                    nextElement = nextElement.nextElementSibling;
                }

                const sectionElement = document.createElement('section');
                heading.parentNode.insertBefore(sectionElement, heading);
                children.forEach(child => { sectionElement.appendChild(child); });

                if (level < headingTagNames.length - 1) { wrapHeadingSection(sectionElement, level + 1); }
            });
        }
    }
    function coerceRedirectsToNewTabs() {
        // console.log('Coercing redirects to new tabs...');
        paintableContentElement.querySelectorAll('a').forEach(link => {
            if (link.href.startsWith('/')) { return; } // Internal link - do nothing
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

        });
    }
}

export { populatePageFromMarkdown }