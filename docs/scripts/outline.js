(() => {
    function e(e, t, n, o) {
        Object.defineProperty(e, t, { get: n, set: o, enumerable: !0, configurable: !0 });
    }
    var t = globalThis,
        n = {},
        o = {},
        i = t.parcelRequire8bfa;
    null == i &&
        (((i = function (e) {
            if (e in n) return n[e].exports;
            if (e in o) {
                var t = o[e];
                delete o[e];
                var i = { id: e, exports: {} };
                return (n[e] = i), t.call(i.exports, i, i.exports), i.exports;
            }
            var l = Error("Cannot find module '" + e + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
        }).register = function (e, t) {
            o[e] = t;
        }),
        (t.parcelRequire8bfa = i)),
        (0, i.register)('df1N6', function (t, n) {
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
            function i(e, t) {
                let n = document.createElement('div');
                (n.style.position = 'absolute'),
                    (n.style.visibility = 'hidden'),
                    (n.style.height = t),
                    e.appendChild(n);
                let o = window.getComputedStyle(n).height;
                return e.removeChild(n), parseFloat(o);
            }
            e(t.exports, 'safeURIEncode', () => o),
                e(t.exports, 'convertToPixels', () => i),
                window.setTimeout(() => {
                    document.body.classList.add('post-buffered');
                }, 100);
        });
    var l = i('df1N6');
    {
        window.location.pathname.split('/').includes('404') &&
            (document.querySelector('painted-outline').style.visibility = 'hidden');
        let e = document.getElementById('outline-progress-pointer'),
            t = document.querySelector('painted-content')?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        function r() {
            if (!t || !e) return;
            let n =
                    [...t]
                        .reverse()
                        .find(
                            e =>
                                e.getBoundingClientRect().top <=
                                (0, l.convertToPixels)(e, getComputedStyle(e).getPropertyValue('--this-top')) + 1
                        ) || t[0],
                o = document.getElementById(`--outline-${n.id}`),
                i = document.getElementById(`--outline-${t[0].id}`);
            (e.style.top = `${o.getBoundingClientRect().top - i.getBoundingClientRect().top}px`),
                (e.style.left = `${2 + o.getBoundingClientRect().left - i.getBoundingClientRect().left}px`);
        }
        window.addEventListener('DOMContentLoaded', r), window.addEventListener('scroll', r);
    }
})();
//# sourceMappingURL=outline.js.map
