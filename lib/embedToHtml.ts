function embedVariable(document: Document, key: string, value: any) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.innerHTML = `const ${key} = JSON.parse(${JSON.stringify(value)}) || undefined;`;
    document.head.prepend(scriptTag);
}

function embedScript(document: Document, script: string) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.innerHTML = script;
    document.head.prepend(scriptTag);
}

function embedFunction(document: Document, func: Function) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.innerHTML = `(${func.toString()})();`;
    document.head.prepend(scriptTag);
}

export { embedVariable, embedScript, embedFunction }