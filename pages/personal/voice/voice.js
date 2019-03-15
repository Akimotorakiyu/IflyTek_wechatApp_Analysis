var e = getApp(), t = wx.createInnerAudioContext();

t.obeyMuteSwitch = !1;

var a = "Hi，" + (e.globalData.userInfo && e.globalData.userInfo.nickName || "") + "。我是您的虚拟声音，很高兴为您服务。我会外语、会播音，还会么么哒！随着不断升级，还有更多玩法等你发现，快去“声音应用”体验一下吧！";

Page({
    data: {
        lastTimes: "",
        topBarFixed: !1,
        voiceCount: 0,
        isEdit: !1,
        currentPlayVoiceId: "-1",
        isPlayLoading: !1,
        queryCount: 6,
        offset: 0,
        hasMore: !0,
        loadError: !1,
        loading: !1,
        voiceInfoList: [],
        voiceUrlList: [],
        deleteItemIndex: -1,
        deleteItemVcn: "",
        deleteItemName: "",
        avatarVoiceId: ""
    },
    onPageScroll: function(t) {
        var a = 120 * (e.systemInfo && e.systemInfo.pxrpx) || 40;
        t.scrollTop > a ? this.setData({
            topBarFixed: !0
        }) : this.setData({
            topBarFixed: !1
        });
    },
    uploadTap: function(t) {
        var a = this;
        if (this.setData({
            avatarVoiceId: t.currentTarget.dataset.voiceId || "",
            voiceImageIndex: t.currentTarget.dataset.index
        }), this.data.avatarVoiceId) {
            wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    wx.showLoading({
                        title: "上传中...",
                        mask: !0
                    }), a.uploadImage(t.tempFilePaths[0]).then(function(t) {
                        var o = {
                            base: e.globalData.basequery,
                            param: {
                                voiceId: a.data.avatarVoiceId,
                                imageUrl: t
                            }
                        };
                        e.Ajax.request({
                            url: e.globalData.config.ifc.voiceupdate,
                            data: o
                        }, {}).then(function(e) {
                            wx.hideLoading(), a.data.voiceInfoList[a.data.voiceImageIndex].imageUrl = t, a.setData({
                                voiceImageIndex: "",
                                voiceInfoList: a.data.voiceInfoList
                            }), wx.showToast({
                                title: "更新头像成功",
                                icon: "none"
                            });
                        }).catch(function(e) {
                            wx.hideLoading(), console.log("voice_updateItem | err = ", e), wx.showToast({
                                title: "更新头像失败,请重试",
                                icon: "none"
                            });
                        });
                    }).catch(function(e) {
                        wx.hideLoading(), console.error("error uploadImage||", e), wx.showToast({
                            title: "更新头像失败,请重试",
                            icon: "none"
                        });
                    });
                }
            });
        } else wx.showToast({
            title: "音库信息异常",
            icon: "none"
        });
    },
    imgLoadError: function(e) {
        console.error("image3发生error事件，携带值为", e.detail.errMsg);
    },
    getCropperImg: function(t) {
        var a = this;
        wx.showLoading({
            title: "上传中...",
            mask: !0
        }), this.uploadImage(t.detail.url).then(function(t) {
            var o = {
                base: e.globalData.basequery,
                param: {
                    voiceId: a.data.avatarVoiceId,
                    imageUrl: t
                }
            };
            e.Ajax.request({
                url: e.globalData.config.ifc.voiceupdate,
                data: o
            }, {}).then(function(e) {
                wx.hideLoading(), a.data.voiceInfoList[a.data.voiceImageIndex].imageUrl = t, a.setData({
                    voiceImageIndex: "",
                    voiceInfoList: a.data.voiceInfoList
                }), wx.showToast({
                    title: "更新头像成功",
                    icon: "none"
                });
            }).catch(function(e) {
                wx.hideLoading(), console.log("voice_updateItem | err = ", e), wx.showToast({
                    title: "更新头像失败,请重试",
                    icon: "none"
                });
            });
        }).catch(function(e) {
            wx.hideLoading(), console.error("error uploadImage||", e), wx.showToast({
                title: "更新头像失败,请重试",
                icon: "none"
            });
        });
    },
    uploadImage: function(t) {
        var a = this;
        return new Promise(function(o, i) {
            e.Ajax.uploadFile({
                url: e.globalData.config.ifc.imgupload,
                filePath: t,
                name: "file",
                formData: {}
            }).then(function(e) {
                a.setData({
                    cropperResult: ""
                }), o(e.url);
            }).catch(function(e) {
                a.setData({
                    cropperResult: ""
                }), i(e);
            });
        });
    },
    reNameInput: function(e) {
        e.detail.value;
        e.detail.value.replace(/[\u4e00-\u9fa5]/g, "**").length > 16 && wx.showToast({
            title: "名称最大8个汉字或16个字符哟",
            icon: "none"
        }), this.setData({
            reVoiceName: e.detail.value
        });
    },
    reName: function(e) {
        var t = e.currentTarget.dataset.voiceId || "", a = e.currentTarget.dataset.voiceName || "";
        this.setData({
            isEdit: !1,
            reNameId: t,
            reVoiceName: a
        });
    },
    speedUpReport: function(t) {
        var a = this, o = t.detail.formId, i = t.currentTarget.dataset.voiceId, n = t.currentTarget.dataset.voiceIndex;
        if (!(this.data.voiceInfoList[n].voiceSpeedInfo && this.data.voiceInfoList[n].voiceSpeedInfo.speedInfo && this.data.voiceInfoList[n].voiceSpeedInfo.speedInfo.length >= 3)) {
            var s = {
                base: e.globalData.basequery,
                param: {
                    formId: o
                }
            };
            e.Ajax.request({
                url: e.globalData.config.ifc.voiceuploadform,
                data: s
            }, {}, {
                title: "正在加载...",
                mask: !0
            }).then(function(e) {
                a.voiceId = i, a.speedUpFriends();
            }).catch(function(e) {
                a.voiceId = i, console.error(e), a.speedUpFriends();
            });
        }
    },
    speedUpFriends: function() {
        var t = this, a = {
            base: e.globalData.basequery,
            param: {
                openId: "",
                voiceId: this.voiceId + "",
                nickName: ""
            }
        };
        e.Login.getUserInfo(e, function() {
            var o = e.globalData.userInfo;
            a.param.nickName = o.nickName, a.param.openId = o.openId, e.Ajax.request({
                url: e.globalData.config.ifc.uploadspeed,
                data: a
            }, {}, {
                title: "正在加载...",
                mask: !0
            }).then(function(e) {
                console.log("上报加速分享成功", e), t.speedUpModal.showModal();
            }).catch(function(e) {
                console.log("上报加速分享失败", e), wx.showToast({
                    title: "分享加速异常，请稍后重试",
                    icon: "none"
                });
            });
        }, function() {
            console.log("尚未授权");
        }, function() {
            wx.showToast({
                title: "用户信息异常",
                icon: "none"
            });
        });
    },
    reNameConfirm: function(t) {
        var a = this, o = {
            base: e.globalData.basequery,
            param: {
                voiceId: this.voiceId,
                name: this.data.reVoiceName
            }
        };
        this.reNameModal.closeModal(), e.Ajax.request({
            url: e.globalData.config.ifc.voiceupdate,
            data: o
        }, {}, {
            title: "提交中...",
            mask: !0
        }).then(function(e) {
            a.data.voiceInfoList[a.voiceIndex].voiceName = a.data.reVoiceName;
            var t = a.data.voiceInfoList[a.voiceIndex].updateNameCount || 0;
            a.data.voiceInfoList[a.voiceIndex].updateNameCount = ++t, a.setData({
                reVoiceName: "",
                reNameId: "",
                voiceInfoList: a.data.voiceInfoList
            }), wx.showToast({
                title: "更新声音名称成功",
                icon: "none"
            }), wx.startPullDownRefresh();
        }).catch(function(e) {
            console.log("voice_updateItem | err = ", e);
            var t = "更新声音名称失败";
            e && e.base && "700004" === e.base.retCode && (t = "名称含敏感词，请重新修改"), wx.showToast({
                title: t,
                icon: "none"
            });
        });
    },
    reNameCancel: function() {
        this.setData({
            reVoiceName: "",
            reNameId: ""
        });
    },
    cancelUpdateName: function(e) {
        this.setData({
            reVoiceName: "",
            reNameId: "",
            isEdit: !1
        });
    },
    updateName: function(e) {
        var t = e.currentTarget.dataset.voiceId || "", a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.lastTimes;
        if (this.data.voiceInfoList[a].updateNameCount >= 2) return wx.showToast({
            title: "名称修改超出2次，无法继续修改",
            icon: "none"
        }), void this.setData({
            reNameId: ""
        });
        this.data.reVoiceName ? this.data.reVoiceName.replace(/[\u4e00-\u9fa5]/g, "**").length > 16 ? wx.showToast({
            title: "名称最大8个汉字或16个字符哟",
            icon: "none"
        }) : (this.setData({
            lastTimes: o
        }), this.voiceIndex = a, this.voiceId = t, this.reNameModal.showModal()) : wx.showToast({
            title: "名称不能为空哟",
            icon: "none"
        });
    },
    onLoad: function(t) {
        var a = this;
        this.redirectFrom = t.from || "", this.deleteHintModal = this.selectComponent("#deleteHint"), 
        this.speedUpModal = this.selectComponent("#speedUpModal"), this.reNameModal = this.selectComponent("#reNameModal"), 
        wx.startPullDownRefresh(), a.refreshStatus = setInterval(function() {
            var e = a.data.voiceInfoList;
            if (e.length) {
                for (var t = 0; t < e.length; t++) {
                    var o = e[t];
                    if (o && 2 != o.status && (!o.progress || o.progress <= 68)) {
                        var i = 88, n = o.createTime, s = Date.now(), c = Math.ceil((s - n) / 6e4), r = 0;
                        o.voiceSpeedInfo && o.voiceSpeedInfo.speedInfo && (r = o.voiceSpeedInfo.speedInfo.length), 
                        (i = 1 == c ? 1 + 15 * r : 2 * c + 15 * r) >= 88 && (i = 88), o.progress = i;
                    }
                    var l = new Date(o.updateTime).format("yyyy-MM-dd hh:mm:ss");
                    o.showUpdateTime = l;
                }
                a.setData({
                    voiceInfoList: e
                });
            }
        }, 1e3), e.Stats.personal_voice();
    },
    onUnload: function() {
        this.stopAudio(), clearInterval(this.refreshStatus), "trainrecord" === this.redirectFrom && wx.switchTab({
            url: "/pages/personal/index/index"
        });
    },
    onReachBottom: function() {
        var e = this;
        console.log("voice_onReachBottom | hasMore = ", e.data.hasMore), e.data.hasMore && e.getUserVoice(e.data.offset, e.data.queryCount, !1);
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.setData({
            offset: 0
        }), this.getUserVoice(this.data.offset, this.data.queryCount, !1);
    },
    onShareAppMessage: function(e) {
        return this.speedUpModal.closeModal(), "button" === e.from ? {
            title: "我使用了黑科技复刻了声音，快给我加速",
            imageUrl: "https://ossbj.xfinfr.com/3B7Z8UMY/TtsResources/xiaochengx-pic1.png",
            path: "/packageApplication/pages/accelerator/index?voiceId=" + this.voiceId
        } : {
            title: "AI复刻的声音为你播报",
            path: "/pages/index/index"
        };
    },
    clickEdit: function() {
        var e = this;
        null != e.data.voiceInfoList && 0 != e.data.voiceInfoList.length ? (e.data.isEdit = !0, 
        e.setData({
            isEdit: e.data.isEdit,
            reNameId: ""
        })) : wx.showToast({
            title: "没有可编辑的声音哦",
            icon: "none"
        });
    },
    clickFinish: function() {
        var e = this;
        e.data.isEdit = !1, e.setData({
            isEdit: e.data.isEdit
        });
    },
    clickItemPlay: function(e) {
        var t = this, a = e.currentTarget.dataset.vcn, o = !1;
        if (console.log("voice_clickItemPlay | vcn = ", a), a == t.data.currentPlayVoiceId && (a = "-1"), 
        t.stopAudio(), "-1" != a) {
            var i = t.getVoiceUrl(a);
            console.log("voice_clickItemPlay | voiceUrl = ", i), null == i ? (o = !0, t.ttsSynth(a, a)) : t.playAudio(i);
        }
        t.data.currentPlayVoiceId = a, t.setData({
            currentPlayVoiceId: t.data.currentPlayVoiceId,
            isPlayLoading: o
        });
    },
    clickItemDelete: function(e) {
        var t = this, a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.name, i = e.currentTarget.dataset.vcn;
        console.log("clickItemDelete | vcn = ", i), t.data.deleteItemIndex = a, t.data.deleteItemVcn = i, 
        t.setData({
            deleteItemName: o
        }), t.deleteHintModal.showModal();
    },
    voiceItemScrollLower: function(e) {
        var t = this;
        console.log("voice_voiceItemScrollLower | hasMore = ", t.data.hasMore), t.data.hasMore && t.getUserVoice(t.data.offset, t.data.queryCount, !1);
    },
    deleteItem: function() {
        var t = this, a = t.data.deleteItemIndex, o = t.data.deleteItemVcn;
        if (console.log("voice_deleteItem | index = ", a), console.log("voice_deleteItem | vcn = ", o), 
        t.deleteHintModal.closeModal(), o && 0 != o.length) {
            var i = {
                base: e.globalData.basequery,
                param: {
                    vcn: o
                }
            };
            e.Ajax.request({
                url: e.globalData.config.ifc.uservoicedelete,
                data: i || {}
            }, {}, {
                title: "正在删除..."
            }).then(function(e) {
                console.log("voice_deleteItem | resp = ", e), t.data.voiceInfoList.splice(a, 1), 
                t.setData({
                    voiceInfoList: t.data.voiceInfoList,
                    voiceCount: t.data.voiceCount - 1
                }), wx.showToast({
                    title: "删除声音成功",
                    icon: "none"
                });
            }).catch(function(e) {
                console.log("voice_deleteItem | err = ", e), wx.showToast({
                    title: "删除声音失败",
                    icon: "none"
                });
            });
        } else console.log("voice_deleteItem | vcn is null");
    },
    getUserVoice: function(t, a, o) {
        var i = this, n = this;
        if (t || (o = !0), n.userVoicePromise) console.log("voice_getUserVoice | requesting do nothing"); else {
            this.setData({
                loading: !0
            });
            var s = {
                base: e.globalData.basequery,
                param: {
                    offset: t,
                    count: a,
                    isNeedTotal: o,
                    voiceType: "1"
                }
            };
            n.userVoicePromise = e.Ajax.request({
                url: e.globalData.config.ifc.uservoice,
                data: s || {}
            }, {}).then(function(e) {
                if (wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), console.log("voice_getUserVoice | resp = ", e), 
                n.userVoicePromise = null, i.setData({
                    loading: !1
                }), e.voices) {
                    var a = n.data.voiceInfoList || [];
                    a = t ? a.concat(e.voices) : [].concat(e.voices);
                    for (var s = o ? e.total : n.data.voiceCount, c = 0; c < a.length; c++) {
                        var r = a[c];
                        if (r && 2 != r.status) {
                            var l = 88, d = r.createTime, u = Date.now(), v = Math.ceil((u - d) / 6e4);
                            console.log("refresh::" + r.voiceName + " | waitingMinute = (分钟)" + v);
                            var f = 0;
                            r.voiceSpeedInfo && r.voiceSpeedInfo.speedInfo && (f = r.voiceSpeedInfo.speedInfo.length), 
                            (l = 1 == v ? 1 + 15 * f : 2 * v + 15 * f) >= 88 && (l = 88), r.progress = l;
                        }
                        var h = new Date(r.updateTime).format("yyyy-MM-dd hh:mm:ss");
                        r.showUpdateTime = h;
                    }
                    n.setData({
                        voiceInfoList: a,
                        loadError: !1,
                        offset: n.data.offset + e.voices.length,
                        hasMore: e.hasMore,
                        voiceCount: s
                    });
                } else n.data.voiceInfoList.length || n.setData({
                    loadError: !0
                }), wx.showToast({
                    title: "获取我的声音失败",
                    icon: "none"
                });
            }).catch(function(e) {
                console.log("voice_getUserVoice | err = ", e), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), 
                n.userVoicePromise = null, i.setData({
                    loading: !1
                }), n.data.voiceInfoList.length || n.setData({
                    loadError: !0
                }), wx.showToast({
                    title: "获取我的声音失败",
                    icon: "none"
                });
            });
        }
    },
    ttsSynth: function(t, o) {
        var i = this;
        console.log("voice_ttsSynth | voiceId = ", t), console.log("voice_ttsSynth | vcn = ", o);
        var n = {
            base: e.globalData.basequery,
            param: {
                vcn: o,
                vcnType: 1,
                speed: 50,
                text: a
            }
        };
        e.Ajax.request({
            url: e.globalData.config.ifc.ttssynth,
            data: n || {}
        }, {}).then(function(e) {
            var a = e.url;
            console.log("voice_ttsSynth | url = ", a), a && (i.setVoiceUrl(t, a), t == i.data.currentPlayVoiceId && (i.playAudio(a), 
            i.setData({
                isPlayLoading: !1
            })));
        }).catch(function(e) {
            console.log("voice_ttsSynth | err = ", e), wx.showToast({
                title: "播放声音失败",
                icon: "none"
            }), t == i.data.currentPlayVoiceId && i.setData({
                isPlayLoading: !1,
                currentPlayVoiceId: "-1"
            });
        });
    },
    playAudio: function(a) {
        var o = this;
        t.src = a, t.play(), t.onPlay(function() {
            console.log("voice_playAudio | onPlay");
        }), t.onEnded(function() {
            console.log("voice_playAudio | onEnded"), o.setData({
                currentPlayVoiceId: "-1"
            });
        });
        try {
            e.player.getAudioProp("paused") || e.player.stop();
        } catch (e) {
            console.log(e);
        }
    },
    stopAudio: function() {
        t.stop();
    },
    setVoiceUrl: function(e, t) {
        var a = this;
        if (console.log("voice_setVoiceUrl | voiceId = " + e + ", url = " + t), e && t) {
            var o = [ {
                voiceId: e,
                url: t
            } ], i = a.data.voiceUrlList || [];
            i = i.concat(o), a.data.voiceUrlList = i;
        }
    },
    getVoiceUrl: function(e) {
        var t = this;
        if (!e) return null;
        for (var a = t.data.voiceUrlList || [], o = 0; o < a.length; o++) if (a[o].voiceId == e) return a[o].url;
        return null;
    }
});