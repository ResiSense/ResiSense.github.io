function promisifyCallback(func: Function, ...args: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
        func(...args, (error: any) => { error ? reject(error) : resolve(); });
    });
}

function toTitleCase(string: string) {
    return string.replace(/\b\w/g, match => match.toUpperCase());
}

export default class Utils {
    static promisifyCallback = promisifyCallback;
    static toTitleCase = toTitleCase;
}