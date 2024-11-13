(() => {
    function e(e, t, n, o) {
        Object.defineProperty(e, t, { get: n, set: o, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        n = {},
        o = {},
        r = t.parcelRequire94c2;
    null == r &&
        (((r = function (e) {
            if (e in n) return n[e].exports;
            if (e in o) {
                var t = o[e];
                delete o[e];
                var r = { id: e, exports: {} };
                return (n[e] = r), t.call(r.exports, r, r.exports), r.exports;
            }
            var d = Error("Cannot find module '" + e + "'");
            throw ((d.code = 'MODULE_NOT_FOUND'), d);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (t.parcelRequire94c2 = r));
    var d = r.register;
    d('h8pS0', function (t, n) {
        e(t.exports, 'default', () => d);
        var o = r('ap5vA');
        class d {
            static {
                this.contentIsPastHeader = { old: void 0, current: void 0 };
            }
        }
        {
            function a() {
                let e = d.contentIsPastHeader;
                (e.current = window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize)),
                    e.current !== e.old &&
                        ((e.old = e.current),
                        window.dispatchEvent(new CustomEvent((0, o.default).contentScrollPastHeader.toString())));
            }
            window.addEventListener('DOMContentLoaded', a),
                window.addEventListener('scroll', a),
                window.addEventListener('DOMContentLoaded', l),
                window.addEventListener('scroll', l);
            let e =
                    document.getElementById('header-page-title') ||
                    (() => {
                        throw Error('Header page title element not found!');
                    })(),
                t = document.getElementsByTagName('header')[0],
                n = document.getElementsByTagName('main')[0];
            function l() {
                let o = n.getBoundingClientRect().top,
                    r = t.getBoundingClientRect().bottom;
                e.classList.toggle('hidden', !(o <= r));
            }
        }
    }),
        d('ap5vA', function (t, n) {
            e(t.exports, 'default', () => d);
            var o,
                r = (((o = r || {})[(o.contentScrollPastHeader = 0)] = 'contentScrollPastHeader'), o),
                d = r;
        }),
        r('h8pS0');
})();
//# sourceMappingURL=responsivenessHandler.js.map
