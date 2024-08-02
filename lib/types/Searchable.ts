import { PageData } from './PageData';
import { htmlToText } from 'html-to-text';
import fuzzysort from 'fuzzysort';

type SearchIndex = SearchIndexEntry[];
type SearchIndexEntry = {
    path: string;
    title: string;
    content: string;
}
export type SearchTarget = { path: string, title: Fuzzysort.Prepared, content: Fuzzysort.Prepared };

function sanitiseRawContent(htmlPollutedRawContent: string): string {
    let sanitisedRawContent = htmlToText(htmlPollutedRawContent,
        {
            wordwrap: false,
            selectors: [
                { selector: '*', options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
                { selector: 'img', format: 'skip' },
                { selector: 'hr', format: 'skip' },
                { selector: 'blockquote', format: 'block' },
                { selector: 'a', options: { ignoreHref: true } },
            ],
        }
    );
    // sanitisedRawContent = sanitisedRawContent.replace(/\s/g, ' ');
    // sanitisedRawContent = sanitisedRawContent.replace(/\s{2,}/g, '\n');
    sanitisedRawContent = sanitisedRawContent.replace(/\n{2,}/g, '\n');
    return sanitisedRawContent;
}

export default class Searchable {
    static index: SearchIndex = [];
    private static _targets: SearchTarget[];

    static get targets(): SearchTarget[] {
        const targets: SearchTarget[] = [];
        this.index.forEach(entry => targets.push({
            path: entry.path,
            title: fuzzysort.prepare(entry.title),
            content: fuzzysort.prepare(entry.content.replace('<b>', '').replace('</b>', ''))
        }));
        this._targets = targets;
        return this._targets;
    }

    static addEntry(path: string, title: string, pageData: PageData) {
        this.index.push({
            path, title, content: sanitiseRawContent(
                pageData.htmlPollutedRawContent
                ?? (() => { throw new Error(`htmlPollutedRawContent not found for ${path}!`) })()
            )
        });
    }
}