import igemUploadApi, { RemoteResourceData } from 'igem-upload-api';
import * as fs from 'fs-extra';
import { glob } from 'glob';

const ARG2 = process.argv[2];
const ARG3 = process.argv[3];
const ARG4 = process.argv[4];
if (!ARG2 || !ARG3 || !ARG4) { throw new Error('Missing environment variables. Expected: [TEAM_NUMBER] [USERNAME] [PASSWORD]'); }
const TEAM_NUMBER = +ARG2;
const USERNAME = ARG3;
const PASSWORD = ARG4;
if (!Number.isSafeInteger(TEAM_NUMBER)) { throw new Error('TEAM_NUMBER must be a number. Expected: [TEAM_NUMBER] [USERNAME] [PASSWORD]'); }
const remoteDirectoryPath = ['assets'];
const localDirectoryPath = ['docs', 'assets'];

(async () => {
    const remoteResourceData: RemoteResourceData[] = await uploadAssets();
    await relinkUrls(remoteResourceData);
    await fs.remove(localDirectoryPath.join('/'));
})();

async function uploadAssets(): Promise<RemoteResourceData[]> {
    const api = new igemUploadApi(TEAM_NUMBER, USERNAME, PASSWORD);
    await api.startSession();

    await api.purgeDirectory(remoteDirectoryPath, true);
    const remoteResourceData = await api.uploadDirectory(remoteDirectoryPath, localDirectoryPath);

    await api.endSession();
    return remoteResourceData;
}

async function relinkUrls(remoteResourceData: RemoteResourceData[]) {
    const htmlRegex = /(?<=(href|src)=")\/.*?(?=")/g;
    const cssRegex1 = /(?<=url\(')\/.*?(?='\))/g;
    const cssRegex2 = /(?<=url\(")\/.*?(?="\))/g;
    // 
    const PROD_DIRECTORY = localDirectoryPath[0];
    const BASE_URL = 'hongkong-cuhk';
    const htmlFiles = glob.sync(`${PROD_DIRECTORY}/**/*.html`);
    const cssFiles = glob.sync(`${PROD_DIRECTORY}/**/*.css`);
    await Promise.all([
        ...htmlFiles.map(filePath => relinkFileUrls(filePath, [htmlRegex])),
        ...cssFiles.map(filePath => relinkFileUrls(filePath, [cssRegex1, cssRegex2]))
    ]);
    // 
    async function relinkFileUrls(filePath: string, regexes: RegExp[]) {
        console.log(`Processing ${filePath}`);
        let fileContent = await fs.readFile(filePath, 'utf8');
        for (const regex of regexes) {
            fileContent = fileContent.replace(regex, match => {
                // match = match.replace(/\\/g, '');
                match = decodeURIComponent(match);
                const remoteResource = remoteResourceData.find(resource => resource.localFilePath === `${PROD_DIRECTORY}${match}`);
                const relinkedUrl = remoteResource?.isSuccessful ? remoteResource.url : `/${BASE_URL}${match}`;
                console.log(`Replaced ${match} --> ${relinkedUrl}`);
                return relinkedUrl;
            });
        }
        await fs.writeFile(filePath, fileContent);
    }
}