var a = getApp();

Page({
    data: {},
    onLoad: function(a) {},
    goToHome: function(e) {
        a.aldstat.sendEvent("去复刻声音", {
            "用户渠道": a.aldMediaId,
            "所属模块": "产品介绍h5页面",
            "事件来源": "回到首页按钮"
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    }
});