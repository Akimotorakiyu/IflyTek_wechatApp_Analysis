var r = require("./es6-promise.min.js");

Date.prototype.format = function(r) {
    var t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(r) && (r = r.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var e in t) new RegExp("(" + e + ")").test(r) && (r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? t[e] : ("00" + t[e]).substr(("" + t[e]).length)));
    return r;
};

var t = function(r) {
    return (r = r.toString())[1] ? r : "0" + r;
};

(function() {
    var r = function(r, t) {
        return r << t | r >>> 32 - t;
    }, t = function(r, t) {
        var e, n, o, a, i;
        return o = 2147483648 & r, a = 2147483648 & t, e = 1073741824 & r, n = 1073741824 & t, 
        i = (1073741823 & r) + (1073741823 & t), e & n ? 2147483648 ^ i ^ o ^ a : e | n ? 1073741824 & i ? 3221225472 ^ i ^ o ^ a : 1073741824 ^ i ^ o ^ a : i ^ o ^ a;
    }, e = function(r, t, e) {
        return r & t | ~r & e;
    }, n = function(r, t, e) {
        return r & e | t & ~e;
    }, o = function(r, t, e) {
        return r ^ t ^ e;
    }, a = function(r, t, e) {
        return t ^ (r | ~e);
    }, i = function(n, o, a, i, c, h, f) {
        return n = t(n, t(t(e(o, a, i), c), f)), t(r(n, h), o);
    }, c = function(e, o, a, i, c, h, f) {
        return e = t(e, t(t(n(o, a, i), c), f)), t(r(e, h), o);
    }, h = function(e, n, a, i, c, h, f) {
        return e = t(e, t(t(o(n, a, i), c), f)), t(r(e, h), n);
    }, f = function(e, n, o, i, c, h, f) {
        return e = t(e, t(t(a(n, o, i), c), f)), t(r(e, h), n);
    }, u = function(r) {
        for (var t, e = r.length, n = e + 8, o = 16 * ((n - n % 64) / 64 + 1), a = Array(o - 1), i = 0, c = 0; c < e; ) i = c % 4 * 8, 
        a[t = (c - c % 4) / 4] = a[t] | r.charCodeAt(c) << i, c++;
        return t = (c - c % 4) / 4, i = c % 4 * 8, a[t] = a[t] | 128 << i, a[o - 2] = e << 3, 
        a[o - 1] = e >>> 29, a;
    }, g = function(r) {
        var t, e = "", n = "";
        for (t = 0; t <= 3; t++) e += (n = "0" + (r >>> 8 * t & 255).toString(16)).substr(n.length - 2, 2);
        return e;
    }, d = function(r) {
        r = (r = r || 0 === r ? r + "" : "").replace(/\x0d\x0a/g, "\n");
        for (var t = "", e = 0; e < r.length; e++) {
            var n = r.charCodeAt(e);
            n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), 
            t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), 
            t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
        }
        return t;
    };
})(), new function() {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", t = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var t = "", e = 0; e < r.length; e++) {
            var n = r.charCodeAt(e);
            n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), 
            t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), 
            t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
        }
        return t;
    }, e = function(r) {
        for (var t = "", e = 0, n = c1 = c2 = 0; e < r.length; ) (n = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(n), 
        e++) : n > 191 && n < 224 ? (c2 = r.charCodeAt(e + 1), t += String.fromCharCode((31 & n) << 6 | 63 & c2), 
        e += 2) : (c2 = r.charCodeAt(e + 1), c3 = r.charCodeAt(e + 2), t += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3), 
        e += 3);
        return t;
    };
    this.encode = function(e) {
        var n, o, a, i, c, h, f, u = "", g = 0;
        for (e = t(e = e || 0 === e ? e + "" : ""); g < e.length; ) i = (n = e.charCodeAt(g++)) >> 2, 
        c = (3 & n) << 4 | (o = e.charCodeAt(g++)) >> 4, h = (15 & o) << 2 | (a = e.charCodeAt(g++)) >> 6, 
        f = 63 & a, isNaN(o) ? h = f = 64 : isNaN(a) && (f = 64), u = u + r.charAt(i) + r.charAt(c) + r.charAt(h) + r.charAt(f);
        return u;
    }, this.decode = function(t) {
        var n, o, a, i, c, h, f = "", u = 0;
        for (t = (t = t || 0 === t ? t + "" : "").replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < t.length; ) n = r.indexOf(t.charAt(u++)) << 2 | (i = r.indexOf(t.charAt(u++))) >> 4, 
        o = (15 & i) << 4 | (c = r.indexOf(t.charAt(u++))) >> 2, a = (3 & c) << 6 | (h = r.indexOf(t.charAt(u++))), 
        f += String.fromCharCode(n), 64 != c && (f += String.fromCharCode(o)), 64 != h && (f += String.fromCharCode(a));
        return f = e(f);
    };
}();

module.exports = {
    formatTime: function(r) {
        var e = r.getFullYear(), n = r.getMonth() + 1, o = r.getDate(), a = r.getHours(), i = r.getMinutes(), c = r.getSeconds();
        return [ e, n, o ].map(t).join("/") + " " + [ a, i, c ].map(t).join(":");
    },
    formatSecond: function(r) {
        return r >= 3600 ? [ parseInt(r / 60 / 60), Math.floor(r / 60) % 60, r % 60 ].join(":").replace(/\b(\d)\b/g, "0$1") : [ Math.floor(r / 60), r % 60 ].join(":").replace(/\b(\d)\b/g, "0$1");
    },
    Promise: r,
    parseLyric: function(r) {
        for (var t = r.split("\n"), e = /\[\d{2}:\d{2}.\d{2}\]/, n = [], o = 0, o = 0; o < t.length; o++) e.test(t[o]) || t.splice(o, 1);
        return 0 === t[t.length - 1].length && t.pop(), t.forEach(function(r, t, o) {
            var a = r.match(e), i = r.replace(e, "");
            a.forEach(function(r, t, e) {
                var o = r.slice(1, -1).split(":");
                n.push([ 60 * parseInt(o[0], 10) + parseFloat(o[1]), i ]);
            });
        }), n.sort(function(r, t) {
            return r[0] - t[0];
        }), n;
    }
};