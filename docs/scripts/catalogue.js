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
            var a = Error("Cannot find module '" + e + "'");
            throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (t.parcelRequire94c2 = r));
    var a = r.register;
    a('ap5vA', function (t, n) {
        e(t.exports, 'default', () => a);
        var o,
            r = (((o = r || {})[(o.contentScrollPastHeader = 0)] = 'contentScrollPastHeader'), o),
            a = r;
    }),
        a('h8pS0', function (t, n) {
            e(t.exports, 'default', () => a);
            var o = r('ap5vA');
            class a {
                static {
                    this.contentIsPastHeader = { old: void 0, current: void 0 };
                }
            }
            {
                function d() {
                    let e = a.contentIsPastHeader;
                    (e.current = window.scrollY > parseFloat(getComputedStyle(document.documentElement).fontSize)),
                        e.current !== e.old &&
                            ((e.old = e.current),
                            window.dispatchEvent(new CustomEvent((0, o.default).contentScrollPastHeader.toString())));
                }
                window.addEventListener('DOMContentLoaded', d),
                    window.addEventListener('scroll', d),
                    window.addEventListener('DOMContentLoaded', i),
                    window.addEventListener('scroll', i);
                let e =
                        document.getElementById('header-page-title') ||
                        (() => {
                            throw Error('Header page title element not found!');
                        })(),
                    t = document.getElementsByTagName('header')[0],
                    n = document.getElementsByTagName('main')[0];
                function i() {
                    let o = n.getBoundingClientRect().top,
                        r = t.getBoundingClientRect().bottom;
                    e.classList.toggle('hidden', !(o <= r));
                }
            }
        });
    var d = r('ap5vA'),
        i = r('h8pS0');
    {
        let e = document.getElementsByClassName('catalogue-item');
        function l() {
            if (void 0 === i.default.contentIsPastHeader.current) {
                requestAnimationFrame(l);
                return;
            }
            Array.from(e).forEach(e => {
                let t = (
                        document.querySelector('.catalogue-item:not(.catalogue-arrow)') ||
                        (() => {
                            throw Error('First catalogue item not found!');
                        })()
                    ).getBoundingClientRect().left,
                    n = e.getBoundingClientRect().left;
                e.setAttribute('translate-amount', `${t - n}`),
                    window.dispatchEvent(new CustomEvent((0, d.default).contentScrollPastHeader.toString()));
            });
        }
        window.addEventListener((0, d.default).contentScrollPastHeader.toString(), function () {
            let t = i.default.contentIsPastHeader.current;
            Array.from(e).forEach(e => {
                e.classList.contains('catalogue-arrow') ||
                    ((e.style.translate = t ? `${e.getAttribute('translate-amount')}px` : '0'),
                    e.classList.toggle('catalogue-item-hidden', t));
            });
        }),
            window.addEventListener('DOMContentLoaded', l),
            window.addEventListener('resize', l);
    }
})();
//# sourceMappingURL=catalogue.js.map
