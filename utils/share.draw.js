require("./constant.js");

module.exports = {
    shareCard: function(e, t, a, n, r, l, s, i) {
        var c = a.windowWidth / 750, o = r.layout && r.layout.canvasHeight || 802, d = r.layout && r.layout.qrcodeTop || 382, x = r.layout && r.layout.qrcodeLeft || 252, C = {
            left: r.layout && r.layout.avatarLeft || 50,
            top: r.layout && r.layout.avatarTop || 666
        };
        e.crendentialsCtx = wx.createCanvasContext(t, e);
        var u = r.cardBgUrl || "";
        e.crendentialsCtx.drawImage(u, -30 * c, -10 * c, 710 * c, (o + 10 + 50) * c), l && (e.crendentialsCtx.save(), 
        e.crendentialsCtx.fillRect(0, 0, 0, 0), e.crendentialsCtx.beginPath(), e.crendentialsCtx.arc((x + 73) * c, (d + 73) * c, 73 * c, 0, 2 * Math.PI, !1), 
        e.crendentialsCtx.clip(), e.crendentialsCtx.drawImage(l, x * c, c * d, 146 * c, 146 * c), 
        e.crendentialsCtx.restore());
        var f = "", g = "";
        r && r.userInfo && r.userInfo.nickName && (f = r.userInfo.nickName || "", g = r.userInfo.nickName || "", 
        f && f.length > 7 && (f = f.substring(0, 6) + "..."));
        var v = "";
        try {
            v = r && r.userInfo && r.userInfo.avatarUrlTemp || wx.getStorageSync(n.globalData.config.lkey.headerurlkey);
        } catch (e) {
            console.error("获取存储头像缓存失败");
        }
        v && (e.crendentialsCtx.save(), e.crendentialsCtx.fillRect(0, 0, 0, 0), e.crendentialsCtx.beginPath(), 
        console.log("share_draw | avatarUrl = " + r.userInfo.avatarUrl), e.crendentialsCtx.arc((C.left + 50) * c, (C.top + 50) * c, 100 * c / 2, 0, 2 * Math.PI, !1), 
        e.crendentialsCtx.clip(), e.crendentialsCtx.drawImage(v, C.left * c, C.top * c, 100 * c, 100 * c), 
        e.crendentialsCtx.restore()), e.crendentialsCtx.setFontSize(32 * c), e.crendentialsCtx.setFillStyle("#333"), 
        e.crendentialsCtx.setTextAlign("left"), e.crendentialsCtx.setTextBaseline("top");
        var y = C.left + 100 + 28, h = C.top + 8;
        g && (e.crendentialsCtx.fillText(g, y * c, h * c), e.crendentialsCtx.fillText(g, y * c, (h + .1) * c), 
        e.crendentialsCtx.fillText(g, y * c, (h + .2) * c), e.crendentialsCtx.fillText(g, y * c, (h + .3) * c));
        var p = (r.speakerNickName || "") + "-" + r.sourceModuleName;
        e.crendentialsCtx.setFontSize(28 * c), e.crendentialsCtx.fillText(p, (y - 8) * c, (h + 32 + 16) * c), 
        e.crendentialsCtx.draw(!1, function() {
            console.log("finished"), s && s();
        });
    }
};