/* 
+------------------------------------------------------------------------+ 
|                       Page Builder Internal Logic                      |
+------------------------------------------------------------------------+

---------------------------------- Brief ---------------------------------

This file contains the logic for building the page based on the current URL.
GitHub Pages does not support server-side code, so this is the only way to
dynamically build pages (that I can think of quickly).
GitHub Pages automatically serves the 404.html page when a page is not found.
The page builder hijacks this feature and use it to act as a central node for
all pages. The page builder will then fetch the page config and content from
and build the page.

------------------------------ General flow -----------------------------

- User attempts to access (/foo)/bar(.html)
- GitHub Pages serves 404.html containing pageBuilder.js
- Fetch pageConfig.jsonc
- Set tab title
- Paint the common template, unless specified otherwise in pageConfig
- Get page.builder from pageConfig
-> If builder is HTML:
    - Fetch /pages(/foo)/bar.html
    - Build page from HTML
    - Replace <content>
    -> If builder is markdown:
    - Fetch /pages(/foo)/bar.md
    - Fetch marked.min.js remotely
    - Build HTML from markdown using marked.js, using plaintext markdown as fallback
    - Replace <content>

-------------------------------------------------------------------------- 
*/

const builders = Object.freeze({
    html: htmlBuilder,
    markdown: markdownBuilder,
});

window.addEventListener(eventType.templatePainted, () => { document.body.classList.remove('preload') });

var currentPathTree = undefined;
getPageConfig().then(pageConfig => {
    // console.log({ pageConfig });
    buildPage();
    // 
    function buildPage(forcedPagePath = undefined) {
        const pathTree = (forcedPagePath || urlParameters.page || window.location.pathname).split('/').filter(item => item !== '');
        console.log({ currentPathTree: pathTree });

        // determine page
        const page = getPageFromPathTree(pageConfig.pages, pathTree) || getPageFromPathTree(pageConfig.pages, ['404']);
        console.log({ page });
        currentPathTree = page.name == '404' ? ['404'] : pathTree;
        delete (pathTree);
        if (page.name == '404') {
            Object.freeze(currentPathTree);
            window.dispatchEvent(new CustomEvent(eventType.pathTreeResolved));
        }

        // set title
        document.title = page.title ? page.title : toTitleCase(page.name);

        // build page
        switch (page.builder) {
            case 'markdown':
                fetchFile(forceExtension(`/pages/${currentPathTree.join('/')}`, 'md'))
                    .then(markdown => {
                        Object.freeze(currentPathTree);
                        window.dispatchEvent(new CustomEvent(eventType.pathTreeResolved));
                        // console.log(markdown);
                        builders.markdown(markdown);
                    }).catch(() => {
                        buildPage('404');
                        return;
                    });
                return;

            case 'html':
            default:
                fetchFile(forceExtension(`/pages${currentPathTree.join('/')}`, 'html'))
                    .then(html => {
                        Object.freeze(currentPathTree);
                        window.dispatchEvent(new CustomEvent(eventType.pathTreeResolved));
                        // 
                        builders.html(html);
                    }).catch(() => {
                        buildPage('404');
                        return;
                    });
                return;
        };
    }
});

function getPageFromPathTree(pages, pathTree) {
    if (!pages) { return null };
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (page.name === pathTree[0]) {
            if (pathTree.length === 1) {
                return page;
            } else {
                return getPageFromPathTree(page.pages, pathTree.slice(1));
            }
        }
    }
    return null;
}
function forceExtension(path = window.location.pathname, extension = 'html') {
    return `${path.replace(/\..*$/, '')}.${extension}`
}

/* //! ------------------------------ HTML Builder ------------------------------ */
function htmlBuilder(html) {
    console.log('Running HTML builder...');
    templateHTMLs['custom-content'] = html;
    // 
    replaceCustomTags();
}

/* //! ---------------------------- Markdown Builder ---------------------------- */
function markdownBuilder(markdown) {
    console.log('Running markdown builder...');
    loadResource(resourceType.js, 'https://cdn.jsdelivr.net/npm/marked/marked.min.js')
        .then(() => {
            console.log('Building site from markdown file...');
            templateHTMLs['custom-content'] = parseResponse(markdown);
        }).catch(() => {
            console.log('Falling back to plaintext markdown...');
            templateHTMLs['custom-content'] = markdown.replace(/  /g, '<br>');
        }).finally(() => {
            replaceCustomTags();
        });

    window.addEventListener(eventType.templatePainted, addIdToHeadings);
}
function parseResponse(markdown) {
    console.log('Parsing markdown...');
    marked.use({ gfm: true });
    return marked.parse(markdown);
}
function addIdToHeadings() {
    console.log('Adding IDs to headings...');
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        heading.id = heading.textContent.replace(/ /g, '-');
        window.location = `#${window.location.hash.substring(1)}`;
    });
}