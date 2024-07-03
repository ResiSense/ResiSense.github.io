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

type TemplateCache = {
    [key: string]: Template;
}

type Template = PaintableHtml & {
    painted: boolean;
}

type PaintableHtml = {
    html: string;
    ts?: {
        postPaint?: string[],
        postPopulation?: string[],
    },
    js?: {
        runtime?: string[],
    },
    css?: {
        embed?: string[]
    },
}

const templateRegex = /<custom-([a-z]|-)+ \/>/g;
const tsPostPaintRegex = /<ts-post-paint src=".*\.ts" \/>/g;
const jsRuntimeRegex = /<js-runtime src=".*\.js" \/>/g;
const tsPostPopulationRegex = /<ts-post-population src=".*\.ts" \/>/g;
const cssEmbedRegex = /<css-embed href=".*\.css" \/>/g;

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
        if (!template.html.match(templateRegex)) {
            template.painted = true;
            return template;
        }
        template = paintHtmlFragment(template, templateCache) as Template;
        return paintTemplate(template);
    }
}

function paintHtmlFragment(paintableHtml: PaintableHtml, templateCache: TemplateCache): PaintableHtml {
    paintableHtml.ts = paintableHtml.ts || { postPaint: [], postPopulation: [] };
    paintableHtml.js = paintableHtml.js || { runtime: [] };
    paintableHtml.css = paintableHtml.css || { embed: [] };

    // templates
    paintableHtml.html.match(templateRegex)?.forEach(customTag => {
        const customTagName = customTag.replace('<custom-', '').replace(' />', '');
        const customTemplate = templateCache[customTagName];
        if (!customTemplate) { throw new Error(`Template not found: ${customTagName}`); }
        paintableHtml.html = paintableHtml.html.replace(customTag,
            `<painted-${customTagName}> ${customTemplate.html} </painted-${customTagName}>`
        );

        paintableHtml.ts.postPaint.push(...customTemplate.ts?.postPaint || []);
        paintableHtml.js.runtime.push(...customTemplate.js?.runtime || []);
        paintableHtml.ts.postPopulation.push(...customTemplate.ts?.postPopulation || []);
        paintableHtml.css.embed.push(...customTemplate.css?.embed || []);
    });

    // js
    paintableHtml.html = paint(paintableHtml.html, tsPostPaintRegex, '<ts-post-paint src="', '" />', paintableHtml.ts.postPaint);
    paintableHtml.html = paint(paintableHtml.html, jsRuntimeRegex, '<js-runtime src="', '" />', paintableHtml.js.runtime);
    paintableHtml.html = paint(paintableHtml.html, tsPostPopulationRegex, '<ts-post-population src="', '" />', paintableHtml.ts.postPopulation);

    // css
    paintableHtml.html = paint(paintableHtml.html, cssEmbedRegex, '<css-embed href="', '" />', paintableHtml.css.embed);

    return paintableHtml;

    function paint(html: string, regex: RegExp, replaceHead: string, replaceTail: string, includeList: string[]) {
        html.match(regex)?.forEach(match => {
            const path = match.replace(replaceHead, '').replace(replaceTail, '');
            html = html.replace(match, '');
            includeList.push(path);
        });
        return html;
    }
}

// function regexMatchAny(text: string, ...regexes: RegExp[]): RegExpMatchArray {
//     return regexes.reduce((acc: RegExpMatchArray, regex) => acc || text.match(regex), null);
// }

function paintPageHtml(paintableHtml: PaintableHtml, templateCache: TemplateCache): PaintableHtml {
    while (paintableHtml.html.match(templateRegex)) {
        paintHtmlFragment(paintableHtml, templateCache);
    }
    return paintableHtml;
}

export { compileTemplates, paintPageHtml, TemplateCache, PaintableHtml };