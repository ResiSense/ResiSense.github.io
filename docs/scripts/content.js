(() => {
    var e = globalThis,
        t = {},
        o = {},
        r = e.parcelRequire8bfa;
    null == r &&
        (((r = function (e) {
            if (e in t) return t[e].exports;
            if (e in o) {
                var r = o[e];
                delete o[e];
                var n = { id: e, exports: {} };
                return (t[e] = n), r.call(n.exports, n, n.exports), n.exports;
            }
            var l = Error("Cannot find module '" + e + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (e.parcelRequire8bfa = r)),
        (0, r.register)('df1N6', function (e, t) {
            function o(e, t) {
                let o = document.createElement('div');
                (o.style.position = 'absolute'),
                    (o.style.visibility = 'hidden'),
                    (o.style.height = t),
                    e.appendChild(o);
                let r = window.getComputedStyle(o).height;
                return e.removeChild(o), parseFloat(r);
            }
            Object.defineProperty(e.exports, 'convertToPixels', {
                get: () => o,
                set: void 0,
                enumerable: !0,
                configurable: !0,
            }),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100);
        });
    var n = r('df1N6');
    {
        let e = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            t = document.getElementsByTagName('painted-content')[0],
            o = t.querySelectorAll(e.join(', ')),
            r = {};
        function l() {
            for (let e of o) e.classList.toggle('sticky', !1);
            for (let e of o) {
                let t = e.tagName.toLowerCase(),
                    o = e.getBoundingClientRect().top <= (r[t] ?? 0);
                if ((e.classList.toggle('sticky', o), !o)) break;
            }
        }
        function i() {
            (
                document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6') ||
                (() => {
                    throw Error('Heading elements not found!');
                })()
            ).forEach(e => {
                t.querySelector(`.scroll-marker[id="${e.id}"]`).style.scrollMarginTop =
                    getComputedStyle(e).scrollMarginTop;
            });
        }
        e.forEach(e => {
            let o = t.getElementsByTagName(e)[0];
            o && (r[e] = (0, n.convertToPixels)(o, getComputedStyle(o).getPropertyValue('--this-top')) + 1);
        }),
            document.addEventListener('DOMContentLoaded', l),
            document.addEventListener('scroll', l),
            document.addEventListener('DOMContentLoaded', i),
            document.addEventListener('resize', i);
    }
})();
//# sourceMappingURL=content.js.map
