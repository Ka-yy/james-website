!function() {
    "use strict";
    function c(t, r) {
        var n = new PerformanceObserver(function(t) {
            for (var n = t.getEntries(), e = 0; e < n.length; e++)
                r(n[e])
        }
        );
        return n.observe({
            type: t,
            buffered: !0
        }),
        function() {
            n && (n.disconnect(),
            n = null)
        }
    }
    var u, f, d, m, s;
    function v() {
        u && u()
    }
    function h() {
        f && f()
    }
    function p() {
        d && d()
    }
    function l(t, n) {
        for (var e = t || {}, r = 0; r < n.length; r++)
            e = void 0 === e ? e : e[n[r]];
        return e
    }
    function e(t) {
        var n;
        if (t)
            try {
                n = function(t) {
                    var n, e, r = {};
                    for (e in t || {})
                        "string" == typeof t[e] && (r[e] = t[e]);
                    return n = Object.keys(r).length ? JSON.stringify(r) : n
                }(JSON.parse(t))
            } catch (t) {}
        return n
    }
    function r(t, n, e) {
        return l(n.t, ["dataset", t]) || e
    }
    function t(t, n) {
        return "true" === r(t, n)
    }
    function w(t, n) {
        t = r(t, n, "") || [];
        return "string" == typeof t ? t.split(",") : t
    }
    var o = {}
      , i = {};
    function a(n, e, t) {
        return t.some(function(t) {
            return 0 === n.indexOf(t) || 0 === e.indexOf(t)
        })
    }
    function b(e, r) {
        return function(t) {
            var n = t.name.replace(/^\d/, "_").replace(/\W/g, "_");
            "mark" === t.entryType ? a(n, t.name, r.o) && (o[n] = Math.round(t.startTime) || 0) : a(n, t.name, r.i) && (i[n] = Math.round(t.duration) || 0),
            n = e,
            Object.keys(o).length && (n.custom_marks = JSON.stringify(o)),
            Object.keys(i).length && (n.custom_measures = JSON.stringify(i))
        }
    }
    function g() {
        m && m(),
        s && s()
    }
    function q(t, n) {
        var e = t;
        if (window.LayoutShift)
            try {
                var r = 0;
                u = c("layout-shift", function(t) {
                    r += t.hadRecentInput ? 0 : t.value,
                    e.cumulative_layout_shift = Math.round(1e3 * r) / 1e3
                }),
                e.cumulative_layout_shift = Math.round(1e3 * r) / 1e3
            } catch (t) {
                v()
            }
        var o = t;
        if (window.LargestContentfulPaint)
            try {
                f = c("largest-contentful-paint", function(t) {
                    o.largest_contentful_paint = Math.round(t.startTime)
                })
            } catch (t) {
                h()
            }
        var i = t;
        if (window.PerformanceElementTiming)
            try {
                var a = document.querySelector("[data-bilmur-mie]");
                a && a.hasAttribute("elementtiming") && (d = c("element", function(t) {
                    t.element === a && (i.mie_renderTime = Math.round(t.renderTime),
                    p())
                }))
            } catch (t) {
                p()
            }
        if (window.PerformanceMeasure && window.PerformanceMark) {
            n.i = w("customMeasuresPrefixes", n),
            n.o = w("customMarksPrefixes", n);
            t = b(t, n);
            try {
                m = c("mark", t),
                s = c("measure", t)
            } catch (t) {
                g()
            }
        }
    }
    function z(t, n) {
        t.provider = r("provider", n),
        t.service = r("service", n),
        t.custom_properties = e(l(n.t, ["dataset", "customproperties"]))
    }
    function M(t) {
        return 0 < t || 0 === t
    }
    function H(n, t) {
        var e, r, o = l(performance, ["timing"]) || {};
        o.navigationStart && (r = 0 === (e = (e = performance.getEntriesByType("navigation")) && e[0] ? e[0] : {}).startTime ? 2 : 1,
        ["unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "secureConnectionStart", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"].forEach(function(t) {
            n["nt_" + t] = "number" == typeof o[t = t] && "number" == typeof o.navigationStart && !(o[t] <= 0 || o.navigationStart <= 0) && 0 <= (t = o[t] - o.navigationStart) ? t : void 0
        }),
        2 == r && "number" == typeof e.secureConnectionStart && 0 < e.secureConnectionStart && (n.nt_secureConnectionStart = Math.floor(e.secureConnectionStart)),
        n.nt_redirectCount = e.redirectCount,
        n.nt_nextHopProtocol = e.nextHopProtocol,
        t.u && (n.nt_activationStart = e.activationStart && Math.floor(e.activationStart)),
        n.nt_api_level = r)
    }
    function R(n, t) {
        function e(t, n) {
            var e;
            n.m += t.decodedBodySize || 0,
            "cache" === (e = t).deliveryType || 0 === e.duration || 0 < e.encodedBodySize && 0 < e.transferSize && e.transferSize < e.encodedBodySize || !(0 < e.transferSize) && (0 < e.decodedBodySize || e.duration < 30) ? n.v += t.decodedBodySize || 0 : n.h += t.transferSize || 0
        }
        function r(t) {
            n[t.p + "_size"] = t.m,
            n[t.p + "_transferred"] = t.h,
            0 < t.m && (n[t.p + "_cache_percent"] = Math.floor(t.v / t.m * 100))
        }
        if (n.nt_domContentLoadedEventStart) {
            for (var o = performance.getEntriesByType("resource") || [], i = {
                p: "resource",
                h: 0,
                m: 0,
                v: 0
            }, a = {
                p: "js",
                h: 0,
                m: 0,
                v: 0
            }, c = {
                p: "blocking",
                h: 0,
                m: 0,
                v: 0
            }, u = 0; u < o.length; u++)
                o[u].responseEnd < n.nt_domContentLoadedEventStart && (e(o[u], i),
                "script" === o[u].initiatorType && e(o[u], a),
                "blocking" === o[u].renderBlockingStatus) && e(o[u], c);
            r(i),
            r(a),
            r(c),
            t.l && (n.last_resource_end = o.reduce(function(t, n) {
                return Math.round(Math.max(t, n.responseEnd))
            }, 0))
        }
    }
    function U(t, n) {
        var e = t;
        try {
            var r = 0;
            document.createNodeIterator(document, 128, function(t) {
                return -1 < (t.nodeValue || "").indexOf("served from batcache in") ? 1 : 2
            }).nextNode() && (r = 1),
            e.batcache_hit = r
        } catch (t) {}
        z(t, n),
        e = t,
        r = l(navigator, ["connection"]) || {},
        e.effective_connection_type = r.effectiveType,
        M(r.rtt) && (e.rtt = r.rtt),
        M(r.downlink) && (e.downlink = Math.round(1e3 * r.downlink)),
        (e = t).host_name = l(location, ["hostname"]),
        e.url_path = l(location, ["pathname"]),
        H(t, n);
        for (var o = t, i = performance.getEntriesByType("paint") || [], a = 0; a < i.length; a++)
            "first-paint" === i[a].name && (o.start_render = Math.round(i[a].startTime)),
            "first-contentful-paint" === i[a].name && (o.first_contentful_paint = Math.round(i[a].startTime));
        R(t, n)
    }
    var n = 2e3;
    var _, y = !1, E = {};
    function S(t) {
        (t = t || {}).u && E.first_visible < 0 && (y = !0),
        v(),
        h(),
        p(),
        g(),
        y || "loading" === document.readyState || (y = !0,
        U(E, t),
        _(E))
    }
    var O = function(t) {
        var n, e = "";
        for (n in t)
            void 0 !== t[n] && (e += "&" + n + "=" + encodeURIComponent(t[n]));
        e && ((new Image).src = "https://pixel.wp.com/boom.gif?bilmur=1" + e)
    };
    if (window.performance && window.performance.getEntriesByType) {
        _ = O;
        var O = {}
          , k = (O.t = document.getElementById("bilmur") || {},
        O.u = t("allowHidden", O),
        "hidden" === document.visibilityState);
        if (!k || O.u) {
            O.u && (x = function() {
                "visible" === document.visibilityState && (E.first_visible = Math.floor(performance.now()),
                document.removeEventListener("visibilitychange", x))
            }
            ,
            k ? (E.first_visible = -1,
            document.addEventListener("visibilitychange", x)) : E.first_visible = 0);
            var x, L, C, j, I, J, N, k = t("allowIframe", O);
            try {
                if (window.self !== window.top && !k)
                    return
            } catch (t) {
                if (!k)
                    return
            }
            q(E, O),
            L = S,
            C = O,
            document.prerendering && document.addEventListener("prerenderingchange", function() {
                setTimeout(function() {
                    if (C.l)
                        return L(C)
                })
            }),
            j = S,
            I = O,
            "complete" === document.readyState ? setTimeout(T, n) : addEventListener("load", function() {
                setTimeout(T, n)
            }),
            J = S,
            N = O,
            document.addEventListener("visibilitychange", P)
        }
    }
    function T() {
        var t = performance.getEntriesByType("resource").reduce(function(t, n) {
            return Math.max(t, n.responseEnd)
        }, 0)
          , t = Math.floor(performance.now()) - Math.floor(t);
        if (n < t && (I.l = !0,
        !document.prerendering))
            return j(I);
        setTimeout(T, .75 * n <= t ? .05 * n : .25 * n)
    }
    function P() {
        "hidden" === document.visibilityState && (document.removeEventListener("visibilitychange", P),
        J(N))
    }
}();
