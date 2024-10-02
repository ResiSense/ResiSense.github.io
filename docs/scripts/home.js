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
        let n = document.getElementById('apple-warning');
        !(function () {
            let e = navigator.userAgent || navigator.vendor || window.opera;
            return !!((/iPad|iPhone|iPod/.test(e) && !window.MSStream) || /Macintosh/.test(e));
        })()
            ? (console.log('User is not on an Apple device.'),
              t.forEach(e => {
                  e.classList.remove('apple');
              }))
            : (console.warn('User is on an Apple device.'), n?.classList.add('apple'));
    }
})();
//# sourceMappingURL=home.js.map
