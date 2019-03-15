var t = getApp(), e = wx.getRecorderManager(), a = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 48e3,
    format: "mp3",
    frameSize: 50
}, r = {
    uploadErrMsg: "上传失败,请重新上传录音",
    checkErrMsg: "音质检测失败",
    noiseErrMsg: "噪音提示",
    lowMatchErrMsg: "读的内容和文本不一致呢"
}, o = {
    1: [ "滴！你的声音已经刷卡上车了", "哎，你的声音真好听", "声音验证成功，出发", "听到这声音，在后台围观的运营团队双眼齐齐发光" ],
    3: [ "真是字正腔圆，我为你打call！", "小编陷入沉思，这声音，是你吗？大明湖畔的……", "快说你是不是播音主持专业的" ],
    5: [ "高音甜，中音准，低音沉，总之一句话，就是通透", "你就好啦，人又靓，声又正", "再让我听听，我觉得你能参加好声音", "认真的人，是会发光的！" ],
    7: [ "四舍五入就录完了", "真是字正腔圆，我为你打call！", "哎，等一下，你的声音还没拿呢。", "你不会放弃的,对吗" ],
    9: [ "你们抗住，我帮你们看看进度——还有一段", "如果录完，千山万水，你愿意陪我一起听吗", "您定制的声音即将上线", "最美的不是下雨天和你一起躲雨，而是看着你读完文本" ]
};

Page({
    data: {
        canIUseRecord: wx.canIUse("button.open-type.openSetting"),
        completeItemLength: 0,
        completeItemLengthArray: [ "1" ],
        finished: !1,
        rightIcon: !1,
        animationCenter: "",
        trainText: {
            textId: "",
            textSegs: []
        },
        errorSamples: [],
        currentIdx: 0,
        currentSampleWords: [],
        originSampleWords: [],
        errorTime: 0,
        currentFilePath: "",
        viewAll: !1,
        recordStatus: 0,
        recordSusNumber: t.globalData.config.dataCfg.recordNumber,
        recordAuthed: !1,
        rotate: 0
    },
    onShow: function() {
        var e = this;
        e.animation = wx.createAnimation({
            duration: 1500,
            timingFunction: "ease"
        }), e.animation.scale(1.5, 1.5).translateY(250 * t.prpx).step(), this.data.recordAuthed || e.authRecord(!0).then(function() {
            console.log("已经授权 录音"), e.setData({
                recordAuthed: !0
            });
        }).catch(function(t) {
            e.setData({
                recordAuthed: !1
            }), "refused" === t ? console.warn("用户拒绝授权") : console.warn("用户获取权限失败");
        });
    },
    onLoad: function(a) {
        var n = this;
        n.userStoped = !1, this.iknowModal = this.selectComponent("#howToRead"), this.getReaderContents = function(t) {
            for (var e = [], a = (t = t || "").replace(/<INS \d+>(([^(<\/INS>)])*)<\/INS>/g, function(t, e, a) {
                return console.log(t), console.log(e), console.log(a), "[_____][++++]" + (e || "") + "[_____]";
            }).replace(/<DEL \d+>(([^(<\/DEL>)])*)<\/DEL>/g, function(t, e, a) {
                return console.log(t), console.log(e), console.log(a), "[_____][----]" + (e || "") + "[_____]";
            }).split("[_____]"), r = 0, o = a.length; r < o; r++) "" !== a[r] && (0 === a[r].indexOf("[++++]") ? e.push({
                content: a[r].substr("[++++]".length),
                type: "INSERT"
            }) : 0 === a[r].indexOf("[----]") ? e.push({
                content: a[r].substr("[----]".length),
                type: "DELETE"
            }) : e.push({
                content: a[r],
                type: "NPORMAL"
            }));
            return e;
        }, this.authRecord = function(t) {
            return new Promise(function(e, a) {
                n.data.recordAuthed ? e() : wx.getSetting({
                    success: function(r) {
                        console.log("获取成功" + JSON.stringify(r)), r.authSetting["scope.record"] ? e() : !1 !== r.authSetting["scope.record"] ? wx.authorize({
                            scope: "scope.record",
                            success: function(t) {
                                e();
                            },
                            fail: function(t) {
                                a("refused");
                            }
                        }) : n.canIUseRecord || t ? a("refused") : wx.openSetting();
                    },
                    fail: function() {
                        a();
                    }
                });
            });
        }, n.setData({
            trainText: {
                textSegs: t.globalData.recordInfo.textSegs,
                textId: t.globalData.recordInfo.textId
            }
        });
        var d = t.getProgress();
        if (d) {
            if (!(d.completeItemLength < t.globalData.config.dataCfg.recordNumber)) return this.setData({
                finished: !0
            }), t.globalData.recordInfo.taskId = d.taskId, t.globalData.recordInfo.trainNoticeId = d.trainNoticeId, 
            void wx.navigateTo({
                url: "/pages/voicemake/submit/index"
            });
            t.globalData.recordInfo.taskId = d.taskId, t.globalData.recordInfo.trainNoticeId = d.trainNoticeId, 
            this.setData({
                currentIdx: d.currentIdx,
                errorSamples: d.errorSamples,
                completeItemLength: d.completeItemLength,
                completeItemLengthArray: (d.completeItemLength + 1 + "").split("")
            });
        }
        this.setData({
            currentSampleWords: n.getReaderContents(this.data.trainText.textSegs[this.data.currentIdx].segText || "")
        }), this.progressDone = function(e, a) {
            n.data.currentIdx;
            for (var r = n.data.errorSamples, d = 0, i = r.length; d < i; d++) r[d];
            var s = n.data.currentIdx + 1;
            n.data.viewAll || n.data.trainText.textSegs.length <= s && (n.data.viewAll || n.setData({
                viewAll: !0
            })), n.data.viewAll && r.length && (s = r[0].split("___")[0]);
            var c = !1;
            n.data.completeItemLength + 1 >= t.globalData.config.dataCfg.recordNumber && (c = !0, 
            n.setData({
                finished: !0
            }));
            var l = n.data.completeItemLength + 1;
            if (t.Stats.record_track(l), t.aldstat.sendEvent("[制作录音页]段落录音成功", {
                "用户渠道": t.aldMediaId,
                "完成段数": l + ""
            }), !c) {
                var u = o[l + ""], g = u && u[Math.floor(Math.random() * u.length)];
                g && wx.showToast({
                    title: g,
                    icon: "none"
                });
            }
            t.manageProgress("save", {
                taskId: t.globalData.recordInfo.taskId,
                errorSamples: r,
                currentIdx: s,
                completeItemLength: l,
                trainNoticeId: t.globalData.recordInfo.trainNoticeId
            }), n.setData({
                recordStatus: 4
            }), setTimeout(function() {
                n.setData({
                    currentIdx: s,
                    completeItemLength: l,
                    completeItemLengthArray: (l + 1 + "").split(""),
                    recordStatus: 0,
                    errorTime: 0,
                    currentFilePath: "",
                    currentSampleWords: c ? [] : n.getReaderContents(n.data.trainText.textSegs[s].segText || ""),
                    originSampleWords: [],
                    rotate: c ? n.data.rotate : n.data.rotate + 360,
                    errorSamples: r,
                    rightIcon: !0
                }), c && (n.usrComplate = !0, wx.redirectTo({
                    url: "/pages/voicemake/submit/index"
                })), n.dealingMaterial = !1;
            }, 500);
        }, this.currentProgressError = function(e, a) {
            for (var r = n.data.currentIdx + "___" + e + "___" + a, o = n.data.errorSamples, d = !1, i = 0, s = o.length; i < s; i++) if (o[i] === r) {
                d = !0;
                break;
            }
            d || o.push(r), n.setData({
                errorTime: n.data.errorTime + 1,
                errorSamples: o
            }), t.manageProgress("save", {
                errorSamples: o,
                currentIdx: n.data.currentIdx,
                completeItemLength: n.data.completeItemLength,
                taskId: t.globalData.recordInfo.taskId,
                trainNoticeId: t.globalData.recordInfo.trainNoticeId
            }), 3 == n.data.errorTime && n.iknowModal.showModal();
        }, this._uploadMaterial = function(e, a) {
            return new Promise(function(r, o) {
                wx.showLoading({
                    title: "音质检测中...",
                    mask: !0
                }), t.Ajax.uploadFile({
                    url: t.globalData.config.ifc.audioupload,
                    filePath: a,
                    name: "file",
                    formData: {}
                }, {}).then(function(a) {
                    e.param.audioUrl = a.filePath, t.Ajax.request({
                        url: t.globalData.config.ifc.audioadd,
                        data: e || {}
                    }, {}).then(function(t) {
                        r(t.audioId);
                    }).catch(function(e) {
                        t.Stats.record_error("2"), t.aldstat.sendEvent("[制作录音页]单段落录音失败", {
                            "用户渠道": t.aldMediaId,
                            "失败原因": "上报数据失败"
                        }), wx.hideLoading(), o();
                    });
                }).catch(function(e) {
                    wx.hideLoading(), t.aldstat.sendEvent("[制作录音页]单段落录音失败", {
                        "用户渠道": t.aldMediaId,
                        "失败原因": "上传录音失败"
                    }), t.Stats.record_error("2"), o();
                });
            });
        }, this.uploadMaterial = function(e, a) {
            return this.dealingMaterial = !0, n._uploadMaterial(e, a).then(function(a) {
                wx.showLoading({
                    title: "音质检测中...",
                    mask: !0
                });
                var o = {
                    base: t.globalData.basequery,
                    param: {
                        taskId: e.param.taskId,
                        audioId: a
                    }
                };
                n.checkMaterial(o).then(function(t) {
                    wx.hideLoading(), n.progressDone(t.audio.textId, t.audio.textSegId), n.setData({
                        recordStatus: 2
                    });
                }).catch(function(e) {
                    if (e && e.audio && e.audio.textDiff) {
                        t.Stats.record_error("1"), t.aldstat.sendEvent("[制作录音页]单段落录音失败", {
                            "用户渠道": t.aldMediaId,
                            "失败原因": "音质检测失败"
                        }), n.currentProgressError(e.audio.textId, e.audio.textSegId), wx.showToast({
                            title: r.lowMatchErrMsg,
                            icon: "none"
                        });
                        var a = n.getReaderContents(e.audio.textDiff), d = n.data.originSampleWords.length > 0 ? n.data.originSampleWords : n.data.currentSampleWords;
                        n.setData({
                            currentSampleWords: a,
                            originSampleWords: d
                        });
                    } else t.Stats.record_error("3"), t.aldstat.sendEvent("[制作录音页]单段落录音失败", {
                        "用户渠道": t.aldMediaId,
                        "失败原因": "噪音失败（转写失败）"
                    }), n.currentProgressError(o.param.textId, o.param.textSegId), wx.showToast({
                        title: r.checkErrMsg,
                        icon: "none"
                    });
                    n.dealingMaterial = !1, n.setData({
                        recordStatus: 2
                    });
                });
            }).catch(function(t) {
                n.dealingMaterial = !1, wx.showToast({
                    title: r.uploadErrMsg,
                    icon: "none"
                }), n.setData({
                    recordStatus: 3
                });
            });
        }, this.checkMaterial = function(e) {
            var a = this, r = 0, o = function e(o, n) {
                ++r > 30 ? n && n(0) : t.Ajax.request({
                    url: t.globalData.config.ifc.audiodetail,
                    data: o || {}
                }, {}).then(function(t) {
                    if (t.audio && 1 === Number(t.audio.checkRet)) n(Number(t.audio.checkRet), t.audio); else {
                        if (!(t.audio && 2 === Number(t.audio.checkRet) || t.audio && -1 === Number(t.audio.checkRet))) return void (n && n(0, t.audio));
                        setTimeout(function() {
                            e(o, n);
                        }.bind(a), 500);
                    }
                }).catch(function(t) {
                    n && n(0);
                });
            };
            return new Promise(function(t, a) {
                try {
                    o(e, function(e, r) {
                        e || r && r.textDiff ? e ? t({
                            checkRet: Number(e),
                            audio: r
                        }) : a({
                            checkRet: Number(e),
                            audio: r
                        }) : a();
                    });
                } catch (t) {
                    a();
                }
            });
        }, e.onStart(function() {
            n.setData({
                recordStatus: 1
            });
        }), e.onError(function(t) {
            t || (n.setData({
                recordStatus: 0
            }), wx.showToast({
                title: "打开录音失败,请检查录音权限",
                icon: "none"
            }), console.error(t));
        }), e.onStop(function(e) {
            if (!n.userStoped) {
                n.setData({
                    recordStatus: 2,
                    currentFilePath: e.tempFilePath || ""
                });
                var a = {
                    base: t.globalData.basequery,
                    param: {}
                };
                a.param.taskId = t.globalData.recordInfo.taskId, a.param.textId = n.data.trainText.textId, 
                a.param.textSegId = n.data.trainText.textSegs[n.data.currentIdx].segId, a.param.textSegText = n.data.trainText.textSegs[n.data.currentIdx].segText, 
                n.uploadMaterial(a, e.tempFilePath);
            }
        }), wx.setStorage({
            key: t.globalData.config.lkey.guideviewedkey,
            data: !0
        }), t.globalData.guide_viewed || (t.globalData.guide_viewed = !0);
    },
    stopRecord: function(t) {
        1 === this.data.recordStatus && e.stop();
    },
    startRecord: function(t) {
        var r = this;
        1 == this.data.recordStatus || this.dealingMaterial || (this.setData({
            currentSampleWords: r.data.originSampleWords.length > 0 ? r.data.originSampleWords : r.data.currentSampleWords,
            originSampleWords: []
        }), r.authRecord().then(function() {
            console.log("已经统一授权"), r.data.recordAuthed || r.setData({
                recordAuthed: !0
            }), e.start(a);
        }).catch(function(t) {
            r.data.recordAuthed && r.setData({
                recordAuthed: !1
            }), "refused" === t ? console.warn("用户拒绝授权") : console.warn("用户获取权限失败");
        }));
    },
    startRecordSubmit: function(e) {
        var a = this;
        console.log("form发生了submit事件，携带数据为：", e.detail.value), console.log("formId" + e.detail.formId), 
        t.globalData.recordInfo.trainNoticeId = e.detail.formId, a.startRecord(), t.manageProgress("save", {
            trainNoticeId: t.globalData.recordInfo.trainNoticeId
        });
    },
    reUploadMaterial: function(e) {
        var a = this, o = {
            base: t.globalData.basequery,
            param: {
                taskId: t.globalData.recordInfo.taskId,
                textId: a.data.trainText.textId,
                textSegId: a.data.trainText.textSegs[a.data.currentIdx].segId,
                textSegText: a.data.trainText.textSegs[a.data.currentIdx].segText
            }
        };
        3 == a.data.recordStatus ? a.uploadMaterial(o, a.data.currentFilePath) : (wx.showToast({
            title: r.uploadErrMsg,
            icon: "none"
        }), a.setData({
            recordStatus: 2
        }));
    },
    saveProgress: function(e) {
        var a = this;
        t.manageProgress("save", {
            errorSamples: a.data.errorSamples,
            currentIdx: a.data.currentIdx,
            completeItemLength: a.data.completeItemLength,
            taskId: t.globalData.recordInfo.taskId,
            trainNoticeId: t.globalData.recordInfo.trainNoticeId
        }).then(function() {
            wx.showToast({
                title: "进度保存成功",
                icon: "none"
            });
        }).catch(function(t) {
            wx.showToast({
                title: "进度保存失败,请稍后再试",
                icon: "none"
            });
        });
    },
    jumpProgress: function(t) {
        var e = this, a = e.data.currentIdx + 1, r = e.data.errorSamples;
        e.data.viewAll || e.data.trainText.textSegs.length <= a && (e.data.viewAll || e.setData({
            viewAll: !0
        })), e.data.viewAll && r.length && (a = r[0].split("___")[0]);
        e.setData({
            currentIdx: a,
            recordStatus: 0,
            errorTime: 0,
            currentFilePath: "",
            currentSampleWords: e.getReaderContents(e.data.trainText.textSegs[a].segText || ""),
            originSampleWords: [],
            rotate: e.data.rotate,
            errorSamples: r
        });
    },
    onUnload: function() {
        var t = this;
        e && e.stop(), t.userStoped = !0, this.usrComplate || wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "AI复刻的声音为你播报",
            path: "/pages/index/index"
        };
    }
});