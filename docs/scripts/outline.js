(() => {
    var e = globalThis,
        t = {},
        n = {},
        i = e.parcelRequire8bfa;
    null == i &&
        (((i = function (e) {
            if (e in t) return t[e].exports;
            if (e in n) {
                var i = n[e];
                delete n[e];
                var o = { id: e, exports: {} };
                return (t[e] = o), i.call(o.exports, o, o.exports), o.exports;
            }
            var l = Error("Cannot find module '" + e + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }).register = function (e, t) {
            n[e] = t;
        }),
        (e.parcelRequire8bfa = i)),
        (0, i.register)('df1N6', function (e, t) {
            function n(e, t) {
                let n = document.createElement('div');
                (n.style.position = 'absolute'),
                    (n.style.visibility = 'hidden'),
                    (n.style.height = t),
                    e.appendChild(n);
                let i = window.getComputedStyle(n).height;
                return e.removeChild(n), parseFloat(i);
            }
            Object.defineProperty(e.exports, 'convertToPixels', {
                get: () => n,
                set: void 0,
                enumerable: !0,
                configurable: !0,
            }),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100);
        });
    var o = i('df1N6');
    {
        window.location.pathname.split('/').includes('404') &&
            (document.querySelector('painted-outline').style.visibility = 'hidden');
        let e = document.getElementById('outline-progress-pointer'),
            t = document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        function l() {
            if (!t || !e) return;
            let n =
                    [...t]
                        .reverse()
                        .find(
                            e =>
                                e.getBoundingClientRect().top <=
                                (0, o.convertToPixels)(e, getComputedStyle(e).getPropertyValue('--this-top')) + 1
                        ) || t[0],
                i = document.getElementById(`--outline-${n.id}`),
                l = document.getElementById(`--outline-${t[0].id}`);
            (e.style.top = `${i.getBoundingClientRect().top - l.getBoundingClientRect().top}px`),
                (e.style.left = `${2 + i.getBoundingClientRect().left - l.getBoundingClientRect().left}px`);
        }
        window.addEventListener('DOMContentLoaded', l), window.addEventListener('scroll', l);
    }
})();
//# sourceMappingURL=outline.js.map
