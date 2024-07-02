import { Page } from "./PageConfig";
import { PaintableHtml } from "./templatePainter";

type PageData = {
    page: Page;
    document: Document;
    paintedHtml: PaintableHtml;
    [key: string]: any;
}

export { PageData };