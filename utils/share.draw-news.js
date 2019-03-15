require("./constant.js");

var t = function(t) {
    for (var e = 0, n = t.length, a = -1, l = 0; l < n; l++) e += (a = t.charCodeAt(l)) >= 0 && a <= 128 ? 1 : 2;
    return e;
}, e = function(e, n) {
    var a = n || 14, l = [];
    if (e) for (var r = e.replace(/(\n|\r)+/g, "~~~").split(/~~~/), s = 0; s < r.length && l.length <= a; s++) {
        var i = r[s], o = "";
        if (i.length <= 21) l.push(i); else for (var c = 0; i.length > 0 && l.length <= a; c++) {
            o = i.substr(0, 21), i = i.substr(21);
            var d = t(o);
            if (d >= 42) l.push(o); else {
                do {
                    if (i.length) {
                        var u = i.charCodeAt(0);
                        d += u >= 0 && u <= 128 ? 1 : 2, o += i.substr(0, 1), i = i.substr(1);
                    }
                } while (d < 42 && i.length);
                l.push(o);
            }
        }
    }
    return l;
};

module.exports = {
    shareCard: function(t, n, a, l, r, s, i, o) {
        var c = a.windowWidth / 750, d = r.layout && r.layout.canvasHeight || 802, u = r.layout && r.layout.qrcodeTop || 382, x = r.layout && r.layout.qrcodeLeft || 197, C = r.layout && r.layout.content || null, f = (r.layout && r.layout.avatarLeft, 
        r.layout && r.layout.avatarTop, r.layout && r.layout.contentTextTop || 226);
        t.crendentialsCtx = wx.createCanvasContext(n, t);
        var h = r.cardBgUrl || "";
        if (t.crendentialsCtx.drawImage(h, 55 * c, 0, 540 * c, d * c), C) {
            var g = e(C, 16);
            console.log("绘制的段落文本", g), t.crendentialsCtx.setFontSize(20 * c), t.crendentialsCtx.setFillStyle("#EFF4FF"), 
            t.crendentialsCtx.setTextAlign("left"), t.crendentialsCtx.setTextBaseline("top");
            for (var v = 0, y = g.length; v < y && v < 15; v++) t.crendentialsCtx.fillText(g[v] || " ", 115 * c, (f + 13 * v + 20 * v) * c), 
            14 == v && (y <= 16 ? t.crendentialsCtx.fillText(g[v + 1] || " ", 115 * c, (f + 13 * (v + 1) + 20 * (v + 1)) * c) : (t.crendentialsCtx.setTextAlign("center"), 
            t.crendentialsCtx.fillText("......", 650 * c / 2, (f + 13 * (v + 1) + 20 * (v + 1) - 6) * c)));
            t.crendentialsCtx.setTextAlign("left");
        }
        s && (t.crendentialsCtx.save(), t.crendentialsCtx.fillRect(0, 0, 0, 0), t.crendentialsCtx.beginPath(), 
        t.crendentialsCtx.arc((x + 64 + 55) * c, (u + 64) * c, 64 * c, 0, 2 * Math.PI, !1), 
        t.crendentialsCtx.clip(), t.crendentialsCtx.drawImage(s, (x + 55) * c, c * u, 128 * c, 128 * c), 
        t.crendentialsCtx.restore()), t.crendentialsCtx.draw(!1, function() {
            console.log("news share pic finished"), i && i();
        });
    }
};