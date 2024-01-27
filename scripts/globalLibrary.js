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