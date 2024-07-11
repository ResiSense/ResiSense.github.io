import fs = require('fs-extra');
import path = require('path');

function promisifyCallback(func: Function, ...args: any[]): Promise<void> {
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

export default class Utils {
    static promisifyCallback = promisifyCallback;
    static toTitleCase = toTitleCase;
    static writeFileSyncWithMakeDirectory = writeFileSyncWithMakeDirectory;
}