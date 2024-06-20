console.log('build.js is running...')

const fs = require('fs-extra');

fs.writeFileSync('./prod/test.txt', 'Hello World!');