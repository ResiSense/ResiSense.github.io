var e, r, t, n, o;
(r = {}),
    (t = {}),
    null == (n = (e = globalThis).parcelRequire8bfa) &&
        (((n = function (e) {
            if (e in r) return r[e].exports;
            if (e in t) {
                var n = t[e];
                delete t[e];
                var o = { id: e, exports: {} };
                return (r[e] = o), n.call(o.exports, o, o.exports), o.exports;
            }
            var s = Error("Cannot find module '" + e + "'");
            throw ((s.code = 'MODULE_NOT_FOUND'), s);
        }).register = function (e, r) {
            t[e] = r;
        }),
        (e.parcelRequire8bfa = n)),
    (o = n.register)('kyWZn', function (e, r) {
        Object.defineProperty(e.exports, 'default', { get: () => i, set: void 0, enumerable: !0, configurable: !0 });
        var t = n('gx5Hu');
        let o = new Map();
        async function s(e, r) {
            let n = o.get(e);
            return [
                n ??
                    (await (async () => {
                        let t = await s(e, r);
                        return o.set(e, t), t;
                    })()),
                void 0 !== n,
            ];
            async function s(e, r) {
                let n = [],
                    o = performance.now(),
                    s = (t && t.__esModule ? t.default : t).go(e, r, { keys: ['title', 'content'], all: !0 }),
                    i = performance.now(),
                    a = performance.now();
                s.forEach(r => {
                    n.push({
                        path: r.obj.path,
                        score: r.score,
                        title: r.obj.title.target,
                        highlightedTitleChunks: f(e, r[0]),
                        highlightedContentChunks: f(e, r[1]),
                    });
                });
                let l = performance.now();
                return console.log('Fuzzysort took', i - o, 'ms'), console.log('Compilation took', l - a, 'ms'), n;
                function f(e, r) {
                    let t = '<span class="highlight">',
                        n = '</span>',
                        o = r.highlight(e => `${t}${e}${n}`);
                    if (0 === o.length) return [];
                    let s = RegExp(String.raw`^${t}.*${n}$`, 'g'),
                        [i, a] = (function (e) {
                            let r = [],
                                t = [];
                            return (
                                e.forEach(e => {
                                    e.match(s)
                                        ? (t.push(r.length), r.push(e))
                                        : r.push(
                                              ...(function (e) {
                                                  for (let r = 0; r < e.length; r++) {
                                                      let t = e[r].split('\n');
                                                      if (t.length > 1) {
                                                          let n = (function (e) {
                                                              let r = [];
                                                              for (let t = 0; t < e.length; t++)
                                                                  r.push(e[t]), t < e.length - 1 && r.push('');
                                                              return r;
                                                          })(t);
                                                          e.splice(r, 1, ...n), (r += n.length - 1);
                                                      }
                                                  }
                                                  return e;
                                              })(e.split(/(?<=\n|\.\s|\?\s|!\s)/g).filter(e => e.length > 0))
                                          );
                                }),
                                [r, t]
                            );
                        })(
                            (function (r) {
                                let o = [];
                                return (
                                    r.forEach(r => {
                                        if (r.match(s)) o.push(r);
                                        else {
                                            let s = (function (e) {
                                                let r = RegExp(String.raw`(?=${t})|(?<=${n})`, 'g');
                                                return e.split(r);
                                            })(
                                                (function (r) {
                                                    let o = e.split(' ').filter(e => e.length > 0),
                                                        s = RegExp(String.raw`(${o.join('|')})`, 'gi');
                                                    return r.replace(s, `${t}$1${n}`);
                                                })(r)
                                            );
                                            o.push(...s);
                                        }
                                    }),
                                    o
                                );
                            })(o)
                        );
                    return (function (e, r) {
                        let t = [],
                            n = 0;
                        for (; n < e.length; ) {
                            var o, s;
                            let i,
                                a = '';
                            for (
                                ;
                                ((o = n),
                                (s = i =
                                    { isBefore: r.includes(o + 1), isTag: r.includes(o), isAfter: r.includes(o - 1) }))
                                    .isBefore ||
                                s.isTag ||
                                s.isAfter;

                            ) {
                                let r = e[n];
                                if (void 0 === r || (n++, (a += r), !i.isBefore && i.isAfter)) break;
                            }
                            a.length > 0 ? t.push(a.trim()) : n++;
                        }
                        return t;
                    })(i, a);
                }
            }
        }
        class i {
            static {
                this.search = s;
            }
        }
    }),
    o('gx5Hu', function (e, r) {
        var t, n;
        (t = e.exports),
            (n = e => {
                var r,
                    t,
                    n,
                    o,
                    s = (e, r = '<b>', t = '</b>') => {
                        for (
                            var n = 'function' == typeof r ? r : void 0,
                                o = e.target,
                                s = o.length,
                                i = e.indexes,
                                a = '',
                                l = 0,
                                f = 0,
                                c = !1,
                                g = [],
                                u = 0;
                            u < s;
                            ++u
                        ) {
                            var h = o[u];
                            if (i[f] === u) {
                                if ((++f, c || ((c = !0), n ? (g.push(a), (a = '')) : (a += r)), f === i.length)) {
                                    n
                                        ? ((a += h), g.push(n(a, l++)), (a = ''), g.push(o.substr(u + 1)))
                                        : (a += h + t + o.substr(u + 1));
                                    break;
                                }
                            } else c && ((c = !1), n ? (g.push(n(a, l++)), (a = '')) : (a += t));
                            a += h;
                        }
                        return n ? g : a;
                    },
                    i = e => {
                        'number' == typeof e ? (e = '' + e) : 'string' != typeof e && (e = '');
                        var r = x(e);
                        return f(e, { _targetLower: r._lower, _targetLowerCodes: r.lowerCodes, _bitflags: r.bitflags });
                    };
                class a {
                    get indexes() {
                        return this._indexes.slice(0, this._indexes.len).sort((e, r) => e - r);
                    }
                    set indexes(e) {
                        return (this._indexes = e);
                    }
                    highlight(e, r) {
                        return s(this, e, r);
                    }
                    get score() {
                        return c(this._score);
                    }
                    set score(e) {
                        this._score = g(e);
                    }
                }
                class l extends Array {
                    get score() {
                        return c(this._score);
                    }
                    set score(e) {
                        this._score = g(e);
                    }
                }
                var f = (e, r) => {
                        let t = new a();
                        return (
                            (t.target = e),
                            (t.obj = r.obj ?? O),
                            (t._score = r._score ?? M),
                            (t._indexes = r._indexes ?? []),
                            (t._targetLower = r._targetLower ?? ''),
                            (t._targetLowerCodes = r._targetLowerCodes ?? O),
                            (t._nextBeginningIndexes = r._nextBeginningIndexes ?? O),
                            (t._bitflags = r._bitflags ?? 0),
                            t
                        );
                    },
                    c = e => (e === M ? 0 : e > 1 ? e : Math.E ** -(((-e + 1) ** 0.04307 - 1) * 2)),
                    g = e => (0 === e ? M : e > 1 ? e : 1 - Math.pow(-(Math.log(e) / 2) + 1, 1 / 0.04307)),
                    u = e => {
                        'number' == typeof e ? (e = '' + e) : 'string' != typeof e && (e = '');
                        var r = x((e = e.trim())),
                            t = [];
                        if (r.containsSpace) {
                            var n = e.split(/\s+/);
                            n = [...new Set(n)];
                            for (var o = 0; o < n.length; o++)
                                if ('' !== n[o]) {
                                    var s = x(n[o]);
                                    t.push({ lowerCodes: s.lowerCodes, _lower: n[o].toLowerCase(), containsSpace: !1 });
                                }
                        }
                        return {
                            lowerCodes: r.lowerCodes,
                            _lower: r._lower,
                            containsSpace: r.containsSpace,
                            bitflags: r.bitflags,
                            spaceSearches: t,
                        };
                    },
                    h = e => {
                        if (e.length > 999) return i(e);
                        var r = y.get(e);
                        return void 0 !== r || ((r = i(e)), y.set(e, r)), r;
                    },
                    v = e => {
                        if (e.length > 999) return u(e);
                        var r = k.get(e);
                        return void 0 !== r || ((r = u(e)), k.set(e, r)), r;
                    },
                    _ = (e, r) => {
                        var t = [];
                        t.total = e.length;
                        var n = r?.limit || I;
                        if (r?.key)
                            for (var o = 0; o < e.length; o++) {
                                var s = e[o],
                                    i = A(s, r.key);
                                if (i != O) {
                                    E(i) || (i = h(i));
                                    var a = f(i.target, { _score: i._score, obj: s });
                                    if ((t.push(a), t.length >= n)) break;
                                }
                            }
                        else if (r?.keys)
                            for (var o = 0; o < e.length; o++) {
                                for (var s = e[o], c = new l(r.keys.length), g = r.keys.length - 1; g >= 0; --g) {
                                    var i = A(s, r.keys[g]);
                                    if (!i) {
                                        c[g] = R;
                                        continue;
                                    }
                                    E(i) || (i = h(i)), (i._score = M), (i._indexes.len = 0), (c[g] = i);
                                }
                                if (((c.obj = s), (c._score = M), t.push(c), t.length >= n)) break;
                            }
                        else
                            for (var o = 0; o < e.length; o++) {
                                var i = e[o];
                                if (
                                    i != O &&
                                    (E(i) || (i = h(i)), (i._score = M), (i._indexes.len = 0), t.push(i), t.length >= n)
                                )
                                    break;
                            }
                        return t;
                    },
                    p = (e, r, t = !1, n = !1) => {
                        if (!1 === t && e.containsSpace) return d(e, r, n);
                        for (
                            var o = e._lower,
                                s = e.lowerCodes,
                                i = s[0],
                                l = r._targetLowerCodes,
                                f = s.length,
                                c = l.length,
                                g = 0,
                                u = 0,
                                h = 0;
                            ;

                        ) {
                            var v = i === l[u];
                            if (v) {
                                if (((C[h++] = u), ++g === f)) break;
                                i = s[g];
                            }
                            if (++u >= c) return O;
                        }
                        var g = 0,
                            _ = !1,
                            p = 0,
                            x = r._nextBeginningIndexes;
                        x === O && (x = r._nextBeginningIndexes = w(r.target));
                        var b = 0;
                        if ((u = 0 === C[0] ? 0 : x[C[0] - 1]) !== c)
                            for (;;)
                                if (u >= c) {
                                    if (g <= 0 || ++b > 200) break;
                                    --g, (u = x[m[--p]]);
                                } else {
                                    var v = s[g] === l[u];
                                    if (v) {
                                        if (((m[p++] = u), ++g === f)) {
                                            _ = !0;
                                            break;
                                        }
                                        ++u;
                                    } else u = x[u];
                                }
                        var y = f <= 1 ? -1 : r._targetLower.indexOf(o, C[0]),
                            k = !!~y,
                            S = !!k && (0 === y || r._nextBeginningIndexes[y - 1] === y);
                        if (k && !S) {
                            for (var B = 0; B < x.length; B = x[B])
                                if (!(B <= y)) {
                                    for (var L = 0; L < f && s[L] === r._targetLowerCodes[B + L]; L++);
                                    if (L === f) {
                                        (y = B), (S = !0);
                                        break;
                                    }
                                }
                        }
                        var $ = e => {
                            for (var r = 0, t = 0, n = 1; n < f; ++n) e[n] - e[n - 1] != 1 && ((r -= e[n]), ++t);
                            if (
                                ((r -= (12 + (e[f - 1] - e[0] - (f - 1))) * t),
                                0 !== e[0] && (r -= e[0] * e[0] * 0.2),
                                _)
                            ) {
                                for (var o = 1, n = x[0]; n < c; n = x[n]) ++o;
                                o > 24 && (r *= (o - 24) * 10);
                            } else r *= 1e3;
                            return (
                                (r -= (c - f) / 2),
                                k && (r /= 1 + f * f * 1),
                                S && (r /= 1 + f * f * 1),
                                (r -= (c - f) / 2)
                            );
                        };
                        if (_) {
                            if (S) {
                                for (var B = 0; B < f; ++B) C[B] = y + B;
                                var j = C,
                                    A = $(C);
                            } else
                                var j = m,
                                    A = $(m);
                        } else {
                            if (k) for (var B = 0; B < f; ++B) C[B] = y + B;
                            var j = C,
                                A = $(j);
                        }
                        r._score = A;
                        for (var B = 0; B < f; ++B) r._indexes[B] = j[B];
                        r._indexes.len = f;
                        let E = new a();
                        return (E.target = r.target), (E._score = r._score), (E._indexes = r._indexes), E;
                    },
                    d = (e, r, t) => {
                        for (
                            var n = new Set(),
                                o = 0,
                                s = O,
                                i = 0,
                                a = e.spaceSearches,
                                l = a.length,
                                f = 0,
                                c = () => {
                                    for (let e = f - 1; e >= 0; e--)
                                        r._nextBeginningIndexes[S[2 * e + 0]] = S[2 * e + 1];
                                },
                                g = !1,
                                u = 0;
                            u < l;
                            ++u
                        ) {
                            if (((L[u] = M), (s = p(a[u], r)), t)) {
                                if (s === O) continue;
                                g = !0;
                            } else if (s === O) return c(), O;
                            if (u !== l - 1) {
                                var h = s._indexes,
                                    v = !0;
                                for (let e = 0; e < h.len - 1; e++)
                                    if (h[e + 1] - h[e] != 1) {
                                        v = !1;
                                        break;
                                    }
                                if (v) {
                                    var _ = h[h.len - 1] + 1,
                                        d = r._nextBeginningIndexes[_ - 1];
                                    for (let e = _ - 1; e >= 0 && d === r._nextBeginningIndexes[e]; e--)
                                        (r._nextBeginningIndexes[e] = _), (S[2 * f + 0] = e), (S[2 * f + 1] = d), f++;
                                }
                            }
                            (o += s._score / l),
                                (L[u] = s._score / l),
                                s._indexes[0] < i && (o -= (i - s._indexes[0]) * 2),
                                (i = s._indexes[0]);
                            for (var x = 0; x < s._indexes.len; ++x) n.add(s._indexes[x]);
                        }
                        if (t && !g) return O;
                        c();
                        var b = p(e, r, !0);
                        if (b !== O && b._score > o) {
                            if (t) for (var u = 0; u < l; ++u) L[u] = b._score / l;
                            return b;
                        }
                        t && (s = r), (s._score = o);
                        var u = 0;
                        for (let e of n) s._indexes[u++] = e;
                        return (s._indexes.len = u), s;
                    },
                    x = e => {
                        for (var r = e.length, t = e.toLowerCase(), n = [], o = 0, s = !1, i = 0; i < r; ++i) {
                            var a = (n[i] = t.charCodeAt(i));
                            if (32 === a) {
                                s = !0;
                                continue;
                            }
                            o |= 1 << (a >= 97 && a <= 122 ? a - 97 : a >= 48 && a <= 57 ? 26 : a <= 127 ? 30 : 31);
                        }
                        return { lowerCodes: n, bitflags: o, containsSpace: s, _lower: t };
                    },
                    b = e => {
                        for (var r = e.length, t = [], n = 0, o = !1, s = !1, i = 0; i < r; ++i) {
                            var a = e.charCodeAt(i),
                                l = a >= 65 && a <= 90,
                                f = l || (a >= 97 && a <= 122) || (a >= 48 && a <= 57),
                                c = (l && !o) || !s || !f;
                            (o = l), (s = f), c && (t[n++] = i);
                        }
                        return t;
                    },
                    w = e => {
                        for (var r = e.length, t = b(e), n = [], o = t[0], s = 0, i = 0; i < r; ++i)
                            o > i ? (n[i] = o) : ((o = t[++s]), (n[i] = void 0 === o ? r : o));
                        return n;
                    },
                    y = new Map(),
                    k = new Map(),
                    C = [],
                    m = [],
                    S = [],
                    B = [],
                    L = [],
                    $ = [],
                    j = [],
                    A = (e, r) => {
                        var t = e[r];
                        if (void 0 !== t) return t;
                        if ('function' == typeof r) return r(e);
                        var n = r;
                        Array.isArray(r) || (n = r.split('.'));
                        for (var o = n.length, s = -1; e && ++s < o; ) e = e[n[s]];
                        return e;
                    },
                    E = e => 'object' == typeof e && 'number' == typeof e._bitflags,
                    I = 1 / 0,
                    M = -1 / 0,
                    T = [];
                T.total = 0;
                var O = null,
                    R = i(''),
                    z =
                        ((r = []),
                        (t = 0),
                        (n = {}),
                        (o = e => {
                            for (var n = 0, o = r[n], s = 1; s < t; ) {
                                var i = s + 1;
                                (n = s),
                                    i < t && r[i]._score < r[s]._score && (n = i),
                                    (r[(n - 1) >> 1] = r[n]),
                                    (s = 1 + (n << 1));
                            }
                            for (var a = (n - 1) >> 1; n > 0 && o._score < r[a]._score; a = ((n = a) - 1) >> 1)
                                r[n] = r[a];
                            r[n] = o;
                        }),
                        (n.add = e => {
                            var n = t;
                            r[t++] = e;
                            for (var o = (n - 1) >> 1; n > 0 && e._score < r[o]._score; o = ((n = o) - 1) >> 1)
                                r[n] = r[o];
                            r[n] = e;
                        }),
                        (n.poll = e => {
                            if (0 !== t) {
                                var n = r[0];
                                return (r[0] = r[--t]), o(), n;
                            }
                        }),
                        (n.peek = e => {
                            if (0 !== t) return r[0];
                        }),
                        (n.replaceTop = e => {
                            (r[0] = e), o();
                        }),
                        n);
                return {
                    single: (e, r) => {
                        if (!e || !r) return O;
                        var t = v(e);
                        E(r) || (r = h(r));
                        var n = t.bitflags;
                        return (n & r._bitflags) !== n ? O : p(t, r);
                    },
                    go: (e, r, t) => {
                        if (!e) return t?.all ? _(r, t) : T;
                        var n = v(e),
                            o = n.bitflags,
                            s = n.containsSpace,
                            i = g(t?.threshold || 0),
                            a = t?.limit || I,
                            f = 0,
                            c = 0,
                            u = r.length;
                        function d(e) {
                            f < a ? (z.add(e), ++f) : (++c, e._score > z.peek()._score && z.replaceTop(e));
                        }
                        if (t?.key)
                            for (var x = t.key, b = 0; b < u; ++b) {
                                var w = r[b],
                                    y = A(w, x);
                                if (y && (E(y) || (y = h(y)), (o & y._bitflags) === o)) {
                                    var k = p(n, y);
                                    k !== O && (k._score < i || ((k.obj = w), d(k)));
                                }
                            }
                        else if (t?.keys) {
                            var C = t.keys,
                                m = C.length;
                            e: for (var b = 0; b < u; ++b) {
                                for (var w = r[b], S = 0, F = 0; F < m; ++F) {
                                    var x = C[F],
                                        y = A(w, x);
                                    if (!y) {
                                        $[F] = R;
                                        continue;
                                    }
                                    E(y) || (y = h(y)), ($[F] = y), (S |= y._bitflags);
                                }
                                if ((o & S) === o) {
                                    if (s) for (let e = 0; e < n.spaceSearches.length; e++) B[e] = M;
                                    for (var F = 0; F < m; ++F) {
                                        if ((y = $[F]) === R || ((j[F] = p(n, y, !1, s)), j[F] === O)) {
                                            j[F] = R;
                                            continue;
                                        }
                                        if (s)
                                            for (let e = 0; e < n.spaceSearches.length; e++) {
                                                if (L[e] > -1e3 && B[e] > M) {
                                                    var q = (B[e] + L[e]) / 4;
                                                    q > B[e] && (B[e] = q);
                                                }
                                                L[e] > B[e] && (B[e] = L[e]);
                                            }
                                    }
                                    if (s) {
                                        for (let e = 0; e < n.spaceSearches.length; e++) if (B[e] === M) continue e;
                                    } else {
                                        var D = !1;
                                        for (let e = 0; e < m; e++)
                                            if (j[e]._score !== M) {
                                                D = !0;
                                                break;
                                            }
                                        if (!D) continue;
                                    }
                                    var H = new l(m);
                                    for (let e = 0; e < m; e++) H[e] = j[e];
                                    if (s) {
                                        var N = 0;
                                        for (let e = 0; e < n.spaceSearches.length; e++) N += B[e];
                                    } else {
                                        var N = M;
                                        for (let e = 0; e < m; e++) {
                                            var k = H[e];
                                            if (k._score > -1e3 && N > M) {
                                                var q = (N + k._score) / 4;
                                                q > N && (N = q);
                                            }
                                            k._score > N && (N = k._score);
                                        }
                                    }
                                    if (((H.obj = w), (H._score = N), t?.scoreFn)) {
                                        if (!(N = t.scoreFn(H))) continue;
                                        (N = g(N)), (H._score = N);
                                    }
                                    N < i || d(H);
                                }
                            }
                        } else
                            for (var b = 0; b < u; ++b) {
                                var y = r[b];
                                if (y && (E(y) || (y = h(y)), (o & y._bitflags) === o)) {
                                    var k = p(n, y);
                                    k !== O && (k._score < i || d(k));
                                }
                            }
                        if (0 === f) return T;
                        for (var U = Array(f), b = f - 1; b >= 0; --b) U[b] = z.poll();
                        return (U.total = f + c), U;
                    },
                    prepare: i,
                    cleanup: () => {
                        y.clear(), k.clear();
                    },
                };
            }),
            'function' == typeof define && define.amd
                ? define([], n)
                : e.exports
                  ? (e.exports = n())
                  : (t.fuzzysort = n());
    }),
    n('kyWZn');
//# sourceMappingURL=SearchResults.js.map
