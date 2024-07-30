{
    window.addEventListener('DOMContentLoaded', setParallaxDoodleContainerHeight);
    function setParallaxDoodleContainerHeight() {
        const parallaxDoodleContainer = document.getElementById('parallax-doodle-container');
        parallaxDoodleContainer.style.height = `${document.body.clientHeight}px`;
    }
}