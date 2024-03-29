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
var templatePainterPromises = [];
window.addEventListener('load', () => {
    replaceCustomTags().then(() => {
        console.log('All templates loaded!');
        window.dispatchEvent(new CustomEvent(eventType.templatePainted));
    });
});

function replaceCustomTags(element = document.body, depth = 0) {
    console.log(`Replacing custom tags in ${element.tagName}...`);
    if (depth > 10) { throw new Error('Too many nested custom tags!') };
    // 
    const tags = new Set(element.innerHTML.match(/<custom-[a-zA-Z0-9][a-zA-Z0-9-]+>/g));
    // console.log(tags);

    const promises = Array.from(tags).map(tagName => {
        tagName = tagName.replace(/<|>/g, '');
        const elements = element.getElementsByTagName(tagName);
        // console.log({ elements });

        var useableTemplateHTML = undefined;
        if (templateHTMLs[tagName] !== undefined) {
            useableTemplateHTML = templateHTMLs[tagName];
            return insertTemplateHTML();
        } else {
            const promise = fetchFile(`/templates/${tagName.replace('custom-', '')}.html`)
                .then(templateHTML => {
                    useableTemplateHTML = templateHTML;
                    templateHTMLs[tagName] = templateHTML;
                    return insertTemplateHTML();
                }).catch(() => {
                    useableTemplateHTML = undefined;
                    templateHTMLs[tagName] = undefined;
                }).finally(() => {
                    // insertTemplateHTML();
                });
            templatePainterPromises.push(promise);
            return promise;
        }

        //
        function insertTemplateHTML() {
            return Promise.all(Array.from(elements).map(element => {
                // console.log(element);
                const processedElement = markAsProcessed(element);
                if (useableTemplateHTML) {
                    processedElement.innerHTML = useableTemplateHTML;
                    return replaceCustomTags(processedElement, depth + 1);
                }
            }));
        }
        function markAsProcessed(element) {
            const processedElement = document.createElement(`processed-${element.tagName}`);
            element.parentNode.replaceChild(processedElement, element);
            element.remove();
            return processedElement;
        }
    });

    Array.from(element.getElementsByTagName('custom-js')).forEach(element => {
        promises.push(loadResource(resourceType.js, element.getAttribute('src')));
        element.remove();
    });
    Array.from(element.getElementsByTagName('custom-css')).forEach(element => {
        promises.push(loadResource(resourceType.css, element.getAttribute('href')));
        element.remove();
    });

    return Promise.all(promises);
}