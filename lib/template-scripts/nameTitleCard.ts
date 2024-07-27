import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    // 
    for (const element of document.getElementsByClassName('page-title')) {
        element.innerHTML = document.title;
    }
}