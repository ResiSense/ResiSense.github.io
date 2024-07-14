import chokidar = require('chokidar');
import fs = require('fs-extra');
import { ChildProcess, spawn } from 'child_process';

const ignoredArray =
    fs.readFileSync('.gitignore', 'utf8')
        .split('\n')
        .filter(line => line.length > 0 && !line.startsWith('#'))
        .map(line => line.trim().replace(/^\//, ''));
const ignored = (testString: string) => !!testString.match(/^\.[^\/]+/) || ignoredArray.some(ignoredString => !!testString.match(ignoredString));
const fastWatcher = chokidar.watch('./', {
    ignored,
    persistent: true,
    ignoreInitial: true
});
const slowWatcher = chokidar.watch('./', {
    ignored,
    persistent: true,
    awaitWriteFinish: true,
    ignoreInitial: true
});

const fastWatcherWaitingMessage = (path: string) => `${'='.repeat(80)}\nAwaiting file write: ${path}...`;
const fastWatcherEvents = ['add', 'change', 'unlink'];
fastWatcherEvents.forEach(event => fastWatcher.on(event, path => console.log(fastWatcherWaitingMessage(path))));

const slowWatcherEvents = ['add', 'change', 'unlink'];
slowWatcherEvents.forEach(event => slowWatcher.on(event, path => {
    console.log(`File ${event}: ${path}`);
    rebuildSite();
}));

console.log(`Watcher is watching for changes... Press Ctrl+C to stop watching.`);

let currentBuildProcess: ChildProcess = null;
function rebuildSite() {
    if (currentBuildProcess) {
        console.log('Killing previous build process...');
        currentBuildProcess.kill('SIGKILL');
        currentBuildProcess = null;
    }
    console.log('Auto rebuilding...');
    currentBuildProcess = spawn('npm', ['run', 'dev-build'], { stdio: 'inherit', shell: true, });
    currentBuildProcess.on('exit', () => {
        console.log('Auto rebuild done!');
        currentBuildProcess = null;
    });
}