import { Page } from "./Pages";
import { PaintableHtml } from "../framework-lib/TemplatePainter";

export type PageData = {
    targetDirectory: string;
    page: Page;
    document: Document;
    paintedHtml: PaintableHtml;
    [key: string]: any;
}