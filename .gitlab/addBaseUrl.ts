import * as fs from 'fs-extra';
import { glob } from 'glob';

const PROD_DIRECTORY = 'docs';
const BASE_URL = 'hongkong-cuhk';

(async () => {
    const htmlFiles = glob.sync(`${PROD_DIRECTORY}/**/*.html`);
    const cssFiles = glob.sync(`${PROD_DIRECTORY}/**/*.css`);
    await Promise.all([...htmlFiles, ...cssFiles].map(filePath => processFile(filePath)));
    console.log('Done adding base URL to all files.');
})();

async function processFile(filePath: string) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const newContent = fileContent
        .replace(/href=\"\/(.*?)\"/g, `href="/${BASE_URL}/$1"`)
        .replace(/src=\"\/(.*?)\"/g, `src="/${BASE_URL}/$1"`)
        .replace(/url\(\'\/(.*?)\'\)/g, `url('/${BASE_URL}/$1')`)
        .replace(/url\(\"\/(.*?)\"\)/g, `url("/${BASE_URL}/$1")`);
    await fs.writeFile(filePath, newContent);
    console.log(`Added base URL to ${filePath}`);
}