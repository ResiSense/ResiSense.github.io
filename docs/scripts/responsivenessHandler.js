console.log(`Script running: ${document.currentScript.src}`);
//
const contentScrollPastHeader = {
    old: undefined,
    current: undefined,
};

{
    window.addEventListener('DOMContentLoaded', determineContentScrollPastHeader);
    window.addEventListener('scroll', determineContentScrollPastHeader);
    function determineContentScrollPastHeader() {
        contentScrollPastHeader.current =
            window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (contentScrollPastHeader.current === contentScrollPastHeader.old) {
            return;
        }
        contentScrollPastHeader.old = contentScrollPastHeader.current;
        window.dispatchEvent(
            new CustomEvent(eventType.contentScrollPastHeader, { detail: contentScrollPastHeader.current })
        );
    }

    window.addEventListener('DOMContentLoaded', determineShowHeaderPageTitle);
    window.addEventListener('scroll', determineShowHeaderPageTitle);
    const headerPageTitleElement = document.getElementById('header-page-title');
    const headerElement = document.getElementsByTagName('header')[0];
    const mainElement = document.getElementsByTagName('main')[0];
    function determineShowHeaderPageTitle() {
        const mainRectTop = mainElement.getBoundingClientRect().top;
        const headerSpacerRectBottom = headerElement.getBoundingClientRect().bottom;
        const showHeaderPageTitle = mainRectTop <= headerSpacerRectBottom;
        headerPageTitleElement.classList.toggle('hidden', !showHeaderPageTitle);
    }
}
