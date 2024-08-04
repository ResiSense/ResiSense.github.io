(() => {
    function e(e, t, n, o) {
        Object.defineProperty(e, t, { get: n, set: o, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        n = {},
        o = {},
        r = t.parcelRequire8bfa;
    null == r &&
        (((r = function (e) {
            if (e in n) return n[e].exports;
            if (e in o) {
                var t = o[e];
                delete o[e];
                var r = { id: e, exports: {} };
                return (n[e] = r), t.call(r.exports, r, r.exports), r.exports;
            }
            var i = Error("Cannot find module '" + e + "'");
            throw ((i.code = 'MODULE_NOT_FOUND'), i);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (t.parcelRequire8bfa = r)),
        (0, r.register)('df1N6', function (t, n) {
            function o(e) {
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
                let n = document.createElement('div');
                (n.style.position = 'absolute'),
                    (n.style.visibility = 'hidden'),
                    (n.style.height = t),
                    e.appendChild(n);
                let o = window.getComputedStyle(n).height;
                return e.removeChild(n), parseFloat(o);
            }
            e(t.exports, 'safeURIEncode', () => o),
                e(t.exports, 'convertToPixels', () => r),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100),
                window.addEventListener('DOMContentLoaded', function () {
                    let e = performance.getEntriesByType('navigation')[0].name;
                    e.includes('#:~:text=') && window.history.replaceState(null, '', e.split('#')[0]);
                });
        });
    var i = r('df1N6');
    {
        let e = document.getElementsByTagName('painted-content')[0],
            t = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            n = e.querySelectorAll(t.join(', ')),
            o = {};
        function l() {
            t.forEach(t => {
                let n = e.getElementsByTagName(t)[0];
                if (!n) return;
                let r = (0, i.convertToPixels)(n, getComputedStyle(n).getPropertyValue('--this-top'));
                o[t] = r + 1;
            });
        }
        function a() {
            for (let e of n) e.classList.toggle('sticky', !1);
            for (let e of n) {
                let t = e.tagName.toLowerCase(),
                    n = e.getBoundingClientRect().top <= (o[t] ?? 0);
                if ((e.classList.toggle('sticky', n), !n)) break;
            }
        }
        function d() {
            (
                document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6') ||
                (() => {
                    throw Error('Heading elements not found!');
                })()
            ).forEach(t => {
                e.querySelector(`.scroll-marker[id="${t.id}"]`).style.scrollMarginTop =
                    getComputedStyle(t).scrollMarginTop;
            });
        }
        window.addEventListener('DOMContentLoaded', l),
            window.addEventListener('DOMContentLoaded', a),
            window.addEventListener('scroll', a),
            window.addEventListener('resize', () => {
                l(), a();
            }),
            window.addEventListener('DOMContentLoaded', d),
            window.addEventListener('resize', d);
    }
})();
//# sourceMappingURL=content.js.map
