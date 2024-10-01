{
    const slideElements = document.querySelectorAll('.slide')
        || (() => { throw new Error('No slide elements found') })();

    document.addEventListener('DOMContentLoaded', updateSlides);
    document.addEventListener('resize', updateSlides);
    document.addEventListener('orientationchange', updateSlides);
    document.addEventListener('scroll', updateSlides);
    document.addEventListener('load', updateSlides);
    function updateSlides() {
        slideElements.forEach(s => {
            const slide = s as HTMLDivElement;
            const progress = (parseFloat(slide.computedStyleMap().get('font-weight')?.toString() ?? '100') - 100) / 9;
            slide.style.setProperty('--animation-delay', `${-progress}s`);
        });
    }
}