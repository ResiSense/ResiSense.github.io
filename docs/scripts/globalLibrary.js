(() => {
    function e(e, t, r, n) {
        Object.defineProperty(e, t, { get: r, set: n, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        r = {},
        n = {},
        o = t.parcelRequire8bfa;
    null == o &&
        (((o = function (e) {
            if (e in r) return r[e].exports;
            if (e in n) {
                var t = n[e];
                delete n[e];
                var o = { id: e, exports: {} };
                return (r[e] = o), t.call(o.exports, o, o.exports), o.exports;
            }
            var i = Error("Cannot find module '" + e + "'");
            throw ((i.code = 'MODULE_NOT_FOUND'), i);
        }).register = function (e, t) {
            n[e] = t;
        }),
        (t.parcelRequire8bfa = o)),
        (0, o.register)('df1N6', function (t, r) {
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
            function o(e, t) {
                let r = document.createElement('div');
                (r.style.position = 'absolute'),
                    (r.style.visibility = 'hidden'),
                    (r.style.height = t),
                    e.appendChild(r);
                let n = window.getComputedStyle(r).height;
                return e.removeChild(r), parseFloat(n);
            }
            e(t.exports, 'safeURIEncode', () => n),
                e(t.exports, 'convertToPixels', () => o),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100),
                window.addEventListener('DOMContentLoaded', function () {
                    let e = performance.getEntriesByType('navigation')[0].name;
                    e.includes('#:~:text=') && window.history.replaceState(null, '', e.split('#')[0]);
                });
        }),
        o('df1N6');
})();
//# sourceMappingURL=globalLibrary.js.map
