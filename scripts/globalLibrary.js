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

function fetchFile(path) {
    return new Promise((resolve, reject) => {
        fetch(path).then(response => resolve(response.text()))
    });
}

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

function loadResource(path, type) {
    console.log(`Promising ${type} from ${path}...`);
    return new Promise((resolve, reject) => {
        console.log(`Fetching ${type} from ${path}...`);
        const resource = document.createElement(type);
        resource.onload = resolve;
        resource.onerror = reject;
        resource.src = path;
        document.head.appendChild(resource);
    });
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