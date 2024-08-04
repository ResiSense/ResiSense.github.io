(() => {
    {
        let e =
                document.getElementsByTagName('painted-hamburger-menu')[0] ||
                (() => {
                    throw Error('Painted hamburger menu element not found!');
                })(),
            t =
                document.getElementById('hamburger-button') ||
                (() => {
                    throw Error('Hamburger button element not found!');
                })(),
            n =
                document.getElementById('hamburger-menu') ||
                (() => {
                    throw Error('Hamburger menu element not found!');
                })();
        t.addEventListener('click', () => {
            n.toggleAttribute('open'), n.focus();
        }),
            e.addEventListener('focusout', t => {
                e.contains(t.relatedTarget) || n.toggleAttribute('open', !1);
            });
    }
})();
//# sourceMappingURL=hamburger-menu.js.map
