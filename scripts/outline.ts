import { convertToPixels } from "./globalLibrary";

{
    if (window.location.pathname.split('/').includes('404')) {
        const outlineElement = document.querySelector('painted-outline') as HTMLElement;
        outlineElement.style.visibility = 'hidden';
    }

    const HEADING_TOLERANCE_PX = 1;

    const outlineProgressPointerElement = document.getElementById('outline-progress-pointer');
    const contentHeadingElements = document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3');
    window.addEventListener('DOMContentLoaded', calculateProgressOutlineElementPosition);
    window.addEventListener('scroll', calculateProgressOutlineElementPosition);
    function calculateProgressOutlineElementPosition() {
        if (!contentHeadingElements) { return; }
        if (!outlineProgressPointerElement) { return; }
        const latestHeading =
            [...contentHeadingElements].reverse()
                .find(heading => {
                    const headingTop = heading.getBoundingClientRect().top;
                    const headingTopMin = convertToPixels(heading, getComputedStyle(heading).getPropertyValue('--this-top'));
                    const isLatestHeading = headingTop <= headingTopMin + HEADING_TOLERANCE_PX;
                    return isLatestHeading;
                }) || contentHeadingElements[0];
        const currentProgressOutlineElement = document.getElementById(`--outline-${latestHeading.id}`) as HTMLElement;
        const firstProgressOutlineElement = document.getElementById(`--outline-${contentHeadingElements[0].id}`) as HTMLElement;
        outlineProgressPointerElement.style.top = `${currentProgressOutlineElement.getBoundingClientRect().top - firstProgressOutlineElement.getBoundingClientRect().top}px`;
        outlineProgressPointerElement.style.left = `${2 + currentProgressOutlineElement.getBoundingClientRect().left - firstProgressOutlineElement.getBoundingClientRect().left}px`;
    }
}