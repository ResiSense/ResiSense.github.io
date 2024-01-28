/* 
+------------------------------------------------------------------------+ 
|                            Template Painter                            |
+------------------------------------------------------------------------+

---------------------------------- Brief ---------------------------------

This file contains the logic for building the page based on the current URL.
Templates are grabbed from /templates/. and are painted onto the page, starting
from template.html, then recursively finding <custom-foo /> tags and replacing
them with the contents of /templates/foo.html.
paintTemplate event can be fired to trigger tag replacement.

Yes I am basically reinventing React. No I don't care because this is fun.

-------------------------------------------------------------------------- 
*/

const templateHTMLs = {};
window.addEventListener('load', () => replaceCustomTags());

function replaceCustomTags(element = document.body, depth = 0) {
    console.log(`Replacing custom tags in ${element.tagName}...`);
    if (depth > 10) { throw new Error('Too many nested custom tags!') };
    // 
    const tags = new Set(element.innerHTML.match(/<custom-[a-zA-Z0-9][a-zA-Z0-9-]+>/g));
    // console.log(tags);

    tags.forEach(tagName => {
        tagName = tagName.replace(/<|>/g, '');
        const elements = element.getElementsByTagName(tagName);

        // console.log({ elements });
        var useableTemplateHTML = undefined;
        if (templateHTMLs[tagName] !== undefined) {
            useableTemplateHTML = templateHTMLs[tagName];
            insertTemplateHTML();
            return;
        } else {
            fetchFile(`/templates/${tagName.replace('custom-', '')}.html`, true)
                .then(templateHTML => {
                    useableTemplateHTML = templateHTML;
                    templateHTMLs[tagName] = templateHTML;
                    insertTemplateHTML();
                }).catch(() => {
                    useableTemplateHTML = undefined;
                    templateHTMLs[tagName] = undefined;
                }).finally(() => {
                    // insertTemplateHTML();
                });
        }

        //
        function insertTemplateHTML() {
            Array.from(elements).forEach(element => {
                // console.log(element);
                const processedElement = markAsProcessed(element);
                if (useableTemplateHTML) {
                    processedElement.innerHTML = useableTemplateHTML;
                    replaceCustomTags(processedElement, depth + 1);
                }
            });
        }
        function markAsProcessed(element) {
            const processedElement = document.createElement(`processed-${element.tagName}`);
            element.parentNode.replaceChild(processedElement, element);
            element.remove();
            return processedElement;
        }
    });

    Array.from(element.getElementsByTagName('custom-js')).forEach(element => {
        loadResource(element.getAttribute('src'), resourceType.js);
        element.remove();
    });
    Array.from(element.getElementsByTagName('custom-css')).forEach(element => {
        loadResource(element.getAttribute('href'), resourceType.css);
        element.remove();
    });
    return;
}


