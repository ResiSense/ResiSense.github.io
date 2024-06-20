console.log('build.js is running...')

const fs = require('fs-extra');
const path = require('path');

fs.writeFileSync(path.resolve('prod', 'test.txt'), 'Hello World!');