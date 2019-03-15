var t = getApp(), a = require("../../../utils/text.split.js");

Page({
    data: {
        phone: "",
        validCode: "",
        validCodeStatus: 0,
        countdown: 0,
        disabled: !0,
        voiceName: ""
    },
    onUnload: function(t) {},
    onLoad: function(e) {
        var o = this;
        t.Stats.register(2, "0"), this.setData({
            voiceName: decodeURIComponent(e.voiceName || "")
        }), this.uploadConfirmDialog = this.selectComponent("#uploadConfirm"), e.uploadConfirm && this.uploadConfirmDialog.showModal(), 
        this.startCountdown = function(t) {
            t && o.setData({
                countdown: t
            });
            var a = o.data.countdown || 0;
            a ? (t === a ? o.setData({
                validCodeStatus: 1
            }) : (a--, o.setData({
                validCodeStatus: 1,
                countdown: a
            })), a >= 1 ? setTimeout(function() {
                o.startCountdown();
            }, 1e3) : o.setData({
                validCodeStatus: 0,
                countdown: 0
            })) : o.setData({
                validCodeStatus: 0,
                countdown: 0
            });
        }, this.enableSubmit = function() {
            a.trim(o.data.phone) && a.trim(o.data.validCode) ? o.data.disabled && o.setData({
                disabled: !1
            }) : o.data.disabled || o.setData({
                disabled: !0
            });
        }, this.submitVoice = function() {
            if (t.globalData.submitVoiceNameParam) {
                var a = t.globalData.submitVoiceNameParam;
                o.getVoiceChangeTaskId().then(function(e) {
                    t.Ajax.request({
                        url: t.globalData.config.ifc.taskstart,
                        data: a || {}
                    }, {}, {
                        title: "提交中..."
                    }).then(function(a) {
                        t.globalData.submitVoiceNameParam = null, t.manageProgress("clear"), t.globalData.recordInfo = {}, 
                        wx.showToast({
                            title: "提交成功",
                            duration: 1500
                        }), t.Stats.submit_namevoice("1"), t.aldstat.sendEvent("[制作提交页]完成命名", {
                            "用户渠道": t.aldMediaId
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "/pages/personal/voice/voice?from=trainrecord"
                            });
                        }, 1e3);
                    }).catch(function(t) {
                        wx.showToast({
                            title: "提交声音训练失败，请稍后再试",
                            icon: "none",
                            mask: !0
                        });
                    });
                }).catch(function(t) {
                    wx.showToast({
                        title: "提交声音训练失败，请稍后再试",
                        icon: "none",
                        mask: !0
                    });
                });
            } else wx.showToast({
                title: "提交声音数据异常，请稍后再试",
                icon: "none"
            });
        };
    },
    getVoiceChangeTaskId: function() {
        return Promise.resolve("");
    },
    phoneInput: function(t) {
        this.setData({
            phone: t.detail.value
        }), this.enableSubmit();
    },
    codeInput: function(t) {
        this.setData({
            validCode: t.detail.value
        }), this.enableSubmit();
    },
    getValidateCode: function(e) {
        var o = this, i = a.trim(o.data.phone);
        if (i) {
            var n = {
                base: t.globalData.basequery,
                param: {
                    mobile: i
                }
            };
            t.Ajax.request({
                url: t.globalData.config.ifc.validcode,
                data: n || {}
            }, {}).then(function(a) {
                o.startCountdown(t.globalData.config.dataCfg.validCodeCountDownMax);
            }).catch(function(t) {
                wx.showToast({
                    title: "获取验证码异常,请稍后再试",
                    icon: "none",
                    mask: !0
                });
            });
        } else wx.showToast({
            title: "请输入合法的手机号",
            icon: "none",
            mask: !0
        });
    },
    bindPhone: function(e) {
        var o = this;
        if (t.isMobildBind()) o.submitVoice(); else {
            var i = a.trim(o.data.phone), n = a.trim(this.data.validCode);
            if (!i) return void wx.showToast({
                title: "请输入合法的手机号",
                icon: "none",
                mask: !0
            });
            if (!n) return void wx.showToast({
                title: "请输入合法的验证码",
                icon: "none",
                mask: !0
            });
            var s = {
                base: t.globalData.basequery,
                param: {
                    code: n,
                    mobile: i
                }
            };
            t.aldstat.sendEvent("[制作提交页]手机号绑定", {
                "用户渠道": t.aldMediaId,
                "手机号来源": "手动输入"
            }), t.Ajax.request({
                url: t.globalData.config.ifc.bindphone,
                data: s || {}
            }, {}, {
                title: "提交中..."
            }).then(function(a) {
                t.Stats.register(1, "0"), t.globalData.userInfo && (t.globalData.userInfo.userMobile = i), 
                t.updateUserInfo("save", {
                    userMobile: i
                }), o.submitVoice();
            }).catch(function(t) {
                var a = "绑定手机号失败,请稍后再试";
                t && t.base && "200016" === t.base.retCode && (a = t.base.desc || "验证码错误"), wx.showToast({
                    title: a,
                    icon: "none",
                    mask: !0
                });
            });
        }
    },
    iknown: function() {
        console.log("I Known");
    }
});