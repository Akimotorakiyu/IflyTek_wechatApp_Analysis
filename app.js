require("./utils/ald-stat.js");

var e = require("./utils/wx.request.js"), t = require("./utils/util.js"), s = require("./utils/login.js"), n = require("./utils/config.js"), r = require("./utils/stats.js"), o = require("./utils/audio.producer.js").Producer, a = require("./utils/background.player.js").Player, i = require("./utils/constant.js").Constant, l = function(e) {
    if (e && e.ald_media_id) return "" + e.ald_media_id;
    if (e && e.scene) {
        var t = e.scene || "";
        if (t && /index\.cnl\./.test(t)) return t.substr("index.cnl.".length) || "";
    }
    return "默认";
};

App({
    onLaunch: function(c) {
        console.log("onLaunch() options = ", c), this.aldMediaId = l(c.query);
        var u = this;
        this.Ajax = e, this.Login = s, this.Utils = t, this.Config = n, this.Stats = r, 
        this.Constant = i, r.launch_scene(c.scene || ""), this.scene = c.scene || "";
        var d = new a({
            producer: new o({
                basequery: this.globalData.basequery
            })
        });
        d.on("ended", function() {
            console.warn("ALL ENDEDDDDDDDDDDDDDD");
        }), d.on("play", function() {}), d.on("error", function(e) {}), u.player = d, r.active_stats(), 
        wx.getSystemInfo({
            success: function(e) {
                u.systemInfo = e, console.log(u.player, e.system), u.player && u.player.setPlatform(/Android/.test(e.system) ? "android" : "ios"), 
                u.prpx = e.windowWidth / 750, u.systemInfo.prpx = u.prpx, wx.setStorage({
                    key: n.lkey.systeminfo,
                    data: Object.assign({}, u.systemInfo)
                });
            },
            fail: function() {
                wx.getStorage({
                    key: n.lkey.systeminfo,
                    success: function(e) {
                        u.systemInfo = e.data, u.prpx = u.systemInfo.prpx || u.systemInfo.windowWidth / 750;
                    },
                    fail: function() {
                        u.systemInfo = null;
                    }
                });
            }
        }), this.updateUserInfo = function(e, t) {
            return new Promise(function(s, r) {
                try {
                    var o = wx.getStorageSync(n.lkey.userinfokey) || {};
                    "save" == e ? (Object.assign(o, t), wx.setStorageSync(n.lkey.userinfokey, o)) : "clear" == e && wx.removeStorageSync(n.lkey.userinfokey), 
                    s();
                } catch (e) {
                    r();
                }
            });
        }, this.manageProgress = function(e, t) {
            return new Promise(function(s, r) {
                try {
                    o = wx.getStorageSync(n.lkey.progresskey) || {};
                    "save" == e ? (Object.assign(o, t), wx.setStorageSync(n.lkey.progresskey, o), wx.removeStorage({
                        key: n.lkey.progresserrkey
                    })) : "clear" == e && (wx.removeStorageSync(n.lkey.progresskey), wx.removeStorage({
                        key: n.lkey.progresserrkey
                    })), s();
                } catch (s) {
                    var o = wx.getStorageSync(n.lkey.progresskey) || {};
                    if ("save" == e) try {
                        Object.assign(o, t), wx.setStorage({
                            key: n.lkey.progresserrkey,
                            data: o
                        });
                    } catch (e) {}
                    r();
                }
            }).then(function() {}).catch(function() {});
        }, this.getProgress = function() {
            var e = null;
            try {
                (e = wx.getStorageSync(n.lkey.progresskey)) && e.currentIdx || (e = null);
            } catch (e) {}
            return e;
        }, this.isMobildBind = function() {
            return this.globalData.userInfo && this.globalData.userInfo.userMobile;
        }, this.Login.getUserInfo(this, function() {
            console.log("获取用户信息"), console.log(JSON.stringify(u.globalData.basequery));
        }, function() {
            console.log("尚未授权");
        }, function() {
            console.warn("获取用户信息失败");
        }, !0), wx.getStorage({
            key: n.lkey.guideviewedkey,
            success: function(e) {
                e && e.data ? u.globalData.guide_viewed = !0 : u.globalData.guide_viewed = !1;
            }
        });
        var g = wx.getUpdateManager();
        g.onCheckForUpdate(function(e) {
            console.log("checkUpdate ||", e), e.hasUpdate && (g.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(e) {
                        e.confirm && g.applyUpdate();
                    }
                });
            }), g.onUpdateFailed(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经上线啦~，请您删除当前小程序，重新搜索“讯飞留声Lite”打开哟~"
                });
            }));
        });
    },
    onShow: function() {
        r.visit_channel(this.aldMediaId), this.aldstat.sendEvent("[首页]自定义渠道", this.aldMediaId);
        var e = wx.getStorageSync(n.lkey.progresserrkey);
        e && this.manageProgress("save", e);
    },
    globalData: {
        userInfo: null,
        avatarUrlGot: !1,
        config: n,
        basequery: {
            appId: n.appId,
            userId: "",
            sid: ""
        },
        makeModal: !1,
        recordInfo: {
            taskId: null,
            textId: null,
            textSegId: null,
            textSegs: [],
            trainTemplateId: ""
        },
        listenhistoryInfo: null,
        submitVoiceNameParam: null,
        modulePage: {
            moduleName: ""
        },
        contentPage: {},
        changevoices: {},
        moduleShareCardImgs: {},
        readerArtsMd5: []
    }
});