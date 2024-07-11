import chokidar = require('chokidar');
import fs = require('fs-extra');
import { execSync } from 'child_process';

const ignoredArray =
    fs.readFileSync('.gitignore', 'utf8')
        .split('\n')
        .filter(line => line.length > 0 && !line.startsWith('#'))
        .map(line => line.trim().replace(/^\//, ''));
const watcher = chokidar.watch('./', {
    ignored(testString) {
        return !!testString.match(/^\.[^\/]+/) || ignoredArray.some(ignoredString => !!testString.match(ignoredString));
    }, persistent: true, awaitWriteFinish: true, ignoreInitial: true
});

watcher
    .on('add', path => {
        console.log(`File ${path} has been added`);
        rebuildSite();
    })
    .on('change', path => {
        console.log(`File ${path} has been changed`);
        rebuildSite();
    })
    .on('unlink', path => {
        console.log(`File ${path} has been removed`);
        rebuildSite();
    })
    .on('error', error => { console.error('Error happened', error); });

console.log(`Watcher is watching for changes... Press Ctrl+C to stop watching.
Note that console.log() statements are hidden. Only console.error() will be shown.`);

function rebuildSite() {
    console.log('Auto rebuilding...');
    execSync('npm run dev-build');
    console.log('Auto rebuild done!');
}