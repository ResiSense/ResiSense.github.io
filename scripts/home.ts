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

    function isAppleDevice() {
        // @ts-ignore
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // @ts-ignore
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return true;
        }
        if (/Macintosh/.test(userAgent)) {
            return true;
        }
        return false;
    }
    const warning = document.getElementById('apple-warning');
    if (isAppleDevice()) {
        console.warn("User is on an Apple device.");
        warning?.classList.add('apple');
    } else {
        console.log("User is not on an Apple device.");
        slideElements.forEach(s => {
            const slide = s as HTMLDivElement;
            slide.classList.remove('apple');
        });
    }
}