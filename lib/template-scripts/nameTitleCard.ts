import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    // 
    document.getElementById('title-name').innerHTML = document.title;
}