import EventType from './EventType';

export default class ResponsivenessHandler {
    static contentIsPastHeader: { old: boolean | undefined, current: boolean | undefined }
        = { old: undefined, current: undefined };
}

{
    window.addEventListener('DOMContentLoaded', determineContentIsPastHeader);
    window.addEventListener('scroll', determineContentIsPastHeader);
    function determineContentIsPastHeader() {
        const contentIsPastHeader = ResponsivenessHandler.contentIsPastHeader;
        contentIsPastHeader.current = window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (contentIsPastHeader.current === contentIsPastHeader.old) { return; }
        contentIsPastHeader.old = contentIsPastHeader.current;
        window.dispatchEvent(new CustomEvent(EventType.contentScrollPastHeader.toString()));
    }

    window.addEventListener('DOMContentLoaded', determineShowHeaderPageTitle);
    window.addEventListener('scroll', determineShowHeaderPageTitle);
    const headerPageTitleElement = document.getElementById('header-page-title')
        || (() => { throw new Error('Header page title element not found!') })();
    const headerElement = document.getElementsByTagName('header')[0];
    const mainElement = document.getElementsByTagName('main')[0];
    function determineShowHeaderPageTitle() {
        const mainRectTop = mainElement.getBoundingClientRect().top;
        const headerSpacerRectBottom = headerElement.getBoundingClientRect().bottom;
        const showHeaderPageTitle = mainRectTop <= headerSpacerRectBottom;
        headerPageTitleElement.classList.toggle('hidden', !showHeaderPageTitle);
    }
}