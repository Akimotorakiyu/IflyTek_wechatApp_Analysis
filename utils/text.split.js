var t = function(t) {
    return !(!t.match(/\[p(\d)+\]/) && !t.match(/[A-Za-z0-9\u4e00-\u9fa5]/));
}, e = function(t) {
    var e = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
    return null == t ? "" : (t + "").replace(e, "");
};

module.exports = {
    santenceSplit: function(e, r, n, o) {
        function a(e, r, n) {
            for (var o = r.replace(n || i, "$1^^^^").split(s), l = "", h = 0, c = 0, f = o.length; c < f; c++) if (l += o[c], 
            (h = l.length) && h < u) {
                if (c !== f - 1 || !l || !t(l)) continue;
                var x = e[e.length - 1];
                e.push({
                    canPlay: t(l),
                    txt: l,
                    text: l,
                    startWordIdx: x ? x.startWordIdx + x.totalWords || x.totalWords + 1 : 0,
                    totalWords: l.length
                }), l = "", h = 0;
            } else {
                if (n) {
                    c === f - 2 && "\n" === o[c + 1] && (l += "\n", c++), W = e[e.length - 1], l && e.push({
                        canPlay: t(l),
                        txt: l,
                        text: l,
                        startWordIdx: W ? W.startWordIdx + W.totalWords || W.totalWords + 1 : 0,
                        totalWords: l.length
                    }), l = "", h = 0;
                    continue;
                }
                if (c === f - 2 && "\n" === o[c + 1] && (l += "\n", c++), l && h <= g) {
                    var W = e[e.length - 1];
                    e.push({
                        canPlay: t(l),
                        txt: l,
                        text: l,
                        startWordIdx: W ? W.startWordIdx + W.totalWords || W.totalWords + 1 : 0,
                        totalWords: l.length
                    }), l = "", h = 0;
                } else e = a(e, l, d), l = "", h = 0;
            }
            return e;
        }
        var l = /(\n)/gi;
        r && (l = /(((((。|\?|？|；|！|\.\.\.)”)|。|！|？|；|\.\.\.|:|;|,|，))\n)/gi);
        var s = "^^^^", g = (new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"), 
        60), u = 36, i = /(((。|\?|？|；|！|\.\.\.)”)|。|！|？|；|\.\.\.)/gi, d = /(,|，)/gi, h = [];
        if (n && console.log(e), o) return h.push({
            canPlay: t(e),
            txt: e,
            text: e,
            startWordIdx: 0,
            totalWords: e.length
        }), h;
        if (e.length) for (var c = e.replace(l, "$1^^^^").split(s), f = "", x = 0, W = c.length; x < W; x++) if ((f = c[x]) && f.length <= g) {
            var p = h[h.length - 1];
            h.push({
                canPlay: t(f),
                txt: f,
                text: f,
                startWordIdx: p ? p.startWordIdx + p.totalWords || p.totalWords + 1 : 0,
                totalWords: f.length
            });
        } else h = a(h, f);
        for (var x = 0, v = h.length; x < v; x++) h[x].index = x;
        return n && console.log("分段：" + JSON.stringify(h)), h;
    },
    titleSplit: function(t, r, n, o) {
        r = r || 5, n = n || 60;
        var a = "", l = "^^^^", s = /(((。|\?|？|；|！|\.\.\.)”)|。|！|？|；|\.\.\.)/gi;
        o && console.log(t);
        var g = (a = e(t) || "").replace(s, "^^^^$1").split(l);
        return g && g.length ? g[0] : a.substr(0, 30);
    },
    wordCupPrefix: function(t, e) {
        var r = new Date(), n = r.getHours(), o = (r.getMonth(), r.getDate(), r.getMinutes(), 
        t || "");
        return o += n >= 12 ? "下午" : "上午", o += "好,我是" + e + "。\n";
    },
    presetPrefix: function(t, e) {
        var r = new Date(), n = r.getHours(), o = (r.getMonth(), r.getDate(), r.getMinutes(), 
        t || "");
        return o += n >= 12 ? "下午" : "上午", o += "好,我是" + e + "。\n";
    },
    newsPrefix: function(t, e) {
        var r = new Date(), n = r.getHours(), o = (r.getMonth(), r.getDate(), r.getMinutes(), 
        t || "");
        return o += n >= 12 ? "下午" : "上午", o += "好,我是" + e + "。\n";
    },
    trim: e,
    canTts: t,
    getLength: function(t) {
        for (var e = 0, r = t.length, n = -1, o = 0; o < r; o++) e += (n = t.charCodeAt(o)) >= 0 && n <= 128 ? 1 : 2;
        return e;
    },
    getMaxLengthStr: function(t, e) {
        if (t = t || "", !e) return t;
        var r = 2 * e, n = 0, o = 0, a = "";
        do {
            var l = t.charCodeAt(n);
            (o += l >= 0 && l <= 128 ? 1 : 2) >= r ? n === t.length - 1 ? a += t.substr(n, 1) : (a += t.substr(n, 1), 
            a += "...") : a += t.substr(n, 1), n++;
        } while (o < r && n <= t.length - 1);
        return a;
    }
};