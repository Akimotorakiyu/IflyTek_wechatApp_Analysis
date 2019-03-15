var a = getApp(), e = require("../../../utils/share.rap.draw.js"), r = require("../../../utils/util.js"), t = require("../../../utils/algorithm.js"), o = t.md5, n = (t.base64, 
{
    pic: "图片分享",
    message: "分享给好友||群"
}), i = "[00:00.00]中国新工作\n[00:03.00]词：智联招聘/小旭音乐 - 郭世豪\n[00:06.00]曲：智联招聘/小旭音乐 - 郑杰伦\n[00:10.00]制作人：卢小旭\n[00:13.00]演唱：小青龙 & AI\n[00:15.00]这首歌的一部分，是讯飞留声AI合成的\n[00:18.50]你能听出来吗？\n[00:20.90]戴上酷炫装备，我打开虚拟屏\n[00:23.00]和跨国公司老总谈判几分钟搞定\n[00:25.38]AI翻译耳机把交流变得透明\n[00:28.36]别再说我不懂，我掌握工作天平\n[00:30.92]专业技术走开，欢迎一字型人才\n[00:33.48]沟通创意想象，有全新的期待\n[00:35.79]保持你的锋芒，玩转未来职场\n[00:38.42]才华无处可藏，个体终将称王\n[00:41.07]就算工作每天变化让我眼发花\n[00:43.20]我只想尽快完成早点回到家\n[00:45.88]语音说话 文字图画 全都识别通通交给它\n[00:50.79]每天都在快进，这世界没有暂停\n[00:55.90]跟上新一代职场必须睁大眼睛\n[01:00.92]按下一个刷新，要做个时代精英\n[01:05.94]新一代工作不需要太多麻烦事情\n[01:31.44]把你声音留住，然后我要自己说\n[01:33.92]我的语言情感表达比你想像的多\n[01:36.55]只要你选择相信，会给你一个承诺\n[01:38.92]省掉繁琐过程，我只给你结果\n[01:41.27]人机协作时代，最佳雇主要迭代\n[01:43.80]释放你的天性，发挥专长热爱\n[01:46.10]数字任务平台，项目管理畅快\n[01:48.49]岗位随时轮转才是人资新生态\n[01:51.22]当工作安排让你一个头两个大\n[01:53.56]才开始希望机器人把它拿下\n[01:56.18]抽身撤离 做回自己 效率超高还能再喝一壶茶\n[02:01.95]每天都在快进，这世界没有暂停\n[02:06.81]智联新一代职场必须睁大眼睛\n[02:11.87]按下一个刷新，要做个时代精英\n[02:16.85]新一代工作不需要太多麻烦事情\n[02:22.25]每天都在快进，这世界没有暂停\n[02:26.83]智联新一代职场必须睁大眼睛\n[02:31.95]按下一个刷新，要做个时代精英\n[02:36.85]新一代工作不需要太多麻烦事情";

Page({
    data: {
        shareCardBg: "https://ossbj.xfinfr.com/J9Q7O4EL/uploadResource/a46081a9a0ce48f49d8b3ad8ee395e47.png?t=20180912",
        hasUsr: !1,
        playMask: !0,
        audioDuration: 0,
        audioDurationFormatted: r.formatSecond(0),
        currentTime: 0,
        currentTimeFormatted: r.formatSecond(0),
        lrc: "",
        parsedlrc: [],
        currentLrc: "",
        currentLrcIndex: -1,
        lrcScrollTop: 0,
        playStatus: "paused"
    },
    onLoad: function(e) {
        t = this;
        a.player.namespaceEvents("activity.rap"), wx.getImageInfo({
            src: t.data.shareCardBg,
            success: function(a) {
                console.warn("异步 获取网络 擦片成功"), t.shareCardBgTemp = !0, t.setData({
                    shareCardBg: a.path
                });
            },
            fail: function(a) {
                console.error("异步 获取网络 擦片err");
            }
        });
        var t = this;
        this.shareModal = this.selectComponent("#shareModal"), this.initBackgroundPlaerResource(), 
        t.setData({
            lrc: i,
            parsedlrc: r.parseLyric(i)
        });
    },
    onShow: function() {
        a.player.namespaceEvents("activity.rap"), wx.hideShareMenu();
        var e = this;
        a.globalData.basequery && a.globalData.basequery.userId ? e.setData({
            hasUsr: !0
        }) : e.setData({
            hasUsr: !1
        });
    },
    onHide: function() {},
    onUnload: function() {
        a.player.off("*.activity.rap");
    },
    initBackgroundPlayer: function() {
        var e = this, t = 0, o = 0;
        a.player.on("play.activity.rap", function() {
            console.log("play rap"), e.data.playMask && e.setData({
                playMask: !1
            }), e.setData({
                playStatus: "playing"
            });
            var o = a.player.getAudioProp("currentSource");
            console.warn("开始播放：" + JSON.stringify(o) + "\n duration::" + a.player.getAudioProp("duration") + " \n currentTime::" + a.player.getAudioProp("currentTime")), 
            e.data.audioDuration || (t = a.player.getAudioProp("duration")) && e.setData({
                audioDuration: Number(t),
                audioDurationFormatted: r.formatSecond(Math.floor(Number(t)))
            }), a.player.seekSecd && !isNaN(a.player.seekSecd) && (wx.getBackgroundAudioManager().seek(a.player.seekSecd), 
            a.player.seekSecd = null);
        }), a.player.on("canplay.activity.rap", function() {
            console.log("canplay rap"), (t = a.player.getAudioProp("duration")) && e.setData({
                audioDuration: Number(t),
                audioDurationFormatted: r.formatSecond(Math.floor(Number(t)))
            });
        }), a.player.on("timeupdate.activity.rap", function() {
            e.data.audioDuration || (t = a.player.getAudioProp("duration")) && e.setData({
                audioDuration: Number(t),
                audioDurationFormatted: r.formatSecond(Math.floor(Number(t)))
            }), a.player.getAudioProp("paused") || e.setData({
                playStatus: "playing"
            }), o = a.player.getAudioProp("currentTime") || 0, e.data.audioDuration && !e.rapTimeDraping && (e.setData({
                currentTime: o,
                currentTimeFormatted: r.formatSecond(Math.floor(o))
            }), e.renderCurrentLrc(o));
        }), a.player.on("pause.activity.rap", function() {
            console.log("pause rap"), e.setData({
                playStatus: "paused"
            });
        }), a.player.on("stop.activity.rap", function(a) {
            console.log("STOP  rap"), e.setData({
                currentLrc: "",
                currentLrcIndex: -1,
                playStatus: "paused"
            });
        }), a.player.on("ended.activity.rap", function() {
            console.log("ENDED ---rap"), e.setData({
                currentLrc: "",
                currentLrcIndex: -1
            }), e.setData({
                playStatus: "paused",
                currentTime: e.data.audioDuration,
                currentTimeFormatted: r.formatSecond(Math.floor(e.data.audioDuration))
            });
        }), a.player.on("waiting.activity.rap", function() {
            console.log("waiting ---rap"), e.setData({
                playStatus: "waiting"
            });
        }), a.player.on("error.activity.rap", function(r, t) {
            console.log("ERROR rap"), console.error(r), console.error(r.message), console.error(t), 
            console.error(t && t.message), a.player.seekSecd = null, wx.showToast({
                title: "音频资源播放失败",
                mask: !1,
                icon: "none"
            }), e.setData({
                playStatus: "paused"
            });
        });
    },
    initBackgroundPlaerResource: function() {
        var e = this, r = {
            title: "讯飞留声x小青龙,AI助力，人人皆可唱rap",
            paragraphs: [ {
                txt: "",
                startWordIdx: 0,
                totalWords: 0,
                canPlay: !1,
                url: "https://ossbj.xfinfr.com/J9Q7O4EL/uploadResource/2c96757cd7f0499f99fff380249d42af.mp3",
                index: 0
            } ],
            synthOption: {}
        }, t = o("page_content" + JSON.stringify(r));
        !a.player.getAudioProp("paused") && a.player.getAudioProp("src") ? t !== a.player.mediaSeqId ? (e.playerInitData = r, 
        e.mediaSeqId = t) : (console.warn("正在播放当前文章"), this.initBackgroundPlayer(), e.setData({
            playMask: !1
        }), a.player.play()) : (e.playerInitData = r, e.mediaSeqId = t);
    },
    startPlay: function(e) {
        this.setData({
            playMask: !1
        }), this.initBackgroundPlayer(), a.player.producer.initData(this.playerInitData), 
        a.player.mediaSeqId = this.mediaSeqId + "", a.player.startPlay();
    },
    rapTimeDraging: function(a) {
        this.rapTimeDraping = !0;
    },
    rapTimeDraged: function(e) {
        this.rapTimeDraping = !1;
        var r = e.detail.value;
        console.warn(wx.getBackgroundAudioManager().src), console.log(wx.getBackgroundAudioManager().currentTime), 
        console.log(wx.getBackgroundAudioManager().duration), console.log(wx.getBackgroundAudioManager().paused);
        var t = isNaN(wx.getBackgroundAudioManager().duration) || isNaN(wx.getBackgroundAudioManager().currentTime) ? 99 : Math.abs(Math.floor(wx.getBackgroundAudioManager().duration) - Math.floor(wx.getBackgroundAudioManager().currentTime));
        if (!wx.getBackgroundAudioManager().src || wx.getBackgroundAudioManager().paused && t <= 1.5) a.player.play(function() {
            setTimeout(function() {
                console.log("SEEK"), wx.getBackgroundAudioManager().seek(r), setTimeout(function() {
                    wx.getBackgroundAudioManager().paused && wx.getBackgroundAudioManager().play();
                });
            });
        }); else if (this.data.audioDuration) {
            var o = r / this.data.audioDuration;
            console.log("拖动 位置：：" + r + " s;占比" + o), a.player.getAudioProp("paused") && wx.getBackgroundAudioManager().play(), 
            setTimeout(function() {
                a.player.getAudioProp("paused") ? a.player.seekSecd = r : wx.getBackgroundAudioManager().seek(r);
            }, 200);
        }
    },
    audioControl: function(e) {
        console.warn("tap control"), console.log(a.player.paused), console.log(a.player.getAudioProp("paused")), 
        a.player.getAudioProp("paused") ? (console.warn("tap control:: to play"), a.player.play()) : (console.warn("tap control:: to pause"), 
        wx.pauseBackgroundAudio());
    },
    scrollLrcView: function(a) {
        var e = this;
        e.rapTimeDraping = !0, e.scrollLrcDoneTask && clearTimeout(e.scrollLrcDoneTask), 
        e.scrollLrcDoneTask = setTimeout(function() {
            e.rapTimeDraping = !1;
        }, 800);
    },
    renderCurrentLrc: function(e) {
        for (var r = this, t = "", o = this.data.parsedlrc, n = -1, i = 0, s = o.length; i < s; i++) {
            if (i + 1 < o.length && o[i + 1][0] > e + .5 && o[i][0] < e + .5) {
                t = o[i][1], n = i;
                break;
            }
            o[i][0] < e + .5 && i == s - 1 && (n = i);
        }
        r.data.currentLrcIndex !== n && r.setData({
            currentLrc: t,
            currentLrcIndex: n,
            lrcScrollTop: n - 2 > 0 ? 64 * (n - 2) * a.prpx : r.data.lrcScrollTop
        });
    },
    onShareAppMessage: function() {
        return a.aldstat.sendEvent("小青龙分享", {
            "用户渠道": a.aldMediaId,
            "分享渠道": n.message
        }), {
            title: "小青龙联手AI唱RAP？点击收听！",
            path: "/pages/activity/rap/index",
            imageUrl: "http://s1.haitunvoice.com/liusheng-mini-app/images/application/share.rap.card.png?t=201808201105"
        };
    },
    gotoHome: function(e) {
        a.aldstat.sendEvent("去复刻声音", {
            "用户渠道": a.aldMediaId,
            "所属模块": "小青龙去复刻声音",
            "事件来源": "小青龙活动页面"
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    authInfoGetedTab: function(e) {
        var r = this;
        e.detail.userinfo;
        e.detail.userInfo ? a.Login.getUserInfo(a, function() {
            r.setData({
                hasUsr: !0
            }), r.setData({
                hasUsr: !0
            }), r.showShareDialog();
        }, function() {
            wx.showToast({
                title: "请授权登录",
                icon: "none"
            });
        }, function() {
            console.warn("获取用户信息失败"), wx.showToast({
                title: "用户信息异常",
                icon: "none"
            });
        }, !0) : (console.log("用户拒绝授权，禁止用户深入操作"), wx.showToast({
            title: "请授权登录",
            icon: "none"
        }));
    },
    showShareDialog: function(r) {
        var t = this;
        wx.showLoading({
            title: "正在加载...",
            mask: !0
        }), a.aldstat.sendEvent("小青龙分享", {
            "用户渠道": a.aldMediaId,
            "分享渠道": n.pic
        });
        var o = {
            page: "pages/activity/rap/index",
            scene: "share.rap"
        };
        t.shareCardBgTemp ? t.shareModal.showSharePicDialog({
            param: o,
            canvasUtils: e
        }) : wx.getImageInfo({
            src: t.data.shareCardBg,
            success: function(a) {
                wx.hideLoading(), console.warn("获取网络成功"), t.setData({
                    shareCardBg: a.path
                }), t.shareCardBgTemp = !0, setTimeout(function() {
                    t.shareModal.showSharePicDialog({
                        param: o,
                        canvasUtils: e
                    });
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "获取分享图片异常",
                    icon: "none"
                });
            }
        });
    }
});