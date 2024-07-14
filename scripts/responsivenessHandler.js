const contentScrollPastHeader = {
    old: undefined,
    current: undefined,
}

window.addEventListener('DOMContentLoaded', determineContentScrollPastHeader);
window.addEventListener("scroll", determineContentScrollPastHeader);
function determineContentScrollPastHeader() {
    contentScrollPastHeader.current = window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (contentScrollPastHeader.current === contentScrollPastHeader.old) { return; }
    contentScrollPastHeader.old = contentScrollPastHeader.current;
    window.dispatchEvent(new CustomEvent(eventType.contentScrollPastHeader, { detail: contentScrollPastHeader.current }));
}