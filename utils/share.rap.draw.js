require("./constant.js");

module.exports = {
    shareCard: function(e, t, n, a, r, l, c, i) {
        var s = n.windowWidth / 750, d = 0;
        e.crendentialsCtx = wx.createCanvasContext(t, e), e.crendentialsCtx.clearRect(0, 0, 690 * s, 830 * s), 
        e.crendentialsCtx.setFillStyle("#efefef"), e.crendentialsCtx.fillRect(0, d, 690 * s, 830 * s), 
        d = 150 * s;
        var x = r.cardBgUrl || "";
        console.log(x), e.crendentialsCtx.drawImage(x, 0, 0, 690 * s, 830 * s), l && (e.crendentialsCtx.save(), 
        e.crendentialsCtx.fillRect(0, 0, 0, 0), e.crendentialsCtx.beginPath(), e.crendentialsCtx.arc(690 * s / 2, 654 * s, 80 * s, 0, 2 * Math.PI, !1), 
        e.crendentialsCtx.clip(), e.crendentialsCtx.drawImage(l, 265 * s, 574 * s, 160 * s, 160 * s), 
        e.crendentialsCtx.restore());
        e.crendentialsCtx.draw(!1, function() {
            console.log("finished"), c && c();
        });
    }
};