console.log('build.js is running...')

const fs = require('fs-extra');
const path = require('path');

fs.writeFileSync(path.resolve(__dirname, 'build.txt'), 'Hello, build.txt!');