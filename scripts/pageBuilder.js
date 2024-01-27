loadResource('/loadResourceTest.js', 'script');
// 
const currentPathTree = window.location.pathname.split('/').filter(item => item !== '');
console.log({ currentPathTree });

const builders = {
    html: htmlBuilder,
    markdown: markdownBuilder,
}

getPageConfig().then(pageConfig => {
    // console.log({ pageConfig });

    const notFoundPage = fetchPage(pageConfig.pages, ['404']);
    const page = fetchPage(pageConfig.pages, currentPathTree) || notFoundPage;
    console.log({ page });

    // set title
    document.title = page.title ? page.title : toTitleCase(page.name);

    // build page
    switch (page.builder) {
        case 'markdown':
            fetchFile(forceExtension(`/pages${window.location.pathname}`, 'md'))
                .then(markdown => {
                    // console.log(markdown);
                    builders.markdown(markdown);
                });
            break;

        case 'html':
        default:
            fetchFile(forceExtension(`/pages${window.location.pathname}`, 'html'))
                .then(html => {
                    builders.html(html);
                });
            break;
    }
});
function fetchPage(pages, pathTree) {
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (page.name === pathTree[0]) {
            if (pathTree.length === 1) {
                return page;
            } else {
                return fetchPage(page.pages, pathTree.slice(1));
            }
        }
    }
}
function forceExtension(path = window.location.pathname, extension = 'html') {
    return `${path.replace(/\..*$/, '')}.${extension}`
}

/* //! ------------------------------ HTML Builder ------------------------------ */
function htmlBuilder(html) {
    document.body.innerHTML = html;
}

/* //! ---------------------------- Markdown Builder ---------------------------- */
function markdownBuilder(markdown) {
    //% FIXME: dynamically loading scripts doesn't work
    // loadResource('https://cdn.jsdelivr.net/npm/marked/marked.min.js', 'script')
    //     .then(() => {
    //         console.log('Building site from markdown file...')
    //         document.body.innerHTML = parseResponse(markdown);
    //     }).catch(() => {
    //         console.log('Falling back to plaintext markdown...')
    //         document.body.innerHTML = markdown.replace(/  /g, '<br>');
    //     });

    waitForVariable('marked')
        .then(() => {
            console.log('Building site from markdown file...')
            document.body.innerHTML = parseResponse(markdown);
        }).catch(() => {
            console.log('Falling back to plaintext markdown...')
            document.body.innerHTML = markdown.replace(/  /g, '<br>');
        });
}
function parseResponse(markdown) {
    console.log('Parsing markdown...');

    marked.use({
        headerIds: true,
        smartypants: true
    });
    let result = marked.parse(markdown);

    // console.log(result);
    return result;
}