var e = getApp();

Page({
    data: {
        voiceNum: 0,
        historyNum: 0,
        nickName: "微信登录",
        userPicture: "../../../images/personal/avatar-default.png",
        hasUser: !1
    },
    onLoad: function(e) {
        console.log("personal_index | onLoad()");
    },
    onReady: function() {},
    onShow: function() {
        console.log("personal_index | onShow()"), this.getUserInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "AI复刻的声音为你播报",
            path: "/pages/index/index"
        };
    },
    getUserInfo: function() {
        var o = this;
        e.Login.getUserInfo(e, function() {
            console.log("获取用户信息");
            var t = e.globalData.userInfo;
            o.setData({
                hasUser: !0,
                nickName: t.nickName,
                userPicture: t.avatarUrl || o.data.userPicture
            }), o.getListenHistory(), o.getUserVoice();
        }, function() {
            console.log("尚未授权");
        }, function() {
            console.warn("获取用户信息失败"), wx.showToast({
                title: "用户信息异常",
                icon: "none"
            });
        }, !0);
    },
    getUserVoice: function() {
        var o = this, t = {
            base: e.globalData.basequery,
            param: {
                offset: 0,
                count: 10,
                isNeedTotal: !0,
                voiceType: "1"
            }
        };
        e.Ajax.request({
            url: e.globalData.config.ifc.uservoice,
            data: t || {}
        }, {}).then(function(e) {
            console.log("getUserVoice | resp = ", e), o.setData({
                voiceNum: e.total
            });
        }).catch(function(e) {
            console.log("getUserVoice | err = ", e), o.setData({
                voiceNum: 0
            });
        });
    },
    getListenHistory: function() {
        var o = this, t = {
            base: e.globalData.basequery,
            param: {
                offset: 0,
                count: 10,
                isNeedTotal: !0
            }
        };
        e.Ajax.request({
            url: e.globalData.config.ifc.listenhistory,
            data: t || {}
        }, {}).then(function(e) {
            console.log("getListenHistory | resp = ", e), o.setData({
                historyNum: e.total
            });
        }).catch(function(e) {
            console.log("getListenHistory | err = ", e), o.setData({
                historyNum: 0
            });
        });
    }
});