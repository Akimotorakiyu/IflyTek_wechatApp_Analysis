require("./constant.js");

module.exports = {
    shareCard: function(e, t, n, a, r, l, s, i) {
        var c = n.windowWidth / 750, o = r.layout && r.layout.canvasHeight || 804, d = {
            left: 276,
            top: 472
        };
        e.crendentialsCtx = wx.createCanvasContext(t, e);
        var x = r.cardBgUrl || "";
        e.crendentialsCtx.drawImage(x, -30 * c, -10 * c, 710 * c, (o + 10 + 50) * c), l && e.crendentialsCtx.drawImage(l, 450 * c, 656 * c, 128 * c, 128 * c);
        var C = "", f = "";
        r && r.userInfo && r.userInfo.nickName && (C = r.userInfo.nickName || "", f = r.userInfo.nickName || "", 
        C && C.length > 7 && (C = C.substring(0, 6) + "..."));
        var u = "";
        try {
            u = r && r.userInfo && r.userInfo.avatarUrlTemp || wx.getStorageSync(a.globalData.config.lkey.headerurlkey);
        } catch (e) {
            console.error("获取存储头像缓存失败");
        }
        u && (e.crendentialsCtx.save(), e.crendentialsCtx.fillRect(0, 0, 0, 0), e.crendentialsCtx.beginPath(), 
        console.log("share_draw | avatarUrl = " + r.userInfo.avatarUrl), e.crendentialsCtx.arc((d.left + 50) * c, (d.top + 50) * c, 100 * c / 2, 0, 2 * Math.PI, !1), 
        e.crendentialsCtx.clip(), e.crendentialsCtx.drawImage(u, d.left * c, d.top * c, 100 * c, 100 * c), 
        e.crendentialsCtx.restore()), e.crendentialsCtx.setFontSize(24 * c), e.crendentialsCtx.setFillStyle("#333"), 
        e.crendentialsCtx.setTextAlign("center"), e.crendentialsCtx.setTextBaseline("top");
        f && (e.crendentialsCtx.fillText(f, 325 * c, 592 * c), e.crendentialsCtx.fillText(f, 325 * c, 592.1 * c), 
        e.crendentialsCtx.fillText(f, 325 * c, 592.2 * c)), e.crendentialsCtx.draw(!1, function() {
            console.log("finished"), s && s();
        });
    }
};