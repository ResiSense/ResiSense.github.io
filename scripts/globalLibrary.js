const eventType = Object.freeze({
    contentScrollPastHeader: 'contentScrollPastHeader',
});
Object.keys(eventType).forEach(key => {
    window.addEventListener(eventType[key], () => { console.warn(`Event: ${eventType[key]}`) });
});
// 
function waitForRender(element) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver(() => {
            if (document.contains(element)) {
                observer.disconnect();
                resolve();
            }
        })
        observer.observe(element, { attributes: true });
    });
}