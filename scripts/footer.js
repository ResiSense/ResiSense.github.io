{
    const footerSpacerElement = document.querySelector('.footer-spacer');
    const footerPersistentElement = document.querySelector('.footer-persistent');

    document.addEventListener('DOMContentLoaded', calculateFooterSpacerHeight);
    function calculateFooterSpacerHeight() {
        const footerPersistentHeight = footerPersistentElement.clientHeight;
        footerSpacerElement.style.setProperty('--footer-spacer-height', `${footerPersistentHeight}px`);
    }
}