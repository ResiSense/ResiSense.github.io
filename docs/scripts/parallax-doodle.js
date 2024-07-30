console.log(`Script running: ${document.currentScript.src}`);
//
{
    const parallaxDoodleContainer = document.getElementById('parallax-doodle-container');

    window.addEventListener('scroll', scrollParallaxDoodleContainer);
    function scrollParallaxDoodleContainer() {
        const yOffset = window.scrollY;
        parallaxDoodleContainer.style.translate = `0 -${yOffset}px`;
    }
}
