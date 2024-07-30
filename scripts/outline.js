{
    if (window.location.pathname.split('/').includes('404')) {
        const outlineElement = document.querySelector('painted-outline');
        outlineElement.style.visibility = 'hidden';
    }

    const outlineProgressPointerElement = document.getElementById('outline-progress-pointer');
    const contentHeadingElements = document.querySelector('painted-content').querySelectorAll('h1, h2, h3, h4, h5, h6')
    window.addEventListener('DOMContentLoaded', calculateProgressOutlineElementPosition);
    window.addEventListener('scroll', calculateProgressOutlineElementPosition);
    function calculateProgressOutlineElementPosition() {
        const latestHeading =
            [...contentHeadingElements].reverse()
                .find(heading => heading.getBoundingClientRect().top < 180) || contentHeadingElements[0];
        const currentProgressOutlineElement = document.getElementById(`--outline-${latestHeading.id}`);
        const firstProgressOutlineElement = document.getElementById(`--outline-${contentHeadingElements[0].id}`);
        outlineProgressPointerElement.style.top = `${currentProgressOutlineElement.getBoundingClientRect().top - firstProgressOutlineElement.getBoundingClientRect().top}px`;
        outlineProgressPointerElement.style.left = `${2 + currentProgressOutlineElement.getBoundingClientRect().left - firstProgressOutlineElement.getBoundingClientRect().left}px`;
    }
}