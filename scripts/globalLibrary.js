const eventType = Object.freeze({
    pathTreeResolved: 'pathTreeResolved',
    templatePainted: 'templatePainted',
    catalogueBuilt: 'catalogueBuilt',
    contentHeadingElementsIdentified: 'contentHeadingElementsIdentified',
    // 
    contentScrollPastHeader: 'contentScrollPastHeader',
});
Object.keys(eventType).forEach(key => {
    window.addEventListener(eventType[key], () => { console.warn(`Event: ${eventType[key]}`) });
});

/* -------------------------------------------------------------------------- */
/*                                  Fetching                                  */
/* -------------------------------------------------------------------------- */

var pageConfig = undefined;
function getPageConfig() {
    return pageConfig
        ? Promise.resolve(pageConfig)
        : fetchConfig('/meta/pageConfig.jsonc');
}

function fetchConfig(path) {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                const uncommentedData = JSON.parse(
                    //? Strip raw JSON text of comments
                    data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
                )
                pageConfig = uncommentedData;
                Object.freeze(pageConfig);
                resolve(uncommentedData);
                return;
            });
    });
}

function fetchFile(path) {
    return new Promise((resolve, reject) => {
        // technically unnecessary, but it's a good idea to prevent erroneous content templates
        if (path.match(/.*content(\.[a-z]+)?$/)) {
            reject(undefined);
            return;
        }
        // 
        console.log(`Fetching from ${path}...`);
        fetch(path)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    console.log(`Fetching from ${path} failed!`);
                    reject(undefined);
                    return;
                }
                console.log(`Fetching from ${path} succeeded`);
                resolve(response.text());
                return;
            }).catch(error => {
                console.log(`Fetching from ${path} failed!`);
                reject(error);
                return;
            });
    });
}

const resourceType = Object.freeze({
    // colloquial/extension name: HTML tag name
    js: 'script',
    css: 'link',
});
function loadResource(type, ...paths) {
    console.log(`Promising ${type} from ${paths.join(', ')}...`);
    let promises = [];
    paths.forEach(path => {
        promises.push(
            new Promise((resolve, reject) => {
                console.log(`Fetching ${type} from ${path}...`);
                const resource = document.createElement(type);
                document.head.appendChild(resource);
                resource.onload = resolve;
                resource.onerror = reject;

                switch (type) {
                    case resourceType.js:
                        resource.src = path;
                        break;
                    case resourceType.css:
                        resource.rel = 'stylesheet';
                        resource.href = path;
                        break;
                    default:
                        reject(`Unknown resource type: ${type} `);
                        return;
                }
            })
        );
    });
    return Promise.all(promises);
}

/* -------------------------------------------------------------------------- */

function toTitleCase(string) {
    return string.replace(/\b\w/g, match => match.toUpperCase());
}

function waitForVariable(variableName, timeLimit = 1000) {
    return (async () => {
        console.log(`Waiting for ${variableName}...`);
        const startTime = Date.now();
        while (!window.hasOwnProperty(variableName)) {
            await new Promise(resolve => setTimeout(resolve, 250));
            if (Date.now() - startTime > timeLimit) {
                console.log(`${variableName} took too long to exist!`);
                reject();
                return;
            }
        }
        console.log(`${variableName} exists`);
    })();
}

function waitForRender(element) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            if (document.contains(element)) {
                observer.disconnect();
                resolve();
            }
        })
        observer.observe(element, { attributes: true });
    });
}

const urlParameters = getUrlParameters();
function getUrlParameters() {
    if (!window.location.search) return {};
    const parameters = {};
    const keyValues = window.location.search.replace('?', '').split('&');
    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        parameters[key] = value;
    });
    return parameters;
}