var e = getApp(), a = require("../../../utils/text.split.js"), t = require("../../../utils/util.js"), r = (require("../../../utils/constant.js"), 
require("../../../utils/algorithm.js")), o = r.md5;

r.base64;

Page({
    data: {
        voiceWaveIdx: 1,
        hasUser: "",
        scrollHieght: "",
        articleStatus: "",
        article: null,
        shareId: "",
        title: " ",
        originUserNickName: "",
        audioControlIcon: "paused",
        broadcast: "",
        speechDetail: "",
        prefixDetail: "",
        contentSize: 0,
        totalTime: 0,
        totalTimeDisplay: "00:00",
        currentTimeDisplay: "00:00",
        progressValue: 0,
        maxProgressValue: 0,
        paragraphs: [],
        currentIdx: -1,
        speakerInfo: {},
        speedValue: 50,
        currentPlayingIdx: 0,
        currentHighlightIdx: -1,
        opennerUserName: ""
    },
    onShow: function() {
        var a = this;
        e.player.namespaceEvents("share.worldcup"), e.Login.getUserInfo(e, function() {
            console.log("获取用户信息"), a.setData({
                hasUser: !0
            }), console.warn("======已经获取到用户信息");
        }, function() {
            console.log("尚未授权"), a.setData({
                hasUser: !1
            });
        }, function() {
            console.warn("获取用户信息失败"), a.setData({
                hasUser: !0
            });
        }, !0), wx.getSystemInfo({
            success: function(t) {
                e.systemInfo = t, console.warn("windowHeight", t.windowHeight), a.setData({
                    scrollHieght: t.windowHeight - 507 * e.prpx + "px"
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            audioControlIcon: "paused"
        });
    },
    onUnload: function() {
        e.player.off("*.share.worldcup"), this.waveFrameTask = null;
    },
    onLoad: function(r) {
        var n = this;
        n.waveFrameTask = n.frameTask(), console.log("share | onLoad() options:", r), console.log("share | onLoad() from = " + r.from), 
        console.warn(e.systemInfo.windowHeight), console.warn(-101 * e.prpx), this.setData({
            scrollHieght: e.systemInfo.windowHeight - 507 * e.prpx + "px"
        });
        var i = n.getShareId(r);
        this.shareId = i, i ? (this.uploadAction = function(a) {
            var t = {
                base: e.globalData.basequery,
                param: {
                    userActions: [ {
                        action: "shareview",
                        entry: {
                            articleId: a
                        }
                    } ]
                }
            };
            e.Ajax.request({
                url: e.globalData.config.ifc.shareaction,
                data: t,
                method: "post",
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {}
            });
        }, function(a) {
            var r = a, o = null, n = 0, i = 0, s = 0, l = 0;
            e.player.on("play.share.worldcup", function() {
                var a = e.player.getAudioProp("currentSource");
                console.warn("开始播放：" + JSON.stringify(a) + "\n duration::" + e.player.getAudioProp("duration") + " \n currentTime::" + e.player.getAudioProp("currentTime")), 
                r.setData({
                    audioControlIcon: "playing"
                }), r.waveFrameTask.start(), r.hasOfflineAudio() || r.setData({
                    currentHighlightIdx: a.index
                });
            }), e.player.on("canplay.share.worldcup", function() {
                console.log("canplay"), r.setData({
                    audioControlIcon: "playing"
                });
            }), e.player.on("timeupdate.share.worldcup", function() {
                if (e.player.ended || e.player.paused || (r.setData({
                    audioControlIcon: "playing"
                }), r.waveFrameTask.start()), o = e.player.getAudioProp("currentSource"), !r.broadtimeupdating && o && !r.articleiniting) {
                    var a = r.data.contentSize;
                    if (n = o.totalWords || 0, i = o.startWordIdx || 0, s = e.player.getAudioProp("duration") || 0, 
                    l = e.player.getAudioProp("currentTime") || 0, s) c = (i += l / s * n) * r.data.totalTime / a, 
                    r.setData({
                        progressValue: c,
                        currentTimeDisplay: t.formatSecond(Math.floor(c))
                    }); else if (e.player.ended) {
                        var c = r.data.totalTime;
                        r.setData({
                            progressValue: c,
                            currentTimeDisplay: t.formatSecond(c)
                        });
                    }
                    r.hasOfflineAudio() || r.setData({
                        currentHighlightIdx: o.index
                    });
                }
            }), e.player.on("pause.share.worldcup", function() {
                r.setData({
                    audioControlIcon: "paused"
                }), r.waveFrameTask.stop();
            }), e.player.on("stop.share.worldcup", function(e) {
                console.log("STOP"), r.setData({
                    audioControlIcon: "paused"
                }), r.waveFrameTask.stop();
            }), e.player.on("ended.share.worldcup", function() {
                r.setData({
                    audioControlIcon: "paused"
                }), r.waveFrameTask.stop();
                var e = r.data.totalTime;
                r.setData({
                    progressValue: e,
                    currentTimeDisplay: t.formatSecond(e)
                });
            }), e.player.on("waiting.share.worldcup", function() {
                r.setData({
                    audioControlIcon: "waiting"
                });
            }), e.player.on("synthing.share.worldcup", function() {
                r.setData({
                    audioControlIcon: "waiting"
                });
            }), e.player.on("synthdone.share.worldcup", function(e) {
                e || console.error("合成异常啦？");
            }), e.player.on("error.share.worldcup", function(a) {
                console.log("ERROR"), setTimeout(function() {
                    r.setData({
                        audioControlIcon: "paused"
                    });
                }, 5), r.setData({
                    audioControlIcon: "paused"
                }), r.waveFrameTask.stop();
                var t = "";
                switch (a) {
                  case e.player.producer.error.nonsource:
                    t = "合成失败，无可用资源";
                    break;

                  case e.player.producer.error.timeout:
                    t = "合成超时";
                    break;

                  case e.player.producer.error.syntherror:
                    t = "合成异常，播放失败";
                    break;

                  case e.player.producer.error.abort:
                    t = "网络异常，合成失败";
                    break;

                  default:
                    t = "音频资源播放失败";
                }
                wx.showToast({
                    title: t + "",
                    mask: !1,
                    icon: "none"
                });
            });
        }(this), this.initArticleData = function(e, a) {
            var t = this, r = getApp();
            if (n.shareInfo) a && a.call(this); else {
                var o = {
                    base: r.globalData.basequery,
                    param: {
                        shareId: e
                    }
                };
                r.Ajax.request({
                    url: r.globalData.config.ifc.sharedetail,
                    data: o
                }, null, {
                    title: "加载中..."
                }).then(function(e) {
                    if (e.base && "000000" === e.base.retCode && e.shareInfo) {
                        var o = e.shareInfo;
                        n.shareInfo = e.shareInfo, n.mArticleInfo = e.moduleArticleShareInfo;
                        var i = o.voiceInfo || {};
                        i.speakerVcn || (i.vcn ? i.speakerVcn = i.vcn : i.speakerVcn = o.speakerVcn), i.speakerName = i.voiceName || o.user.nickName, 
                        i.imgUrl = o.user.avatarUrl, i.voiceType = i.voiceType || o.voiceType || "2", "xiaoyuan" == o.speakerVcn ? (i.speakerName = "小媛", 
                        i.imgUrl = "http://s1.haitunvoice.com/htys/speaker/img/xiaoyuan.png") : "xiaozhang" == o.speakerVcn && (i.speakerName = "刚哥", 
                        i.imgUrl = "http://s1.haitunvoice.com/htys/speaker/img/xiaozhang_0628.png");
                        var s = "";
                        s = "Hello," + (r.globalData.userInfo && r.globalData.userInfo.nickName || "") + "。\n", 
                        n.setData({
                            article: o.article,
                            articleStatus: "1",
                            broadcast: o.pv,
                            speedValue: o.rate || 50,
                            speakerInfo: i,
                            prefixDetail: s,
                            speechDetail: o.article.speechdetail,
                            content: o.article && o.article.speechdetail,
                            title: n.mArticleInfo.shareTitle
                        }), a && a.call(t);
                    } else wx.hideShareMenu({}), n.setData({
                        articleStatus: "9"
                    });
                }).catch(function(e) {
                    wx.hideShareMenu({}), console.error(e), console.error(e && e.message), n.setData({
                        articleStatus: "9"
                    });
                });
            }
        }, this.ArticleDetailGeted = function() {
            var r = ("Hello," + (e.globalData.userInfo && e.globalData.userInfo.nickName) || "") + "。\n";
            n.setData({
                prefixDetail: r,
                speechDetail: n.shareInfo.article.speechdetail,
                opennerUserName: e.globalData.userInfo && e.globalData.userInfo.nickName || ""
            }), n.speedDefValue = n.data.speedValue, n.setData({
                speedValue: n.speedDefValue
            });
            var i = new Date().getTime(), s = [], l = 2 == n.data.speakerInfo.voiceType && "xiaoyuan" != n.data.speakerInfo.vcn && "xiaozhang" != n.data.speakerInfo.vcn;
            n.hasOfflineAudio() ? (s = n.data.prefixDetail ? a.santenceSplit(n.data.prefixDetail, n.splitEnter) : [], 
            l && (s = []), s = s.concat([ {
                txt: "" + n.data.speechDetail,
                startWordIdx: n.data.prefixDetail.length,
                totalWords: ("" + n.data.speechDetail).length,
                canPlay: a.canTts("" + n.data.speechDetail),
                url: l ? n.mArticleInfo.listenUrl : n.data.article.audio.audiourl,
                index: s.length
            } ]), console.log(s)) : s = a.santenceSplit((l ? "" : n.data.prefixDetail) + n.data.speechDetail, n.splitEnter);
            var c = Math.round((-.00402 * n.data.speedValue + .532) * (n.data.prefixDetail + n.data.speechDetail).length * .9);
            console.log(s);
            var d = s.length && s[s.length - 1].startWordIdx + s[s.length - 1].totalWords;
            if (isNaN(d) && (d = 0), n.setData({
                paragraphs: s,
                contentSize: d,
                totalTime: c,
                maxProgressValue: c,
                totalTimeDisplay: t.formatSecond(c),
                audioControlIcon: "paused"
            }), console.log("预估播报总时长：" + c), console.log("分段耗时时间:: " + (new Date().getTime() - i) + "毫秒,分段信息如下"), 
            n.articleiniting = !1, "1" === n.data.articleStatus) {
                var p = {
                    title: n.mArticleInfo.shareTitle,
                    paragraphs: s,
                    synthOption: {
                        vcn: n.data.speakerInfo.speakerVcn,
                        vcnType: "xiaoyuan" == n.data.speakerInfo.vcn || "xiaozhang" == n.data.speakerInfo.vcn ? 2 : n.data.speakerInfo.voiceType,
                        speed: n.data.speedValue,
                        vol: 100
                    }
                }, u = o("page_share" + JSON.stringify(p));
                u !== e.player.mediaSeqId ? (e.player.producer.initData(p), e.player.mediaSeqId = u + "", 
                e.player.startPlay()) : (console.warn("正在播放当前文章"), e.player.play());
            }
        }, this.initArticleDetail = function(e) {
            n.articleiniting = !0, i && n.initArticleData(i, function() {
                e && e();
            });
        }, e.Login.getUserInfo(e, function() {
            console.log("获取用户信息"), n.setData({
                hasUser: !0
            }), n.initArticleDetail(n.ArticleDetailGeted);
        }, function() {
            console.log("尚未授权"), n.setData({
                hasUser: !1
            }), n.initArticleDetail();
        }, function() {
            console.warn("获取用户信息失败"), n.setData({
                hasUser: !0
            }), n.initArticleDetail(n.ArticleDetailGeted);
        }), this.hasOfflineAudio = function() {
            return 2 == n.data.speakerInfo.voiceType && "xiaoyuan" != n.data.speakerInfo.vcn && "xiaozhang" != n.data.speakerInfo.vcn ? n.mArticleInfo && n.mArticleInfo.listenUrl : n.data.article.audio && n.data.article.audio.audiourl;
        }) : n.setData({
            articleStatus: "9"
        });
    },
    broadcasttimeupdating: function() {
        this.broadtimeupdating = !0;
    },
    broadcasttimeupdate: function(a) {
        for (var t = this, r = a.detail.value, o = t.data.totalTime, n = Math.floor(r * t.data.contentSize / o), i = this.data.paragraphs, s = 0, l = 0, c = i.length; l < c; l++) {
            if (i[l] && i[l].startWordIdx > n) {
                s = l < 1 ? 0 : l - 1;
                break;
            }
            l >= i.length - 1 && (s = i.length - 1), s = s < 0 ? 0 : s;
        }
        var d = (n - i[s].startWordIdx) / i[s].totalWords;
        console.log("拖动 合成位置：：" + s), e.player.seek(s, d || 0), this.broadtimeupdating = !1;
    },
    controlPlay: function(a) {
        !1 === e.player.paused ? (console.log("用户主动暂停"), e.player.pause()) : void 0 === e.player.paused || !0 === e.player.paused ? (console.log("开始调用 播放"), 
        e.player.play()) : (console.log("用户主动暂停2"), e.player.pause());
    },
    share: function(e) {
        console.log("分享回调" + JSON.stringify(e.detail));
    },
    gotoHome: function(a) {
        var t = this;
        e.aldstat.sendEvent("去复刻声音", {
            "用户渠道": e.aldMediaId,
            "所属模块": t.mArticleInfo.name || "",
            "事件来源": "听单分享页面"
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    authInfoGetedTab: function(a) {
        var t = this;
        t.setData({
            hasUser: !0
        });
        a.detail.userinfo;
        a.detail.userInfo ? e.Login.getUserInfo(e, function() {
            t.initArticleDetail(t.ArticleDetailGeted);
        }, function() {
            t.initArticleDetail(t.ArticleDetailGeted);
        }, function() {
            console.warn("获取用户信息失败"), t.initArticleDetail(t.ArticleDetailGeted);
        }, !0) : (console.log("用户拒绝授权，禁止用户深入操作"), t.initArticleDetail(t.ArticleDetailGeted));
    },
    onShareAppMessage: function(a) {
        var t = this;
        return e.aldstat.sendEvent("[应用分享页]分享按钮", {
            "用户渠道": e.aldMediaId,
            "所属模块": t.mArticleInfo.name || ""
        }), console.log("/pages/voiceapplication/share/index?" + (t.shareScene ? "scene=" + (t.shareScene || "") : "shareId=" + t.shareId)), 
        {
            title: t.mArticleInfo.shareTitle || "AI复刻的声音为你播报",
            path: "/pages/voiceapplication/share/index?" + (t.shareScene ? "scene=" + (t.shareScene || "") : "shareId=" + t.shareId),
            imageUrl: t.mArticleInfo.screenshot || ""
        };
    },
    getShareId: function(e) {
        var a = this;
        console.log("getShareId");
        if (!e) return "";
        if (e.shareId) return e.shareId;
        var t = decodeURIComponent(e.scene || "");
        if (a.shareScene = t, !t) return a.shareScene = "", "";
        var r = t.split(".");
        return r && r[0] && "share" == r[0] && r[1] ? r[1] : "";
    },
    frameTask: function() {
        var e = this;
        return {
            start: function() {
                e.vwaveTask || (e.vwaveTask = setInterval(function() {
                    e.setData({
                        voiceWaveIdx: e.data.voiceWaveIdx % 4 + 1
                    });
                }, 160));
            },
            stop: function() {
                e.vwaveTask && clearInterval(e.vwaveTask), e.vwaveTask = null, e.setData({
                    voiceWaveIdx: 1
                });
            }
        };
    }
});