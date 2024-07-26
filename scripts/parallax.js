const parallaxElement = document.getElementById('parallax');

window.addEventListener('scroll', () => {
    const yOffset = window.scrollY;
    parallaxElement.style.translate = `0 -${yOffset}px`;
});