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
        if (path.match(/.*content(\.[a-z]+)?$/)) { reject(undefined); }
        // 
        fetch(path)
            .then(response => {
                // console.log(response);
                if (catchSilentReject && !response.ok) { reject(undefined); }
                resolve(response.text());
            }).catch(error => reject(error));
    });
}

const resourceType = Object.freeze({
    // colloquial name: HTML tag name
    script: 'script',
    stylesheet: 'style',
});
function loadResource(path, type) {
    // console.log(`Promising ${type} from ${path}...`);
    return new Promise((resolve, reject) => {
        console.log(`Fetching ${type} from ${path}...`);
        const resource = document.createElement(type);
        resource.onload = resolve;
        resource.onerror = reject;
        resource.src = path;
        document.head.appendChild(resource);
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