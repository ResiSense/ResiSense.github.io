(() => {
    function e(e, t, r, o) {
        Object.defineProperty(e, t, { get: r, set: o, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        r = {},
        o = {},
        n = t.parcelRequire8bfa;
    null == n &&
        (((n = function (e) {
            if (e in r) return r[e].exports;
            if (e in o) {
                var t = o[e];
                delete o[e];
                var n = { id: e, exports: {} };
                return (r[e] = n), t.call(n.exports, n, n.exports), n.exports;
            }
            var i = Error("Cannot find module '" + e + "'");
            throw ((i.code = 'MODULE_NOT_FOUND'), i);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (t.parcelRequire8bfa = n)),
        (0, n.register)('df1N6', function (t, r) {
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
            function n(e, t) {
                let r = document.createElement('div');
                (r.style.position = 'absolute'),
                    (r.style.visibility = 'hidden'),
                    (r.style.height = t),
                    e.appendChild(r);
                let o = window.getComputedStyle(r).height;
                return e.removeChild(r), parseFloat(o);
            }
            e(t.exports, 'safeURIEncode', () => o),
                e(t.exports, 'convertToPixels', () => n),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100);
        }),
        n('df1N6');
})();
//# sourceMappingURL=globalLibrary.js.map
