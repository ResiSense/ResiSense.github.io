(() => {
    {
        let e = document.querySelector('.footer-spacer'),
            t = document.querySelector('.footer-persistent');
        document.addEventListener('DOMContentLoaded', function () {
            let o = t.clientHeight;
            e.style.setProperty('--footer-spacer-height', `${o}px`);
        });
    }
})();
//# sourceMappingURL=footer.js.map
