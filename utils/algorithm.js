Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.md5 = function() {
    var r = function(r, n) {
        return r << n | r >>> 32 - n;
    }, n = function(r, n) {
        var t, e, o, a, c;
        return o = 2147483648 & r, a = 2147483648 & n, t = 1073741824 & r, e = 1073741824 & n, 
        c = (1073741823 & r) + (1073741823 & n), t & e ? 2147483648 ^ c ^ o ^ a : t | e ? 1073741824 & c ? 3221225472 ^ c ^ o ^ a : 1073741824 ^ c ^ o ^ a : c ^ o ^ a;
    }, t = function(r, n, t) {
        return r & n | ~r & t;
    }, e = function(r, n, t) {
        return r & t | n & ~t;
    }, o = function(r, n, t) {
        return r ^ n ^ t;
    }, a = function(r, n, t) {
        return n ^ (r | ~t);
    }, c = function(e, o, a, c, f, i, C) {
        return e = n(e, n(n(t(o, a, c), f), C)), n(r(e, i), o);
    }, f = function(t, o, a, c, f, i, C) {
        return t = n(t, n(n(e(o, a, c), f), C)), n(r(t, i), o);
    }, i = function(t, e, a, c, f, i, C) {
        return t = n(t, n(n(o(e, a, c), f), C)), n(r(t, i), e);
    }, C = function(t, e, o, c, f, i, C) {
        return t = n(t, n(n(a(e, o, c), f), C)), n(r(t, i), e);
    }, h = function(r) {
        for (var n, t = r.length, e = t + 8, o = 16 * ((e - e % 64) / 64 + 1), a = Array(o - 1), c = 0, f = 0; f < t; ) c = f % 4 * 8, 
        a[n = (f - f % 4) / 4] = a[n] | r.charCodeAt(f) << c, f++;
        return n = (f - f % 4) / 4, c = f % 4 * 8, a[n] = a[n] | 128 << c, a[o - 2] = t << 3, 
        a[o - 1] = t >>> 29, a;
    }, u = function(r) {
        var n, t = "", e = "";
        for (n = 0; n <= 3; n++) t += (e = "0" + (r >>> 8 * n & 255).toString(16)).substr(e.length - 2, 2);
        return t;
    }, d = function(r) {
        r = (r = r || 0 === r ? r + "" : "").replace(/\x0d\x0a/g, "\n");
        for (var n = "", t = 0; t < r.length; t++) {
            var e = r.charCodeAt(t);
            e < 128 ? n += String.fromCharCode(e) : e > 127 && e < 2048 ? (n += String.fromCharCode(e >> 6 | 192), 
            n += String.fromCharCode(63 & e | 128)) : (n += String.fromCharCode(e >> 12 | 224), 
            n += String.fromCharCode(e >> 6 & 63 | 128), n += String.fromCharCode(63 & e | 128));
        }
        return n;
    };
    return function(r) {
        var t, e, o, a, g, A, m, S, s, v = Array();
        for (r = d(r), v = h(r), A = 1732584193, m = 4023233417, S = 2562383102, s = 271733878, 
        t = 0; t < v.length; t += 16) e = A, o = m, a = S, g = s, A = c(A, m, S, s, v[t + 0], 7, 3614090360), 
        s = c(s, A, m, S, v[t + 1], 12, 3905402710), S = c(S, s, A, m, v[t + 2], 17, 606105819), 
        m = c(m, S, s, A, v[t + 3], 22, 3250441966), A = c(A, m, S, s, v[t + 4], 7, 4118548399), 
        s = c(s, A, m, S, v[t + 5], 12, 1200080426), S = c(S, s, A, m, v[t + 6], 17, 2821735955), 
        m = c(m, S, s, A, v[t + 7], 22, 4249261313), A = c(A, m, S, s, v[t + 8], 7, 1770035416), 
        s = c(s, A, m, S, v[t + 9], 12, 2336552879), S = c(S, s, A, m, v[t + 10], 17, 4294925233), 
        m = c(m, S, s, A, v[t + 11], 22, 2304563134), A = c(A, m, S, s, v[t + 12], 7, 1804603682), 
        s = c(s, A, m, S, v[t + 13], 12, 4254626195), S = c(S, s, A, m, v[t + 14], 17, 2792965006), 
        m = c(m, S, s, A, v[t + 15], 22, 1236535329), A = f(A, m, S, s, v[t + 1], 5, 4129170786), 
        s = f(s, A, m, S, v[t + 6], 9, 3225465664), S = f(S, s, A, m, v[t + 11], 14, 643717713), 
        m = f(m, S, s, A, v[t + 0], 20, 3921069994), A = f(A, m, S, s, v[t + 5], 5, 3593408605), 
        s = f(s, A, m, S, v[t + 10], 9, 38016083), S = f(S, s, A, m, v[t + 15], 14, 3634488961), 
        m = f(m, S, s, A, v[t + 4], 20, 3889429448), A = f(A, m, S, s, v[t + 9], 5, 568446438), 
        s = f(s, A, m, S, v[t + 14], 9, 3275163606), S = f(S, s, A, m, v[t + 3], 14, 4107603335), 
        m = f(m, S, s, A, v[t + 8], 20, 1163531501), A = f(A, m, S, s, v[t + 13], 5, 2850285829), 
        s = f(s, A, m, S, v[t + 2], 9, 4243563512), S = f(S, s, A, m, v[t + 7], 14, 1735328473), 
        m = f(m, S, s, A, v[t + 12], 20, 2368359562), A = i(A, m, S, s, v[t + 5], 4, 4294588738), 
        s = i(s, A, m, S, v[t + 8], 11, 2272392833), S = i(S, s, A, m, v[t + 11], 16, 1839030562), 
        m = i(m, S, s, A, v[t + 14], 23, 4259657740), A = i(A, m, S, s, v[t + 1], 4, 2763975236), 
        s = i(s, A, m, S, v[t + 4], 11, 1272893353), S = i(S, s, A, m, v[t + 7], 16, 4139469664), 
        m = i(m, S, s, A, v[t + 10], 23, 3200236656), A = i(A, m, S, s, v[t + 13], 4, 681279174), 
        s = i(s, A, m, S, v[t + 0], 11, 3936430074), S = i(S, s, A, m, v[t + 3], 16, 3572445317), 
        m = i(m, S, s, A, v[t + 6], 23, 76029189), A = i(A, m, S, s, v[t + 9], 4, 3654602809), 
        s = i(s, A, m, S, v[t + 12], 11, 3873151461), S = i(S, s, A, m, v[t + 15], 16, 530742520), 
        m = i(m, S, s, A, v[t + 2], 23, 3299628645), A = C(A, m, S, s, v[t + 0], 6, 4096336452), 
        s = C(s, A, m, S, v[t + 7], 10, 1126891415), S = C(S, s, A, m, v[t + 14], 15, 2878612391), 
        m = C(m, S, s, A, v[t + 5], 21, 4237533241), A = C(A, m, S, s, v[t + 12], 6, 1700485571), 
        s = C(s, A, m, S, v[t + 3], 10, 2399980690), S = C(S, s, A, m, v[t + 10], 15, 4293915773), 
        m = C(m, S, s, A, v[t + 1], 21, 2240044497), A = C(A, m, S, s, v[t + 8], 6, 1873313359), 
        s = C(s, A, m, S, v[t + 15], 10, 4264355552), S = C(S, s, A, m, v[t + 6], 15, 2734768916), 
        m = C(m, S, s, A, v[t + 13], 21, 1309151649), A = C(A, m, S, s, v[t + 4], 6, 4149444226), 
        s = C(s, A, m, S, v[t + 11], 10, 3174756917), S = C(S, s, A, m, v[t + 2], 15, 718787259), 
        m = C(m, S, s, A, v[t + 9], 21, 3951481745), A = n(A, e), m = n(m, o), S = n(S, a), 
        s = n(s, g);
        return (u(A) + u(m) + u(S) + u(s)).toLowerCase();
    };
}(), exports.base64 = new function() {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = function(r) {
        r = r.replace(/\r\n/g, "\n");
        for (var n = "", t = 0; t < r.length; t++) {
            var e = r.charCodeAt(t);
            e < 128 ? n += String.fromCharCode(e) : e > 127 && e < 2048 ? (n += String.fromCharCode(e >> 6 | 192), 
            n += String.fromCharCode(63 & e | 128)) : (n += String.fromCharCode(e >> 12 | 224), 
            n += String.fromCharCode(e >> 6 & 63 | 128), n += String.fromCharCode(63 & e | 128));
        }
        return n;
    }, t = function(r) {
        for (var n = "", t = 0, e = c1 = c2 = 0; t < r.length; ) (e = r.charCodeAt(t)) < 128 ? (n += String.fromCharCode(e), 
        t++) : e > 191 && e < 224 ? (c2 = r.charCodeAt(t + 1), n += String.fromCharCode((31 & e) << 6 | 63 & c2), 
        t += 2) : (c2 = r.charCodeAt(t + 1), c3 = r.charCodeAt(t + 2), n += String.fromCharCode((15 & e) << 12 | (63 & c2) << 6 | 63 & c3), 
        t += 3);
        return n;
    };
    this.encode = function(t) {
        var e, o, a, c, f, i, C, h = "", u = 0;
        for (t = n(t = t || 0 === t ? t + "" : ""); u < t.length; ) c = (e = t.charCodeAt(u++)) >> 2, 
        f = (3 & e) << 4 | (o = t.charCodeAt(u++)) >> 4, i = (15 & o) << 2 | (a = t.charCodeAt(u++)) >> 6, 
        C = 63 & a, isNaN(o) ? i = C = 64 : isNaN(a) && (C = 64), h = h + r.charAt(c) + r.charAt(f) + r.charAt(i) + r.charAt(C);
        return h;
    }, this.decode = function(n) {
        var e, o, a, c, f, i, C = "", h = 0;
        for (n = (n = n || 0 === n ? n + "" : "").replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < n.length; ) e = r.indexOf(n.charAt(h++)) << 2 | (c = r.indexOf(n.charAt(h++))) >> 4, 
        o = (15 & c) << 4 | (f = r.indexOf(n.charAt(h++))) >> 2, a = (3 & f) << 6 | (i = r.indexOf(n.charAt(h++))), 
        C += String.fromCharCode(e), 64 != f && (C += String.fromCharCode(o)), 64 != i && (C += String.fromCharCode(a));
        return C = t(C);
    };
}();