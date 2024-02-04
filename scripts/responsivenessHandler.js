const contentScrollPastHeader = {
    old: undefined,
    current: undefined,
}
window.addEventListener("scroll", () => {
    //$ shouldHideCatalogue
    contentScrollPastHeader.current = window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (contentScrollPastHeader.current === contentScrollPastHeader.old) { return; }
    contentScrollPastHeader.old = contentScrollPastHeader.current;
    window.dispatchEvent(new CustomEvent(eventType.contentScrollPastHeader, { detail: contentScrollPastHeader.current }));
});