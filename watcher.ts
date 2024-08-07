import chokidar = require('chokidar');
import fs = require('fs-extra');
import { ChildProcess, spawn } from 'child_process';
import ignore from 'ignore';
import path = require('path');

const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
const ig = ignore().add(gitignoreContent);
const ignored = (testString: string) => {
    if (testString.match(/^\.[^\/]+/)) { return true; }
    const relativePath = path.relative(process.cwd(), testString);
    if (!relativePath) { return false; }
    return ig.ignores(relativePath);
};

const watcher = chokidar.watch('./', {
    ignored,
    persistent: true,
    ignoreInitial: true
});

const slowWatcherEvents = ['add', 'change', 'unlink'];
slowWatcherEvents.forEach(event => watcher.on(event, path => {
    console.log(`File ${event}: ${path}`);
    if (path.endsWith('.css')) {
        fs.copyFileSync(path, `test/${path}`);
    } else {
        rebuildSite();
    }
}));

console.log(`Watcher is watching for changes... Press Ctrl+C to stop watching.`);

let currentBuildProcess: ChildProcess | null = null;
function rebuildSite() {
    if (currentBuildProcess) {
        console.log('Killing previous build process...');
        currentBuildProcess.kill('SIGKILL');
        currentBuildProcess = null;
    }
    console.log('Auto rebuilding...');
    currentBuildProcess = spawn('npm', ['run', '_watch-do'], { stdio: 'inherit', shell: true, });
    currentBuildProcess.on('exit', () => {
        console.log('Auto rebuild done!');
        currentBuildProcess = null;
    });
}