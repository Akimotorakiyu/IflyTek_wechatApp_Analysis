var a = getApp();

Page({
    data: {
        hiddenEnvModal: !0,
        agreements: !0
    },
    onLoad: function(t) {
        this.taskAdd = function(t) {
            return a.Ajax.request({
                url: a.globalData.config.ifc.taskadd,
                data: t
            });
        }, this.querySamples = function(t) {
            return a.Ajax.request({
                url: a.globalData.config.ifc.traintext,
                data: t
            });
        };
    },
    nextGuide: function(t) {
        var e = this;
        if (this.data.agreements) {
            var n = {
                base: a.globalData.basequery,
                param: {
                    taskType: "1"
                }
            }, o = function() {
                var t = {
                    base: a.globalData.basequery,
                    param: {
                        categoryId: "1001"
                    }
                };
                return e.querySamples(t).then(function(t) {
                    if (wx.hideLoading(), t.trainTexts && t.trainTexts[0]) return a.globalData.recordInfo.textId = t.trainTexts[0].textId, 
                    a.globalData.recordInfo.textSegs = t.trainTexts[0].textSegs, void wx.navigateTo({
                        url: "/pages/voicemake/main/index"
                    });
                    wx.hideLoading(), wx.showToast({
                        title: "获取录音模板失败,请稍后再试",
                        icon: "none",
                        mask: !0
                    });
                }).catch(function(a) {
                    wx.hideLoading(), wx.showToast({
                        title: "获取录音模板失败,请稍后再试",
                        icon: "none",
                        mask: !0
                    });
                });
            };
            wx.showLoading({
                title: "正在加载...",
                mask: !0
            }), e.taskAdd(n).then(function(t) {
                t.taskId ? (a.globalData.recordInfo.taskId = t.taskId, o()) : wx.showToast({
                    title: "获取资源失败,请稍后再试",
                    icon: "none",
                    mask: !0
                });
            }).catch(function(a) {
                console.error(a), wx.hideLoading(), wx.showToast({
                    title: "获取资源失败,请稍后再试",
                    icon: "none",
                    mask: !0
                });
            });
        } else wx.showToast({
            title: "须阅读并同意用户协议",
            icon: "none"
        });
    },
    envConfirm: function(a) {
        this.setData({
            hiddenEnvModal: !0
        });
    },
    agreementsChange: function(a) {
        var t = !1;
        a.detail.value && a.detail.value[0] && (t = !0), this.setData({
            agreements: t
        });
    },
    viewProtacal: function() {
        wx.navigateTo({
            url: "/pages/personal/protocol/index"
        });
    }
});