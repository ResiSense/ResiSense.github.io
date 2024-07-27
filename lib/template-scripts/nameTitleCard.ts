import { PageData } from "../types/PageData";

export default function (pageData: PageData) {
    const document = pageData.document;
    // 
    for (const element of document.getElementsByClassName('card-title')) {
        element.innerHTML = document.title;
    }
}