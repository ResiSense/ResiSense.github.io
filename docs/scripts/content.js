(() => {
    {
        let t = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            o = document.getElementsByTagName('painted-content')[0],
            n = o.querySelectorAll(t.join(', ')),
            l = {};
        function e() {
            for (let e of n) {
                let t = e.tagName.toLowerCase(),
                    o = e.getBoundingClientRect().top,
                    n = l[t] ?? 0,
                    d = o <= n;
                if ((e.classList.toggle('sticky', o <= n), !d)) break;
            }
        }
        t.forEach(e => {
            let t = o.getElementsByTagName(e)[0];
            t &&
                (l[e] = (function (e) {
                    let t = document.createElement('div');
                    (t.style.position = 'absolute'),
                        (t.style.visibility = 'hidden'),
                        (t.style.height = e),
                        document.body.appendChild(t);
                    let o = window.getComputedStyle(t).height;
                    return document.body.removeChild(t), parseFloat(o);
                })(getComputedStyle(t).getPropertyValue('--this-top')));
        }),
            document.addEventListener('DOMContentLoaded', e),
            document.addEventListener('scroll', e);
    }
})();
//# sourceMappingURL=content.js.map
