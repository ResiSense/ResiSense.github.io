var e, t, r, i;
(t = {}),
    (r = {}),
    null == (i = (e = globalThis).parcelRequire8bfa) &&
        (((i = function (e) {
            if (e in t) return t[e].exports;
            if (e in r) {
                var i = r[e];
                delete r[e];
                var o = { id: e, exports: {} };
                return (t[e] = o), i.call(o.exports, o, o.exports), o.exports;
            }
            var n = Error("Cannot find module '" + e + "'");
            throw ((n.code = 'MODULE_NOT_FOUND'), n);
        }).register = function (e, t) {
            r[e] = t;
        }),
        (e.parcelRequire8bfa = i)),
    (0, i.register)('df1N6', function (e, t) {
        function r(e, t) {
            let r = document.createElement('div');
            (r.style.position = 'absolute'), (r.style.visibility = 'hidden'), (r.style.height = t), e.appendChild(r);
            let i = window.getComputedStyle(r).height;
            return e.removeChild(r), parseFloat(i);
        }
        Object.defineProperty(e.exports, 'convertToPixels', {
            get: () => r,
            set: void 0,
            enumerable: !0,
            configurable: !0,
        }),
            window.setTimeout(() => {
                document.body.classList.add('post-buffered');
            }, 100);
    }),
    i('df1N6');
//# sourceMappingURL=globalLibrary.js.map
