var e = getApp(), o = require("../../../utils/text.split.js");

Page({
    data: {
        voiceName: ""
    },
    onUnload: function(e) {
        this.submitRedirect || wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function(t) {
        var a = this;
        this.confirmUploadModal = this.selectComponent("#uploadConfirm"), this.submitVoiceReq = function(o) {
            a.getVoiceChangeTaskId().then(function(t) {
                e.Ajax.request({
                    url: e.globalData.config.ifc.taskstart,
                    data: o || {}
                }, {}, {
                    title: "提交中..."
                }).then(function(o) {
                    a.submitRedirect = !0, e.manageProgress("clear"), e.globalData.recordInfo = {}, 
                    wx.showToast({
                        title: "提交成功",
                        duration: 1500
                    }), e.Stats.submit_namevoice("1"), e.aldstat.sendEvent("[制作提交页]完成命名", {
                        "用户渠道": e.aldMediaId
                    }), setTimeout(function() {
                        wx.redirectTo({
                            url: "/pages/personal/voice/voice?from=trainrecord"
                        });
                    }, 1500);
                }).catch(function(e) {
                    wx.showToast({
                        title: "提交声音训练失败，请稍后再试",
                        icon: "none",
                        mask: !0
                    });
                });
            }).catch(function(e) {
                wx.showToast({
                    title: "提交声音训练失败，请稍后再试",
                    icon: "none",
                    mask: !0
                });
            });
        }, this.submitVoice = function(t) {
            var i = {
                base: e.globalData.basequery,
                param: {
                    name: o.trim(a.data.voiceName),
                    task: [ {
                        taskType: "1",
                        taskId: e.globalData.recordInfo.taskId
                    } ],
                    trainNoticeId: t,
                    noticeId: t
                }
            };
            e.isMobildBind() ? a.submitVoiceReq(i) : (a.submitRedirect = !0, e.globalData.submitVoiceNameParam = i, 
            wx.showLoading({
                title: "手机号检测中"
            }), wx.login({
                timeout: 3e3,
                success: function(e) {
                    e.code ? a.code = e.code : a.code = null, a.confirmUploadModal.showModal();
                },
                fail: function() {
                    a.code = null, a.confirmUploadModal.showModal();
                },
                complete: function() {
                    wx.hideLoading();
                }
            }));
        }, this.gotoPhinebindPage = function() {
            setTimeout(function() {
                a.confirmUploadModal.closeModal();
            }, 50), wx.navigateTo({
                url: "/pages/personal/phonebind/index?uploadConfirm=true&voiceName=" + encodeURIComponent(a.data.voiceName)
            });
        };
    },
    onShow: function(e) {
        this.submitRedirect = !1;
    },
    voiceNameInput: function(e) {
        this.setData({
            voiceName: e.detail.value
        });
    },
    getVoiceChangeTaskId: function() {
        return Promise.resolve();
    },
    voiceTrainSubmit: function(e) {
        var t = this;
        o.trim(this.data.voiceName) ? (this.data.voiceName += "", this.data.voiceName.replace(/[\u4e00-\u9fa5]/g, "*").length > 10 ? wx.showToast({
            title: "名称不能超过10个字符噢",
            icon: "none",
            mask: !0
        }) : (console.log("form发生了submit事件，携带数据为：", e.detail.value), console.log("formId" + e.detail.formId), 
        t.checkSensitive(t.data.voiceName).then(function() {
            t.submitVoice(e.detail.formId);
        }).catch(function(e) {
            var o = "网络异常，请稍后重试";
            0 === e && (o = "名称含有敏感词，请修改重试"), wx.showToast({
                title: o,
                icon: "none",
                mask: !0
            });
        }))) : wx.showToast({
            title: "请输入合法的声音名称",
            icon: "none",
            mask: !0
        });
    },
    checkSensitive: function(o) {
        var t = {
            base: e.globalData.basequery,
            param: {
                name: o || ""
            }
        };
        return new Promise(function(o, a) {
            e.Ajax.request({
                url: e.globalData.config.ifc.sensitivecheck,
                data: t || {}
            }, {}, {
                title: "提交中..."
            }).then(function(e) {
                1 === e.suggest ? o(1) : a(0);
            }).catch(function(e) {
                a(null);
            });
        });
    },
    wxPhoneAuthConfirm: function(e) {
        console.log("授权微信进行绑定流程");
    },
    phoneNumberGot: function(o) {
        var t = this;
        if (e.Stats.register(2, "1"), o.detail.iv && o.detail.encryptedData) if (t.code) {
            e.aldstat.sendEvent("[制作提交页]手机号绑定", {
                "用户渠道": e.aldMediaId,
                "手机号来源": "自动获取"
            }), console.log("成功::获取到手机号加密信息", o);
            var a = {
                base: e.globalData.basequery,
                param: {
                    encryptedData: o.detail.encryptedData,
                    iv: o.detail.iv,
                    code: t.code
                }
            };
            e.Ajax.request({
                url: e.globalData.config.ifc.wxautobindmobile,
                data: a || {}
            }, {}, {
                title: "提交中..."
            }).then(function(o) {
                if (t.code = null, o.userMobile) {
                    t.confirmUploadModal.closeModal(), e.Stats.register(1, "1"), e.globalData.userInfo && (e.globalData.userInfo.userMobile = o.userMobile), 
                    e.updateUserInfo("save", {
                        userMobile: o.userMobile
                    });
                    var a = e.globalData.submitVoiceNameParam;
                    t.submitVoiceReq(a);
                } else t.confirmUploadModal.closeModal(), t.gotoPhinebindPage();
            }).catch(function(e) {
                t.code = null, t.confirmUploadModal.closeModal(), t.gotoPhinebindPage();
            });
        } else console.log("失败::login 登录状态失败"), t.gotoPhinebindPage(); else console.log("失败::获取到手机号加密信息； 回退到弹窗 等待下一次用户选择"), 
        console.log(o);
    },
    inputPhoneConfirm: function(e) {
        e && e.detail && "close" === e.detail.type ? console.log("取消绑定流程") : (console.log("输入手机号进行绑定流程"), 
        this.gotoPhinebindPage());
    }
});