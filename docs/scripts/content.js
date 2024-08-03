(() => {
    function e(e, t, o, r) {
        Object.defineProperty(e, t, { get: o, set: r, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        o = {},
        r = {},
        n = t.parcelRequire8bfa;
    null == n &&
        (((n = function (e) {
            if (e in o) return o[e].exports;
            if (e in r) {
                var t = r[e];
                delete r[e];
                var n = { id: e, exports: {} };
                return (o[e] = n), t.call(n.exports, n, n.exports), n.exports;
            }
            var l = Error("Cannot find module '" + e + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }).register = function (e, t) {
            r[e] = t;
        }),
        (t.parcelRequire8bfa = n)),
        (0, n.register)('df1N6', function (t, o) {
            function r(e) {
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
            function n(e, t) {
                let o = document.createElement('div');
                (o.style.position = 'absolute'),
                    (o.style.visibility = 'hidden'),
                    (o.style.height = t),
                    e.appendChild(o);
                let r = window.getComputedStyle(o).height;
                return e.removeChild(o), parseFloat(r);
            }
            e(t.exports, 'safeURIEncode', () => r),
                e(t.exports, 'convertToPixels', () => n),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100);
        });
    var l = n('df1N6');
    {
        let e = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            t = document.getElementsByTagName('painted-content')[0],
            o = t.querySelectorAll(e.join(', ')),
            r = {};
        function i() {
            for (let e of o) e.classList.toggle('sticky', !1);
            for (let e of o) {
                let t = e.tagName.toLowerCase(),
                    o = e.getBoundingClientRect().top <= (r[t] ?? 0);
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
            o && (r[e] = (0, l.convertToPixels)(o, getComputedStyle(o).getPropertyValue('--this-top')) + 1);
        }),
            document.addEventListener('DOMContentLoaded', i),
            document.addEventListener('scroll', i),
            document.addEventListener('DOMContentLoaded', a),
            document.addEventListener('resize', a);
    }
})();
//# sourceMappingURL=content.js.map
