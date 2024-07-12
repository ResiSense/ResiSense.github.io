import * as fs from 'fs-extra';
import { glob } from 'glob';

const PROD_DIRECTORY = 'docs';
const BASE_URL = 'hongkong-cuhk';

(async () => {
    const files = glob.sync(`${PROD_DIRECTORY}/**/*.html`);

    await Promise.all(files.map(filePath => processFile(filePath)));
    console.log('Done adding base URL to all HTML files.');
})();

async function processFile(filePath: string) {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const newContent = fileContent.replace(/href="\//g, `href="/${BASE_URL}/`).replace(/src="\//g, `src="/${BASE_URL}/`);
    await fs.writeFile(filePath, newContent);
    console.log(`Added base URL to ${filePath}`);
}