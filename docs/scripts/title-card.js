(() => {
    {
        let t = document.getElementsByTagName('painted-title-card')[0],
            n = window.scrollY + t.getBoundingClientRect().bottom;
        function e() {
            let e = -window.scrollY / n;
            e >= 1.1 || t.style.setProperty('--parallax-sticker-animation-delay', `${e}s`);
        }
        window.addEventListener('DOMContentLoaded', e), window.addEventListener('scroll', e);
    }
})();
//# sourceMappingURL=title-card.js.map
