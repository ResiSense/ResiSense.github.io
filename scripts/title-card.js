{
    const titleCardElement = document.getElementsByTagName('painted-title-card')[0];
    const trueBottom = window.scrollY + titleCardElement.getBoundingClientRect().bottom;

    window.addEventListener('DOMContentLoaded', changeParallaxStickerAnimationDelay);
    window.addEventListener('scroll', changeParallaxStickerAnimationDelay);
    function changeParallaxStickerAnimationDelay() {
        const delay = -window.scrollY / trueBottom;
        if (delay >= 1.1) { return; }
        titleCardElement.style.setProperty('--parallax-sticker-animation-delay', `${delay}s`);
    }
}