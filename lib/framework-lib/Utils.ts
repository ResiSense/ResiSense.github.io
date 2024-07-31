import fs = require('fs-extra');
import path = require('path');

function promisifyCallback<T extends (...args: any[]) => void>(func: T, ...args: Parameters<T> extends [...infer P, any] ? P : Parameters<T>): Promise<void> {
    return new Promise((resolve, reject) => {
        func(...args, (error: any) => { error ? reject(error) : resolve(); });
    });
}

function toTitleCase(string: string) {
    return string.replace(/\b\w/g, match => match.toUpperCase());
}

function writeFileSyncWithMakeDirectory(filePath: string, data: string) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, data, 'utf8');
}

function stripHtmlComments(html: string) {
    return html.replace(/<!--[\s\S]*?-->/g, '');
}

export default class Utils {
    static promisifyCallback = promisifyCallback;
    static toTitleCase = toTitleCase;
    static writeFileSyncWithMakeDirectory = writeFileSyncWithMakeDirectory;
    static stripHtmlComments = stripHtmlComments;
}