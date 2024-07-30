/* 
+------------------------------------------------------------------------+ 
|                            Template Painter                            |
+------------------------------------------------------------------------+

---------------------------------- Brief ---------------------------------

Templates are grabbed from /templates/. and are painted onto the page,
starting from template.html, then recursively finding <custom-foo /> tags
and replacing them with the contents of /templates/foo.html.

Yes I am basically reinventing React. No I don't care because this is fun.

-------------------------------------------------------------------------- 
*/

import fs = require('fs-extra');

export type TemplateCache = {
    [key: string]: Template;
}

type Template = PaintableHtml & {
    painted: boolean;
}

export type PaintableHtml = {
    html: string;
    ts?: {
        postPaint?: string[],
        postPopulation?: string[],
    },
    js?: {
        embed?: string[],
    },
    css?: {
        embed?: string[]
    },
}

const REGEX = {
    template: /<custom-([a-z]|-)+ \/>/g,
    tsPostPaint: /<ts-post-paint src=".*\.ts" \/>/g,
    jsEmbed: /<js-embed src=".*\.js" \/>/g,
    tsPostPopulation: /<ts-post-population src=".*\.ts" \/>/g,
    cssEmbed: /<css-embed href=".*\.css" \/>/g,
} as const;

async function compileTemplates(): Promise<TemplateCache> {
    const templateCache = await cacheTemplates();
    paintTemplates();
    return templateCache;

    async function cacheTemplates(): Promise<TemplateCache> {
        const templateCache: TemplateCache = {};
        const templateFiles = fs.readdirSync('templates');

        const promises: Promise<void>[] = [];
        templateFiles.forEach(templateFile =>
            promises.push(new Promise((resolve, reject) => {
                const templateName = templateFile.replace('.html', '');
                const templateHtml = fs.readFileSync(`templates/${templateFile}`, 'utf8');
                templateCache[templateName] = {
                    html: templateHtml,
                    painted: false,
                }
                resolve();
            }))
        );
        await Promise.all(promises);
        return templateCache;
    }

    function paintTemplates() {
        const templateNames = Object.keys(templateCache);
        templateNames.forEach(templateName => {
            const template = templateCache[templateName];
            if (!template.painted) { return; }
            paintTemplate(template);
        });
    }

    function paintTemplate(template: Template): Template {
        if (template.painted) { return template; }
        // 
        if (!htmlStripMatch(template.html, REGEX.template)) {
            template.painted = true;
            return template;
        }
        template = paintHtmlFragment(template, templateCache) as Template;
        return paintTemplate(template);
    }
}

function paintHtmlFragment(paintableHtml: PaintableHtml, templateCache: TemplateCache): PaintableHtml {
    paintableHtml.ts = paintableHtml.ts || { postPaint: [], postPopulation: [] };
    paintableHtml.js = paintableHtml.js || { embed: [] };
    paintableHtml.css = paintableHtml.css || { embed: [] };

    // templates
    htmlStripMatch(paintableHtml.html, REGEX.template)?.forEach(customTag => {
        const customTagName = customTag.replace('<custom-', '').replace(' />', '');
        const customTemplate = templateCache[customTagName];
        if (!customTemplate) { throw new Error(`Template not found: ${customTagName}`); }
        paintableHtml.html = paintableHtml.html.replace(customTag,
            `<painted-${customTagName}> ${customTemplate.html} </painted-${customTagName}>`
        );

        paintableHtml.ts.postPaint.push(...customTemplate.ts?.postPaint || []);
        paintableHtml.js.embed.push(...customTemplate.js?.embed || []);
        paintableHtml.ts.postPopulation.push(...customTemplate.ts?.postPopulation || []);
        paintableHtml.css.embed.push(...customTemplate.css?.embed || []);
    });

    // js
    paintableHtml.html = paint(paintableHtml.html, REGEX.tsPostPaint, '<ts-post-paint src="', '" />', paintableHtml.ts.postPaint);
    paintableHtml.html = paint(paintableHtml.html, REGEX.jsEmbed, '<js-embed src="', '" />', paintableHtml.js.embed);
    paintableHtml.html = paint(paintableHtml.html, REGEX.tsPostPopulation, '<ts-post-population src="', '" />', paintableHtml.ts.postPopulation);

    // css
    paintableHtml.html = paint(paintableHtml.html, REGEX.cssEmbed, '<css-embed href="', '" />', paintableHtml.css.embed);

    return paintableHtml;

    function paint(html: string, regex: RegExp, replaceHead: string, replaceTail: string, includeList: string[]) {
        htmlStripMatch(html, regex)?.forEach(match => {
            const path = match.replace(replaceHead, '').replace(replaceTail, '');
            html = html.replace(match, '');
            includeList.push(path);
        });
        return html;
    }
}

function paintPageHtml(paintableHtml: PaintableHtml, templateCache: TemplateCache): PaintableHtml {
    while (htmlStripMatch(paintableHtml.html, REGEX.template)) {
        paintHtmlFragment(paintableHtml, templateCache);
    }
    return paintableHtml;
}

/**
 * Strips HTML comments from the given HTML string and returns the result of string.prototype.match() against the provided regular expression.
 * @param html - The HTML string to strip comments from.
 * @param arg - The regular expression to match against the stripped HTML.
 * @returns The result of matching the stripped HTML against the provided regular expression, or null if there is no match.
 */
function htmlStripMatch(html: string, regexp: string | RegExp): RegExpMatchArray | null;
function htmlStripMatch(html: string, matcher: { [Symbol.match](string: string): RegExpMatchArray | null; }): RegExpMatchArray | null;
function htmlStripMatch(html: string, arg: any): RegExpMatchArray | null {
    const strippedHtml = html.replace(/<!--[\s\S]*?-->/g, '');
    return strippedHtml.match(arg);
}

export default class TemplatePainter {
    static compileTemplates = compileTemplates;
    static paintPageHtml = paintPageHtml;
}