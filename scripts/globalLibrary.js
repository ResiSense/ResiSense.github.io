/* -------------------------------------------------------------------------- */
/*                                  Fetching                                  */
/* -------------------------------------------------------------------------- */

function getPageConfig() {
    return fetchConfig('/meta/pageConfig.jsonc');
}

function fetchConfig(path) {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(response => response.text())
            .then(data => {
                resolve(JSON.parse(
                    //? Strip raw JSON text of comments
                    data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
                ));
            });
    });
}

function fetchFile(path, catchSilentReject = false) {
    return new Promise((resolve, reject) => {
        // technically unnecessary, but it's a good idea to prevent erroneous content templates
        if (path.match(/.*content(\.[a-z]+)?$/)) {
            reject(undefined);
            return;
        }
        // 
        fetch(path)
            .then(response => {
                // console.log(response);
                if (catchSilentReject && !response.ok) {
                    console.log(`Fetching ${type} from ${path} failed!`);
                    reject(undefined);
                    return;
                }
                console.log(`Fetching ${type} from ${path} succeeded`);
                resolve(response.text());
            }).catch(error => {
                console.log(`Fetching ${type} from ${path} failed!`);
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
function loadResource(path, type) {
    // console.log(`Promising ${type} from ${path}...`);
    return new Promise((resolve, reject) => {
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
                reject(`Unknown resource type: ${type}`);
                return;
        }
    });
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