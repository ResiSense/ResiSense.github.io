(() => {
    {
        let t =
            document.querySelectorAll('.slide') ||
            (() => {
                throw Error('No slide elements found');
            })();
        function e() {
            t.forEach(e => {
                let t = (parseFloat(e.computedStyleMap().get('font-weight')?.toString() ?? '100') - 100) / 9;
                e.style.setProperty('--animation-delay', `${-t}s`);
            });
        }
        document.addEventListener('DOMContentLoaded', e),
            document.addEventListener('resize', e),
            document.addEventListener('orientationchange', e),
            document.addEventListener('scroll', e),
            document.addEventListener('load', e);
    }
})();
//# sourceMappingURL=home.js.map
