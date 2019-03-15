require("./constant.js");

module.exports = {
    shareCard: function(e, t, n, a, l, r, s, i) {
        console.warn(l);
        var c = n.windowWidth / 750, d = l.layout && l.layout.canvasHeight || 804, x = l.callerName || "", o = l.callerFrom || "";
        e.crendentialsCtx = wx.createCanvasContext(t, e);
        var C = l.cardBgUrl || "";
        e.crendentialsCtx.drawImage(C, 0 * c, 0 * c, 650 * c, d * c), e.crendentialsCtx.setFontSize(60 * c), 
        e.crendentialsCtx.setFillStyle("#fff"), e.crendentialsCtx.setTextAlign("center"), 
        e.crendentialsCtx.setTextBaseline("top");
        x && (e.crendentialsCtx.fillText(x, 650 * c / 2, 80 * c), e.crendentialsCtx.fillText(x, 650 * c / 2, 80.1 * c)), 
        o && (e.crendentialsCtx.setFontSize(38 * c), e.crendentialsCtx.fillText(o, 650 * c / 2, 200 * c)), 
        r && (e.crendentialsCtx.save(), e.crendentialsCtx.drawImage(r, 490 * c, 646 * c, 128 * c, 128 * c), 
        e.crendentialsCtx.restore()), e.crendentialsCtx.draw(!1, function() {
            console.log("finished"), s && s();
        });
    }
};