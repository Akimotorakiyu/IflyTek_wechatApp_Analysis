var a = getApp(), e = require("../../../utils/text.split.js"), t = "关注‘讯飞留声’公众号，即可获取邀请码";

Page({
    data: {
        inviteCode: "4974510307",
        disabled: !0,
        placeholderTxt: t
    },
    onLoad: function(t) {
        var i = this, s = a.getProgress();
        s && s.currentIdx ? this.hasUnCompleteTask = !0 : this.hasUnCompleteTask = !1, s && s.completeItemLength >= a.globalData.config.dataCfg.recordNumber && (this.hasAllComplete = !0), 
        this.enableSubmit = function() {
            e.trim(i.data.inviteCode) ? i.data.disabled && i.setData({
                disabled: !1
            }) : i.data.disabled || i.setData({
                disabled: !0
            });
        }, this.jumpMaker = function() {
            if (i.hasUnCompleteTask) {
                if (!i.hasAllComplete) {
                    var e = {
                        base: a.globalData.basequery,
                        param: {
                            portal: "4"
                        }
                    };
                    return i.querySamples(e).then(function(e) {
                        e.samples && e.samples[0] && (a.globalData.recordInfo.sampleId = e.samples[0].sampleId, 
                        a.globalData.recordInfo.samples = e.samples[0].subSamples, wx.navigateTo({
                            url: "/pages/voicemake/main/index"
                        }));
                    }).catch(function(a) {
                        wx.showToast({
                            title: "数据加载异常,请稍后再试",
                            icon: "none"
                        });
                    });
                }
                wx.navigateTo({
                    url: "/pages/voicemake/submit/index"
                });
            } else a.globalData.userInfo && a.globalData.userInfo.phone, wx.navigateTo({
                url: "/pages/voicemake/guidefirst/index"
            });
        };
    },
    onFocus: function() {
        this.setData({
            placeholderTxt: " "
        });
    },
    onBlur: function() {
        this.setData({
            placeholderTxt: t
        });
    },
    inviteCodeInput: function(a) {
        var e = this;
        e.setData({
            inviteCode: a.detail.value
        }), e.enableSubmit();
    },
    bindInviteCode: function(t) {
        var i = e.trim(this.data.inviteCode);
        if (i) if (i) {
            var s = {
                base: a.globalData.basequery,
                param: {
                    invitationCode: i
                }
            };
            a.Ajax.request({
                url: a.globalData.config.ifc.bindinvitecode,
                data: s || {}
            }, {}).then(function(e) {
                a.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
                    "用户渠道": a.aldMediaId,
                    "机会来源": "输入邀请码",
                    "是否继续": "新做"
                }), a.Stats.start_makevoice("code"), a.isMobildBind(), wx.navigateTo({
                    url: "/pages/voicemake/guidefirst/index?chancefrom=code"
                });
            }).catch(function(a) {
                var e = "绑定邀请码失败,请稍后再试";
                a && a.base && "200004" === a.base.retCode && (e = "邀请码失效"), wx.showToast({
                    title: e,
                    icon: "none",
                    mask: !0
                });
            });
        } else wx.showToast({
            title: "请输入合法的邀请码",
            icon: "none",
            mask: !0
        });
    }
});