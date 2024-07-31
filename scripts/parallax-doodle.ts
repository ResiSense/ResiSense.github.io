{
    window.addEventListener('DOMContentLoaded', setParallaxDoodleContainerHeight);
    function setParallaxDoodleContainerHeight() {
        const parallaxDoodleContainer = document.getElementById('parallax-doodle-container') as HTMLElement;
        parallaxDoodleContainer.style.height = `${document.body.clientHeight}px`;
    }
}