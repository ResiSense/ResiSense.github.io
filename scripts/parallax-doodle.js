const parallaxDoodleContainer = document.getElementById('parallax-doodle-container');

window.addEventListener('scroll', () => {
    const yOffset = window.scrollY;
    parallaxDoodleContainer.style.translate = `0 -${yOffset}px`;
});