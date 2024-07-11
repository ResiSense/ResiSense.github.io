import type { Page } from "./Pages";
import type { PaintableHtml } from "../framework-lib/TemplatePainter";

export type PageData = {
    page: Page;
    document: Document;
    paintedHtml: PaintableHtml;
    [key: string]: any;
}