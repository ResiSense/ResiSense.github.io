(() => {
    function e(e, t, o, n) {
        Object.defineProperty(e, t, { get: o, set: n, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        o = {},
        n = {},
        r = t.parcelRequire8bfa;
    null == r &&
        (((r = function (e) {
            if (e in o) return o[e].exports;
            if (e in n) {
                var t = n[e];
                delete n[e];
                var r = { id: e, exports: {} };
                return (o[e] = r), t.call(r.exports, r, r.exports), r.exports;
            }
            var l = Error("Cannot find module '" + e + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }).register = function (e, t) {
            n[e] = t;
        }),
        (t.parcelRequire8bfa = r)),
        (0, r.register)('df1N6', function (t, o) {
            function n(e) {
                return encodeURIComponent(e)
                    .replace(/[-]/g, '%2D')
                    .replace(/[.]/g, '%2E')
                    .replace(/[_]/g, '%5F')
                    .replace(/[~]/g, '%7E')
                    .replace(/[*]/g, '%2A')
                    .replace(/['']/g, '%27')
                    .replace(/[(]/g, '%28')
                    .replace(/[)]/g, '%29')
                    .replace(/[,]/g, '%2C');
            }
            function r(e, t) {
                let o = document.createElement('div');
                (o.style.position = 'absolute'),
                    (o.style.visibility = 'hidden'),
                    (o.style.height = t),
                    e.appendChild(o);
                let n = window.getComputedStyle(o).height;
                return e.removeChild(o), parseFloat(n);
            }
            e(t.exports, 'safeURIEncode', () => n),
                e(t.exports, 'convertToPixels', () => r),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100),
                window.addEventListener('DOMContentLoaded', function () {
                    let e = performance.getEntriesByType('navigation')[0].name;
                    e.includes('#:~:text=') && window.history.replaceState(null, '', e.split('#')[0]);
                });
        });
    var l = r('df1N6');
    {
        let e = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            t = document.getElementsByTagName('painted-content')[0],
            o = t.querySelectorAll(e.join(', ')),
            n = {};
        function i() {
            for (let e of o) e.classList.toggle('sticky', !1);
            for (let e of o) {
                let t = e.tagName.toLowerCase(),
                    o = e.getBoundingClientRect().top <= (n[t] ?? 0);
                if ((e.classList.toggle('sticky', o), !o)) break;
            }
        }
        function a() {
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
            o && (n[e] = (0, l.convertToPixels)(o, getComputedStyle(o).getPropertyValue('--this-top')) + 1);
        }),
            document.addEventListener('DOMContentLoaded', i),
            document.addEventListener('scroll', i),
            document.addEventListener('DOMContentLoaded', a),
            document.addEventListener('resize', a);
    }
})();
//# sourceMappingURL=content.js.map
