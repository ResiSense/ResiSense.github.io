(() => {
    {
        let e =
            document.getElementById('apple-warning') ||
            (() => {
                throw Error('Apple warning banner element not found!');
            })();
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                e.style.animationPlayState = 'running';
            }, 8e3);
        });
    }
})();
//# sourceMappingURL=apple-warning.js.map
