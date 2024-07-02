import { PageData } from "./PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    // 
    document.getElementById('content-legend').innerHTML = document.title;
}