var e = getApp(), a = require("../../utils/share.draw.js");

Component({
    properties: {
        canvasHeight: {
            type: Number,
            value: 804
        },
        canvasWidth: {
            type: Number,
            value: null
        },
        shareArticleTitle: {
            type: String,
            value: ""
        },
        speakerNickName: {
            type: String,
            value: ""
        },
        shareId: {
            type: String,
            value: ""
        },
        sourceModuleName: {
            type: String,
            value: ""
        },
        bgUrl: {
            type: String,
            value: ""
        },
        newShare: {
            type: Boolean,
            value: !1
        },
        sourceName: {
            type: String,
            value: ""
        }
    },
    data: {
        tempFiles: "",
        windowHeightRpx: 0,
        showSharePicture: !1,
        canvasId: "shareCardCanvas",
        usedAuth: !1,
        canSharePicture: !1
    },
    attached: function(e) {},
    methods: {
        showSharePicDialog: function(a) {
            a = a || {}, this.setData({
                canvasId: "shareCardCanvas" + new Date().getTime(),
                tempFiles: ""
            }), this.options = a;
            var t = this;
            console.log("showSharePicDialog" + t.properties.shareId);
            var o = {
                base: e.globalData.basequery,
                param: {
                    scene: "share." + t.properties.shareId,
                    page: "packageApplication/pages/share/index"
                }
            };
            return a && a.param && (o.param.page = a.param.page || o.param.page, o.param.scene = void 0 !== a.param.scene ? a.param.scene : o.param.scene), 
            a.canvasUtils && (t.canvasUtils = a.canvasUtils), a.layout && a.layout.qrcodeTop && (t.qrcodeTop = a.layout.qrcodeTop), 
            a.layout && a.layout.qrcodeLeft && (t.qrcodeLeft = a.layout.qrcodeLeft), a.layout && a.layout.content && (t.shareContent = a.layout.content), 
            a.userInfo && (t.userInfo = Object.assign({}, a.userInfo)), a.layout && a.layout.avatarLeft && (t.avatarLeft = a.layout.avatarLeft), 
            a.layout && a.layout.avatarTop && (t.avatarTop = a.layout.avatarTop), a.shareCardParam && (t.shareCardParam = a.shareCardParam), 
            a.windowHeightRpx ? t.setData({
                windowHeightRpx: a.windowHeightRpx
            }) : e.globalData.windowHeightRpx ? t.setData({
                windowHeightRpx: e.globalData.windowHeightRpx
            }) : wx.getSystemInfo({
                success: function(a) {
                    e.systemInfo = a, console.warn("windowHeight", a.windowHeight), console.warn("windowWidth", a.windowWidth), 
                    e.windowHeightRpx = 750 * a.windowHeight / a.windowWidth, t.setData({
                        windowHeightRpx: e.windowHeightRpx
                    });
                },
                fail: function(e) {
                    console.log("获取屏幕高度异常");
                }
            }), console.log(t.data.windowHeightRpx), console.log(t.data.canvasHeight + 172), 
            wx.showLoading({
                title: "正在加载...",
                mask: !0
            }), e.Ajax.request({
                url: e.globalData.config.ifc.shareacode,
                data: o
            }, {}).then(function(e) {
                if (console.log("sharecard_showSharePicDialog | resp = ", e), e.acodeImgUrl) {
                    var a = e.acodeImgUrl;
                    a.startsWith("https") || (a = a.replace(/http/g, "https")), console.log("downloadHttpsUrl = ", a), 
                    wx.getImageInfo({
                        src: a,
                        success: function(e) {
                            wx.hideLoading(), t.showSharePicDialogReal(e.path);
                        },
                        fail: function() {
                            wx.hideLoading(), console.error("getImageInfo_error"), t.shareError();
                        }
                    });
                } else wx.hideLoading(), t.shareError();
            }).catch(function(e) {
                wx.hideLoading(), console.log("sharecard_showSharePicDialog | e = ", e), t.shareError();
            });
        },
        showSharePicDialogReal: function(t) {
            console.log("showSharePicDialogReal");
            var o = this;
            console.log("this = ", this), wx.getSetting({
                success: function(e) {
                    var a = !0, t = !1;
                    null == e.authSetting["scope.writePhotosAlbum"] ? (console.log("showSharePicDialogReal() getSetting = used not auth"), 
                    a = !1) : e.authSetting["scope.writePhotosAlbum"] ? (console.log("showSharePicDialogReal() getSetting = auth is true"), 
                    t = !0) : (console.log("showSharePicDialogReal() getSetting = auth is false"), t = !1), 
                    o.setData({
                        usedAuth: a,
                        canSharePicture: t
                    });
                }
            }), o.setData({
                showSharePicture: !0
            });
            var i = a;
            o.canvasUtils && (i = o.canvasUtils), i.shareCard(o, o.data.canvasId, wx.getSystemInfoSync(), e, Object.assign({}, {
                userInfo: o.userInfo || e.globalData.userInfo,
                title: o.properties.shareArticleTitle,
                source: o.properties.sourceName,
                speakerNickName: o.properties.speakerNickName,
                sourceModuleName: o.properties.sourceModuleName,
                cardBgUrl: o.properties.bgUrl,
                layout: {
                    canvasHeight: o.properties.canvasHeight || 804,
                    canvasWidth: o.properties.canvasWidth || null,
                    qrcodeTop: o.qrcodeTop || 382,
                    qrcodeLeft: o.qrcodeLeft || "",
                    content: o.shareContent || null
                }
            }, o.shareCardParam || {}), t, function() {
                o.showPictureFinish(o);
            }, o.properties.newShare);
        },
        hintSharePicDialog: function() {
            console.log("hintSharePicDialog"), this.setData({
                showSharePicture: !1
            });
        },
        imageCreatedBefore: function() {
            return this.data.canvasHeight + 172 > this.data.windowHeightRpx;
        },
        showPictureFinish: function(a) {
            console.log("showPictureFinish");
            var t = a || this;
            if (t.imageCreatedBefore()) {
                var o = {
                    canvasId: t.data.canvasId,
                    x: 0,
                    y: 0,
                    height: t.properties.canvasHeight * e.prpx,
                    fileType: "png",
                    success: function(e) {
                        console.log(e.tempFilePath), e.tempFilePath && (console.log("showPictureFinish"), 
                        t.setData({
                            tempFiles: e.tempFilePath
                        }));
                    },
                    fail: function(e) {
                        console.error(e);
                    }
                };
                t.properties.canvasWidth && (o.width = 539 * e.prpx, o.x = 55 * e.prpx), wx.canvasToTempFilePath(o, t);
            }
        },
        authSetting: function() {
            var e = this;
            console.log("authSetting"), wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: function() {
                    e.savePicture();
                },
                fail: function() {
                    console.log("fail"), e.setData({
                        usedAuth: !0
                    });
                }
            });
        },
        openSettingCallBack: function() {
            var e = this;
            console.log("openSettingCallBack"), wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: function() {
                    e.savePicture(), e.setData({
                        canSharePicture: !0
                    });
                },
                fail: function() {}
            });
        },
        savePicture: function() {
            console.log("savePicture"), wx.showLoading({
                title: "保存中",
                mask: !0
            });
            var a = this;
            if (a.data.tempFiles && a.imageCreatedBefore()) wx.saveImageToPhotosAlbum({
                filePath: a.data.tempFiles,
                success: function() {
                    wx.hideLoading(), e.Stats.save_picture(), e.aldstat.sendEvent("保存收听图至相册", {
                        "用户渠道": e.aldMediaId,
                        "来源模块": a.properties.sourceModuleName,
                        "文章标题": a.properties.shareArticleTitle
                    }), wx.showModal({
                        title: "",
                        content: "已保存至本地，快去分享吧~",
                        confirmText: "知道了",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm ? (console.log("click confirm"), a.hintSharePicDialog()) : e.cancel && console.log("click cancel");
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            }); else {
                var t = {
                    canvasId: a.data.canvasId,
                    x: 0,
                    y: 0,
                    height: a.properties.canvasHeight * e.prpx,
                    fileType: "png",
                    success: function(t) {
                        console.log(t.tempFilePath), t.tempFilePath ? wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function() {
                                wx.hideLoading(), e.Stats.save_picture(), e.aldstat.sendEvent("保存收听图至相册", {
                                    "用户渠道": e.aldMediaId,
                                    "来源模块": a.properties.sourceModuleName,
                                    "文章标题": a.properties.shareArticleTitle
                                }), wx.showModal({
                                    title: "",
                                    content: "已保存至本地，快去分享吧~",
                                    confirmText: "知道了",
                                    showCancel: !1,
                                    success: function(e) {
                                        e.confirm ? (console.log("click confirm"), a.hintSharePicDialog()) : e.cancel && console.log("click cancel");
                                    }
                                });
                            },
                            complete: function() {
                                wx.hideLoading();
                            }
                        }) : wx.hideLoading();
                    },
                    fail: function(e) {
                        wx.hideLoading(), console.error(e);
                    }
                };
                a.properties.canvasWidth && (t.width = 539 * e.prpx, t.x = 55 * e.prpx), wx.canvasToTempFilePath(t, this);
            }
        },
        noTouch: function() {
            console.log("noTouch");
        },
        shareError: function() {
            wx.showToast({
                title: "获取分享卡片失败，请稍后再试",
                icon: "none"
            });
        }
    }
});