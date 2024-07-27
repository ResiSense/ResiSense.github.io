console.log(`Script running: ${document.currentScript.src}`);
//
const titleCardElement = document.getElementsByTagName('painted-title-card')[0];
const stickerContainer = document.getElementById('sticker-container');
const trueBottom = window.scrollY + titleCardElement.getBoundingClientRect().bottom;

window.addEventListener('DOMContentLoaded', changeParallaxStickerAnimationDelay);
window.addEventListener('scroll', changeParallaxStickerAnimationDelay);
function changeParallaxStickerAnimationDelay() {
    const delay = -window.scrollY / trueBottom;
    titleCardElement.style.setProperty('--parallax-sticker-animation-delay', `${delay}s`);
}
