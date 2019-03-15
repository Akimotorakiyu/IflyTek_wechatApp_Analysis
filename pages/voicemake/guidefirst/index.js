var e = getApp();

Page({
    data: {},
    onLoad: function(e) {
        this.fromcode = "code" === e.chancefrom;
    },
    nextGuide: function(a) {
        var t = this;
        e.aldstat.sendEvent("引导页面1-下一步", {
            "用户渠道": e.aldMediaId,
            "来源": t.fromcode ? "邀请码" : ""
        }), wx.navigateTo({
            url: "/pages/voicemake/guidesecond/index"
        });
    },
    toProduct: function(a) {
        e.aldstat.sendEvent("查看教程", {
            "用户渠道": e.aldMediaId,
            "事件来源": "引导页1"
        }), wx.navigateTo({
            url: "/pages/activity/product/index"
        });
    }
});