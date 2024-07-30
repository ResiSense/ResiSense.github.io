console.log(`Script running: ${document.currentScript.src}`);
//
{
    window.addEventListener('DOMContentLoaded', setParallaxDoodleContainerHeight);
    function setParallaxDoodleContainerHeight() {
        const parallaxDoodleContainer = document.getElementById('parallax-doodle-container');
        parallaxDoodleContainer.style.height = `${document.body.clientHeight}px`;
    }
}
