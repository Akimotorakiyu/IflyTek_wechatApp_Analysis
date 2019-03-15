module.exports = {
    credentialsCard: function(e, t, n, l, i) {
        var a = n.windowWidth / 750, r = 630 * a, s = 0;
        if (e.crendentialsCtx = wx.createCanvasContext(t, this), e.crendentialsCtx.fillRect(0, 114 * a, r, 738 * a), 
        e.crendentialsCtx.setFillStyle("white"), e.crendentialsCtx.fillRect(0, 0, r, 751 * a), 
        s = 94, e.crendentialsCtx.drawImage(i.images.headerBgUrl, 0, -20 * a, r, 302 * a), 
        e.crendentialsCtx.drawImage(i.images.headerLogoUrl, 183 * a, 0, 254 * a, 188 * a), 
        s += 94, i.userInfo && i.userInfo.nickName) {
            var c = i.userInfo.nickName;
            c.length > 7 && (c = c.substr(0, 7) + "..."), e.crendentialsCtx.restore(), e.crendentialsCtx.setFillStyle("#fff"), 
            e.crendentialsCtx.setFontSize(27 * a), e.crendentialsCtx.setTextAlign("left"), e.crendentialsCtx.setTextBaseline("top"), 
            e.crendentialsCtx.fillText((c || "") + ", 恭喜你!", 260 * a, a * (s + 30));
        }
        e.crendentialsCtx.setFillStyle("#4891ff"), e.crendentialsCtx.setFontSize(24 * a), 
        e.crendentialsCtx.setTextAlign("center"), e.crendentialsCtx.setTextBaseline("top");
        e.crendentialsCtx.measureText("我的声音");
        s = 312;
        var d = decodeURIComponent(i.voiceName) || "";
        e.crendentialsCtx.fillText("复刻的声音“" + d + "”", r / 2, a * s), s += 36, e.crendentialsCtx.fillText("获得全球声音证书", r / 2, a * s), 
        s += 82, e.crendentialsCtx.setFontSize(30 * a);
        var x = e.crendentialsCtx.measureText("全球声音ID");
        e.crendentialsCtx.setFillStyle("#4891ff"), e.crendentialsCtx.fillText("全球声音ID", r / 2, a * (s - 24)), 
        i.voiceId && (e.crendentialsCtx.setFillStyle("#4891ff"), e.crendentialsCtx.setFontSize(20 * a), 
        e.crendentialsCtx.measureText("NO." + (i.voiceId || "").toUpperCase()), e.crendentialsCtx.fillText("NO." + (i.voiceId || "").toUpperCase(), r / 2, a * (s + 32)));
        e.crendentialsCtx.setLineWidth(2 * a), e.crendentialsCtx.setStrokeStyle("#4891ff"), 
        e.crendentialsCtx.moveTo(r / 2 + x.width / n.pixelRatio + 30 * a, a * s), e.crendentialsCtx.lineTo(r - 66 * a, a * s), 
        e.crendentialsCtx.moveTo(66 * a, a * s), e.crendentialsCtx.lineTo(r / 2 - x.width / n.pixelRatio - 30 * a, a * s), 
        e.crendentialsCtx.stroke(), e.crendentialsCtx.beginPath(), e.crendentialsCtx.arc(r - 66 * a, a * (s + 45), 45 * a, 1.5 * Math.PI, .5 * Math.PI), 
        e.crendentialsCtx.arc(66 * a, a * (s + 45), 45 * a, .5 * Math.PI, 1.5 * Math.PI), 
        e.crendentialsCtx.setStrokeStyle("#4891ff"), e.crendentialsCtx.stroke(), e.crendentialsCtx.moveTo(r - 66 * a, a * (s + 90)), 
        e.crendentialsCtx.lineTo(66 * a, a * (s + 90)), e.crendentialsCtx.stroke(), s += 90, 
        s = 540, e.crendentialsCtx.drawImage(i.images.cardCodeUrl, r / 2 - 58 * a, a * s, 116 * a, 116 * a);
        var C = "";
        try {
            C = wx.getStorageSync(l.Config.lkey.headerurlkey);
        } catch (e) {
            console.error("获取存储头像缓存失败");
        }
        C && (e.crendentialsCtx.save(), e.crendentialsCtx.fillRect(0, 0, 0, 0), e.crendentialsCtx.beginPath(), 
        e.crendentialsCtx.arc(190 * a, 230 * a, 40 * a, 0, 2 * Math.PI, !1), e.crendentialsCtx.clip(), 
        e.crendentialsCtx.drawImage(C, 150 * a, 190 * a, 80 * a, 80 * a), e.crendentialsCtx.restore()), 
        s += 138, e.crendentialsCtx.setFontSize(20 * a), e.crendentialsCtx.setFillStyle("#999999"), 
        e.crendentialsCtx.setTextAlign("center"), e.crendentialsCtx.fillText("长按小程序码进入讯飞留声Lite复刻声音", r / 2, a * s), 
        e.crendentialsCtx.draw();
    }
};