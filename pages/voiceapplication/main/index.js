var e = getApp(), a = require("../../../utils/crendentials.draw.js");

Page({
    data: {
        banners: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 1e4,
        duration: 800,
        apps: [],
        hasUser: !1,
        credentialsBtnDisabled: !0,
        confirmBtnType: "1",
        showAppsGuide: 1e3
    },
    canshowAppsGuide: function() {
        var a = wx.getStorageSync(e.globalData.config.lkey.appsguideKey);
        wx.getStorageSync(e.globalData.config.lkey.appsguideKey) ? this.setData({
            showAppsGuide: a
        }) : this.setData({
            showAppsGuide: 0
        });
    },
    iKnowAppsGuide: function(a) {
        var n = this.data.showAppsGuide;
        n++, wx.setStorageSync(e.globalData.config.lkey.appsguideKey, n), this.setData({
            showAppsGuide: n
        });
    },
    onShow: function() {
        var e = this;
        e.data.banners || e.queryBanners(), this.queringModule || this.data.apps && this.data.apps.length || this.queryModuleList().then(function(a) {
            var n = (a || []).map(function(a) {
                return e.isNewPaper(a.name) && (a.morningNews = !0), a;
            });
            e.setData({
                apps: n
            });
        }).catch(function(e) {
            wx.showToast({
                title: "获取应用失败",
                icon: "none"
            });
        });
    },
    onLoad: function(n) {
        var t = this;
        this.canshowAppsGuide(), this.getUserInfo(), t.queryModuleList().then(function(e) {
            var a = (e || []).map(function(e) {
                return t.isNewPaper(e.name) && (e.morningNews = !0), e;
            });
            t.setData({
                apps: a
            });
        }).catch(function(e) {
            wx.showToast({
                title: "获取应用失败",
                icon: "none"
            });
        }), t.credentialsModal = this.selectComponent("#credentialsModal");
        try {
            this.res = wx.getSystemInfoSync();
        } catch (e) {}
        e.Login.getUserInfo(e, function() {
            try {
                (n.showcredentials || n.voiceName && (n.vcn || n.batchId)) && (a.credentialsCard(t, "credentialsCanvas", t.res, e, {
                    headerImage: e.globalData.userInfo.avatarUrl,
                    userInfo: e.globalData.userInfo,
                    voiceName: decodeURIComponent(n.voiceName || "我的声音"),
                    voiceId: n.batchId || n.vcn || "",
                    images: {
                        headerBgUrl: "/images/index/credential-header-bg.png",
                        headerLogoUrl: "/images/index/credential-card-bg.png",
                        cardCodeUrl: "/images/index/qr-code.png"
                    }
                }), t.setData({
                    confirmBtnType: "2",
                    credentialsBtnDisabled: !1
                })), (n.showcredentials || n.voiceName && n.vcn) && (e.Stats.view_credentials(), 
                e.aldstat.sendEvent("音库证书页展示[通知点击]", {
                    "用户渠道": e.aldMediaId
                }), t.credentialsModal.showModal());
            } catch (e) {
                console.error(e), t.setData({
                    confirmBtnType: "1"
                });
            }
        }, function() {
            console.log("尚未授权--");
        }, function() {
            console.warn("获取用户信息失败---");
        });
    },
    queryBanners: function() {
        var a = this;
        a.queringBanners || (a.queringBanners = !0, e.Ajax.request({
            url: e.globalData.config.ifc.banners,
            data: {
                base: e.globalData.basequery,
                param: {}
            }
        }, {}).then(function(e) {
            a.queringBanners = !1;
            var n = e.banners || [];
            n.length && a.setData({
                banners: n,
                indicatorDots: n && n.length >= 2
            });
        }).catch(function(e) {
            a.queringBanners = !1, console.error("获取banners列表", e);
        }));
    },
    bannerTap: function(a) {
        var n = a.currentTarget.dataset.bannerPageType || "miniapp", t = a.currentTarget.dataset.bannerPagePath || "", o = a.currentTarget.dataset.bannerIsTab || !1, s = a.currentTarget.dataset.bannerName || "";
        console.log("click banner", n + "::" + t), e.aldstat.sendEvent("[声音应用主页]模块点击", {
            "用户渠道": e.aldMediaId,
            "模块名称": "banner" + s
        }), n !== e.Constant.pageType.h5 && (o ? wx.switchTab({
            url: t
        }) : wx.navigateTo({
            url: t
        }));
    },
    queryModuleList: function(a) {
        var n = this;
        return new Promise(function(a, t) {
            n.queringModule = !0, e.Ajax.request({
                url: e.globalData.config.ifc.modulelist,
                data: {
                    base: e.globalData.basequery,
                    param: {
                        parentModuleId: "0"
                    }
                }
            }, {}, {
                title: "正在加载..."
            }).then(function(e) {
                n.queringModule = !1, e.modules ? a(e.modules) : t(e);
            }).catch(function(e) {
                n.queringModule = !1, console.error("获取应用列表", e), t(e);
            });
        });
    },
    onConfirm: function(a) {
        var n = this;
        a.detail && "2" === a.detail.btnType && this.res ? wx.canvasToTempFilePath({
            canvasId: "credentialsCanvas",
            fileType: "png",
            success: function(a) {
                console.log(a.tempFilePath), a.tempFilePath && (e.aldstat.sendEvent("音库证书保存", {
                    "用户渠道": e.aldMediaId
                }), e.Stats.save_credentials(), wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function() {
                        wx.showModal({
                            title: "保存成功",
                            content: "快去声音应用内玩转你的声音吧~",
                            confirmText: "好的",
                            showCancel: !1,
                            success: function(e) {
                                n.credentialsModal.hideModal(), e.confirm || e.cancel, n.credentialsModal.hideModal();
                            },
                            fail: function() {
                                n.credentialsModal.hideModal();
                            }
                        });
                    }
                }));
            },
            fail: function(e) {
                console.error(e);
            }
        }) : this.credentialsModal.hideModal();
    },
    moreApps: function(a) {
        e.aldstat.sendEvent("[声音应用主页]模块点击", {
            "用户渠道": e.aldMediaId,
            "模块名称": "更多应用"
        }), wx.navigateTo({
            url: "/pages/voiceapplication/promotion/index"
        });
    },
    appCardTap: function(a) {
        var n = this;
        console.log("FORMID::", a.detail.formId), a.detail.formId && n.uploadFormId(a.detail.formId, 3);
        var t = a.currentTarget.dataset.categoryId, o = a.currentTarget.dataset.moduleName || "";
        e.aldstat.sendEvent("[声音应用主页]顶级模块点击", {
            "用户渠道": e.aldMediaId,
            "模块名称": "" + o
        });
        var s = this.data.apps.filter(function(e) {
            return e.moduleId === t;
        });
        if (s = s[0] || null, e.globalData.rootModule = s, !s || 4 !== s.shareTag && !/电话/.test(s.name)) {
            var r = "/packageApplication/pages/column/index?moduleId=" + t;
            n.isNewPaper(o) && (r += "&isNews=true"), wx.navigateTo({
                url: r
            });
        } else wx.navigateTo({
            url: "/packageApplication/pages/callinput/index?moduleId=" + t
        });
    },
    isNewPaper: function(e) {
        return /早报/.test(e);
    },
    getUserInfo: function() {
        var a = this;
        e.Login.getUserInfo(e, function() {
            console.log("获取用户信息");
            e.globalData.userInfo;
            a.setData({
                hasUser: !0
            });
        }, function() {
            console.log("尚未授权");
        }, function() {
            console.warn("获取用户信息失败"), wx.showToast({
                title: "用户信息异常",
                icon: "none"
            });
        }, !0);
    },
    preventTouchMove: function() {},
    uploadFormId: function(a, n) {
        try {
            e.Ajax.request({
                url: e.globalData.config.ifc.uploadwxformid,
                data: {
                    base: e.globalData.basequery,
                    param: {
                        form: {
                            formId: a,
                            type: n || 1
                        }
                    }
                }
            }, {}).then(function(e) {
                console.log("上报formid success");
            }).catch(function(e) {
                console.error("上报formid Error", e);
            });
        } catch (e) {
            console.error("上报formid Error", e.message);
        }
    }
});