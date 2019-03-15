var e = require("../../utils/crendentials.draw.js"),
  t = getApp(),
  a = wx.createInnerAudioContext();

a.obeyMuteSwitch = !1, a.volume = .9, Page({
  data: {
    hasUsr: !1,
    reminded: !1,
    makeNumber: 0,
    hightScreen: !1,
    banners: [{
      nickName: "萌小新",
      vcn: "xiaoxin",
      image: "/images/index/banner/xiaoxin-voice@2x-min.png",
      audio: "",
      text: "哈哈哈，[[nickName]]，我是萌小新，只要录制十段话，就能永久的留下你的声音"
    }, {
      nickName: "玲姐姐",
      vcn: "xiaoling",
      image: "/images/index/banner/lingjiejie-voice@2x-min.png",
      audio: "",
      text: "hi,[[nickName]],我是玲姐姐，你可能不信，这不是录音，是留声为我复刻的声音"
    }, {
      nickName: "steve",
      vcn: "Steve",
      image: "/images/index/banner/steve-voice@2x-min.png",
      audio: "",
      text: "hello，[[nickName]]。Can you say tongue twisters like me？Rita repeated what Reardon recited when Reardon read the remarks."
    }, {
      nickName: "瑶瑶",
      vcn: "yaoyao",
      image: "/images/index/banner/yaoyao-voice@2x-min.png",
      audio: "",
      text: "[[nickName]]，你好。你会说绕口令吗？七巷一个漆匠，西巷一个锡匠。七巷漆匠用了西巷锡匠的锡，西巷锡匠拿了七巷漆匠的漆，七巷漆匠气西巷锡匠用了漆，西巷锡匠讥七巷漆匠拿了锡。"
    }, {
      nickName: "光仔",
      vcn: "xiaoguan",
      image: "/images/index/banner/guangzai-voice@2x-min.png",
      audio: "",
      text: "hi，[[nickName]]。每天晚上睡觉前，用复刻的声音给小宝宝读故事，我在旁边看书，听歌，太方便了"
    }, {
      nickName: "婧老师",
      vcn: "jinger",
      image: "/images/index/banner/jinglaoshi-voice@2x-min.png",
      audio: "",
      text: "[[nickName]]，你好。小时候有个梦想，就是当一名播音主持人，自从有了留声，口齿不清的我，连绕口令都念顺溜了。赶紧复刻声音，跟我一起玩转声音吧"
    }],
    playing: !1,
    playingSrc: "",
    credentialsBtnDisabled: !0,
    confirmBtnType: "1",
    hasUnCompleteTask: !1,
    hasAllComplete: !1,
    nextStriveTime: "",
    nextStriveTimeDisplay: "",
    hasStrived: !1,
    hasAuthTime: !1,
    hasStriveTimes: 0,
    timesIndexTips: 100,
    showIndexGuide: 100,
    invitateWrapperTop: 0,
    buttonTop: 0
  },
  onHide: function() {
    clearInterval(this.trainNumberInterval), this.trainNumberInterval = null, this.audioContext.pause(),
      this.synthVoiceTask && this.synthVoiceTask.task && this.synthVoiceTask.task.abort();
  },
  onShow: function() {
    var e = this;
    e.getTrainNumber(), wx.getSystemInfo({
      success: function(t) {
        console.warn("windowHeight", t), console.warn("windowWidth", t.windowWidth), t.windowHeight / t.windowWidth >= 902 / 562 && (e.setData({
          hightScreen: !0
        }), e.getAllRects());
      }
    }), e.audioContext.onCanplay(function() {
      console.warn("首页音频播放onCanplay事件");
    }), e.audioContext.onPlay(function() {
      console.warn("首页音频播放play事件");
      var a = e.audioContext.src;
      t.player.stop(), e.setData({
        playing: !0,
        playingSrc: a
      });
    }), e.audioContext.onWaiting(function() {
      var t = e.audioContext.src;
      console.warn("首页音频播放加载中..." + t), e.setData({
        playing: !0,
        playingSrc: t
      });
    }), e.audioContext.onEnded(function() {
      console.warn("ended"), e.setData({
        playing: !1
      });
    }), e.audioContext.onStop(function() {
      console.log("stop"), e.setData({
        playing: !1
      });
    }), e.audioContext.onPause(function() {
      console.log("pause"), e.setData({
        playing: !1
      });
    }), e.audioContext.onError(function() {
      wx.showToast({
        title: "播放异常",
        icon: "none"
      }), e.setData({
        playing: !1,
        playingSrc: ""
      });
    }), this.striveNextReleace();
    var a = t.getProgress(),
      i = !1;
    a && a.currentIdx ? (a.completeItemLength >= t.globalData.config.dataCfg.recordNumber && (i = !0),
      a.taskId && (t.globalData.recordInfo.taskId = a.taskId, t.globalData.recordInfo.trainNoticeId = a.trainNoticeId,
        this.setData({
          hasUnCompleteTask: !0,
          hasAllComplete: i
        }))) : this.setData({
      hasUnCompleteTask: !1,
      hasAllComplete: i
    }), e.getStoreStrivedTime && e.getStoreStrivedTime(), e.initStriveTimes(), t.Login.getUserInfo(t, function() {
      console.log("获取用户信息"), e.setData({
        hasUsr: !0
      }), e.userAuthTime();
    }, function() {
      console.log("尚未授权");
    }, function() {
      console.warn("获取用户信息失败"), wx.showToast({
        title: "微信登录异常",
        icon: "none"
      });
    }, !0), t.globalData.makeModal && e.iknowUploadModal.showModal();
  },
  getAllRects: function() {
    var e = this;
    wx.createSelectorQuery().select(".entry-btn").boundingClientRect(function(t) {
      console.warn(t), e.setData({
        buttonTop: t.top
      });
    }).exec(), wx.createSelectorQuery().select("#invitateWrapper").boundingClientRect(function(t) {
      console.warn(t), e.setData({
        invitateWrapperTop: t.top
      });
    }).exec();
  },
  iknownUpload: function(e) {
    t.globalData.makeModal = !1;
  },
  iknownRemind: function(e) {
    this.remindModal.closeModal(), this.setData({
      reminded: !0
    });
  },
  getVisitChannel: function(e) {
    return (e = e || "") && /index\.cnl\./.test(e) ? e.substr("index.cnl.".length) || "" : "";
  },
  onUnload: function() {
    clearInterval(this.trainNumberInterval), this.trainNumberInterval = null;
  },
  onLoad: function(i) {
    var n = this;
    n.getAllRects(), n.audioContext = a, console.log("onLoad() options = ", i), this.canshowIndexTimesGuide(),
      this.canShowIndexGuide(), this.getStoreStrivedTime = function() {
        try {
          wx.getStorage({
            key: t.Config.lkey.nexttimestrived,
            success: function(e) {
              n.strivedTime = e.data;
              var a = !1;
              console.log("last strived time:" + n.transferTimeSpace2Date(n.strivedTime)), a = !!(n.strivedTime && (new Date().getTime() - Date.parse(n.transferTimeSpace2Date(n.strivedTime))) / 1e3 < 3600 * t.Config.dataCfg.strivespace),
                n.setData({
                  hasStrived: a
                });
            },
            fail: function(e) {
              n.strivedTimeGetError = !0, n.setData({
                hasStrived: !1
              });
            }
          });
        } catch (e) {
          console.warn("storetime" + e.message);
        }
      }, this.transferTimeSpace2Date = function(e) {
        if ((e = "" + e) && e.length >= 10) {
          var t = e.substring(0, 4) + "-" + e.substring(4, 6) + "-" + e.substring(6, 8) + " " + e.substring(8, 10) + ":00:00";
          return t = t.replace(/-/g, "/");
        }
        return null;
      }, this.striveNextReleace = function() {
        if (n.interval && !n.striveTimeGetError && n.strivedTime || n.getStoreStrivedTime(),
          n.data.nextStriveTime && n.strivedTime) {
          clearTimeout(n.initialSTtask), n.initialSTtask = null;
          n.data.nextStriveTime;
          var e = !1;
          e = (new Date().getTime() - Date.parse(n.transferTimeSpace2Date(n.strivedTime))) / 1e3 < 3600 * t.Config.dataCfg.strivespace,
            n.setData({
              hasStrived: e
            }), n.viewTimeDisplay("" + n.data.nextStriveTime);
        } else !n.initialSTtask && (n.initialSTtask = setTimeout(function() {
          n.initStriveTimes();
        }, 1e3));
        n.interval || (n.interval = setInterval(function() {
          n.striveNextReleace();
        }, 1e3));
      }, this.viewTimeDisplay = function(e) {
        var t = ("" + e).substring(8, 10);
        "" !== t && void 0 !== t && (t = Number(t) + "");
        var a = new Date(Date.parse(n.transferTimeSpace2Date(e))),
          i = new Date(),
          o = "";
        a.getTime() > i.getTime() && a.getDate() != i.getDate() && (o += "明天"), n.setData({
          nextStriveTime: e + "",
          nextStriveTimeDisplay: o + Number(t)
        });
      }, this.iknowUploadModal = this.selectComponent("#uploadTip"), this.remindModal = this.selectComponent("#remindTip"),
      this.querySamples = function(e) {
        return t.Ajax.request({
          url: t.globalData.config.ifc.traintext,
          data: e
        });
      }, this.credentialsModal = this.selectComponent("#credentialsModal");
    try {
      this.res = wx.getSystemInfoSync();
    } catch (e) {}
    t.Login.getUserInfo(t, function() {
      try {
        (i.showcredentials || i.voiceName && i.vcn) && (e.credentialsCard(n, "credentialsCanvas", n.res, t, {
          headerImage: t.globalData.userInfo.avatarUrl,
          userInfo: t.globalData.userInfo,
          voiceName: decodeURIComponent(i.voiceName || "我的声音"),
          voiceId: i.vcn || ""
        }), n.setData({
          confirmBtnType: "2",
          credentialsBtnDisabled: !1
        })), (i.showcredentials || i.voiceName && i.vcn) && (t.Stats.view_credentials(),
          t.aldstat.sendEvent("音库证书页展示[通知点击]", {
            "用户渠道": t.aldMediaId
          }), n.credentialsModal.showModal());
      } catch (e) {
        console.error(e), n.setData({
          confirmBtnType: "1"
        });
      }
    }, function() {
      console.log("尚未授权--");
    }, function() {
      console.warn("获取用户信息失败---");
    }), this.initStriveTimes = function() {
      return t.Ajax.request({
        url: t.globalData.config.ifc.strivetimes,
        data: {
          base: t.globalData.basequery,
          param: {}
        }
      }, {}).then(function(e) {
        e.times ? n.setData({
          hasStriveTimes: e.times
        }) : n.setData({
          hasStriveTimes: 0
        }), e.nextStriveDayDate && n.viewTimeDisplay(e.nextStriveDayDate);
      }).catch(function(e) {
        n.setData({
          hasStriveTimes: 0
        }), e && e.nextStriveDayDate && n.viewTimeDisplay(e.nextStriveDayDate);
      });
    }, this.initStriveTimes(), this.striveTimes = function(e) {
      try {
        console.error(new Date().format("yyyyMMddhh")), n.setData({
          hasStrived: !0
        }), wx.setStorage({
          key: t.Config.lkey.nexttimestrived,
          data: new Date().format("yyyyMMddhh")
        });
      } catch (e) {}
      t.Ajax.request({
        url: t.globalData.config.ifc.timesstrive,
        data: e || {
          base: t.globalData.basequery,
          param: {}
        }
      }, {}, {
        title: "正在抢取..."
      }).then(function(e) {
        if (e.times || n.data.hasAuthTime) return n.setData({
          hasAuthTime: e.times
        }), t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
          "用户渠道": t.aldMediaId,
          "机会来源": "限量抢机会",
          "是否继续": "新做"
        }), void n.gotomakefirst();
        wx.showToast({
          title: "很遗憾,未抢到限量机会",
          icon: "none"
        }), e.nextStriveDayDate ? (n.viewTimeDisplay(e.nextStriveDayDate), n.striveNextReleace()) : n.initStriveTimes({
          base: t.globalData.basequery,
          param: {}
        });
      }).catch(function(e) {
        n.data.hasAuthTime ? n.gotomakefirst() : (e && e.base && "900001" == e.base.retCode ? wx.showToast({
          title: "当前时段您已抢过",
          icon: "none"
        }) : wx.showToast({
          title: "网络异常,请稍后重试",
          icon: "none"
        }), e && e.nextStriveDayDate && (n.viewTimeDisplay(e.nextStriveDayDate), n.striveNextReleace()));
      });
    }, this.userAuthTime = function(e) {
      var a = {
        base: t.globalData.basequery,
        param: {}
      };
      return t.Ajax.request({
        url: t.globalData.config.ifc.authtimes,
        data: a
      }, {}).then(function(t) {
        t.times ? (n.setData({
          hasAuthTime: t.times
        }), e && n.gotomakefirst()) : n.setData({
          hasAuthTime: !1
        });
      }).catch(function(t) {
        e && wx.showToast({
          title: "获取训练次数异常",
          icon: "none"
        });
      });
    }, this.gotomakefirst = function() {
      t.Stats.start_makevoice(""), t.isMobildBind() ? wx.navigateTo({
        url: "/pages/voicemake/guidefirst/index"
      }) : t.globalData.userInfo ? wx.navigateTo({
        url: "/pages/voicemake/guidefirst/index"
      }) : wx.showToast({
        title: "用户信息异常",
        icon: "none"
      });
    };
  },
  canShowIndexGuide: function() {
    var e = wx.getStorageSync(t.globalData.config.lkey.indexguideKey);
    wx.getStorageSync(t.globalData.config.lkey.indexguideKey) ? this.setData({
      showIndexGuide: e
    }) : this.setData({
      showIndexGuide: 0
    });
  },
  canshowIndexTimesGuide: function() {
    var e = wx.getStorageSync(t.globalData.config.lkey.indextimesguideKey);
    e ? this.setData({
      timesIndexTips: e
    }) : this.setData({
      timesIndexTips: 0
    });
  },
  iKnowIndexGuide: function(e) {
    var a = this.data.showIndexGuide;
    a++, wx.setStorageSync(t.globalData.config.lkey.indexguideKey, a), this.setData({
      showIndexGuide: a
    });
  },
  iKnowIndexTimesGuide: function() {
    var e = this.data.timesIndexTips + 1;
    this.setData({
      timesIndexTips: e
    }), wx.setStorageSync(t.globalData.config.lkey.indextimesguideKey, e);
  },
  gotUsrInfo: function(e) {
    t.aldstat.sendEvent("[首页]按钮与邀请码去重", {
      "用户渠道": t.aldMediaId
    });
    var a = this;
    e.detail.userInfo ? t.Login.getUserInfo(t, function() {
      console.log("获取用户信息"), a.setData({
        hasUsr: !0
      }), a.userAuthTime().then(function(e) {
        if (a.data.hasAuthTime)
          if (t.Stats.voicemake(1), a.data.hasUnCompleteTask) {
            if (t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
                "用户渠道": t.aldMediaId,
                "机会来源": "原有剩余机会",
                "是否继续": "续做"
              }), !a.data.hasAllComplete) {
              var i = {
                base: t.globalData.basequery,
                param: {
                  categoryId: "1001"
                }
              };
              return a.querySamples(i).then(function(e) {
                if (e.trainTexts && e.trainTexts[0]) return t.globalData.recordInfo.textId = e.trainTexts[0].textId,
                  t.globalData.recordInfo.textSegs = e.trainTexts[0].textSegs, void wx.navigateTo({
                    url: "/pages/voicemake/main/index"
                  });
              }).catch(function(e) {
                wx.showToast({
                  title: "录音范文加载异常,请稍后再试",
                  icon: "none"
                });
              });
            }
            wx.navigateTo({
              url: "/pages/voicemake/submit/index"
            });
          } else a.gotomakefirst();
        else a.data.hasStriveTimes ? (t.Stats.voicemake(3), a.striveTimes({
          base: t.globalData.basequery,
          param: {}
        })) : (t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
          "用户渠道": t.aldMediaId,
          "机会来源": "禁止制作，无机会",
          "是否继续": "新做"
        }), console.log("没有剩余次数，且 没有权限"), wx.showToast({
          title: "很遗憾,未抢到限量机会",
          icon: "none"
        }), a.setData({}));
      }).catch(function(e) {
        wx.showToast({
          title: "数据加载失败,请稍后再试",
          icon: "none"
        });
      });
    }, function() {
      console.log("尚未授权");
    }, function() {
      console.warn("获取用户信息失败"), t.Stats.voicemake(0), wx.showToast({
        title: "微信登录异常",
        icon: "none"
      });
    }, !0) : console.log("用户拒绝授权，禁止用户深入操作");
  },
  gotUsrInfoBeforeCode: function(e) {
    e.detail.userInfo ? t.Login.getUserInfo(t, function() {
      console.log("获取用户信息"), wx.navigateTo({
        url: "/pages/voicemake/invitecode/index"
      });
    }, function() {
      console.log("尚未授权");
    }, function() {
      console.warn("获取用户信息失败"), wx.showToast({
        title: "微信登录异常",
        icon: "none"
      });
    }, !0) : console.log("用户拒绝授权，禁止用户深入操作");
  },
  bindInviteCode: function(e) {
    t.aldstat.sendEvent("[首页]按钮与邀请码去重", {
      "用户渠道": t.aldMediaId
    }), t.aldstat.sendEvent("[制作tab首页]绑定邀请码点击", {
      "用户渠道": t.aldMediaId
    }), wx.navigateTo({
      url: "/pages/voicemake/invitecode/index"
    });
  },
  onConfirm: function(e) {
    var a = this;
    e.detail && "2" === e.detail.btnType && this.res ? wx.canvasToTempFilePath({
      canvasId: "credentialsCanvas",
      fileType: "png",
      success: function(e) {
        console.log(e.tempFilePath), e.tempFilePath && (t.aldstat.sendEvent("音库证书保存", {
          "用户渠道": t.aldMediaId
        }), t.Stats.save_credentials(), wx.saveImageToPhotosAlbum({
          filePath: e.tempFilePath,
          success: function() {
            a.credentialsModal.hideModal();
          }
        }));
      },
      fail: function(e) {
        console.error(e);
      }
    }) : this.credentialsModal.hideModal();
  },
  voiceMakeGuide: function(e) {
    var a = this;
    t.aldstat.sendEvent("[首页]按钮与邀请码去重", {
        "用户渠道": t.aldMediaId
      }), t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
        "用户渠道": t.aldMediaId,
        "机会来源": "原有剩余机会",
        "是否继续": "新做"
      }), console.log("FORMID::", e.detail.formId), a.uploadFormId(e.detail.formId, 2),
      this.gotomakefirst(), t.Stats.voicemake(1);
  },
  striveLimitedTime: function(e) {
    var a = this;
    console.log("FORMID::", e.detail.formId), a.uploadFormId(e.detail.formId, 2), t.aldstat.sendEvent("[首页]按钮与邀请码去重", {
      "用户渠道": t.aldMediaId
    }), this.striveTimes({
      base: t.globalData.basequery,
      param: {}
    }), t.Stats.voicemake(3);
  },
  disableStrive: function(e) {
    var a = this;
    console.warn("点击 disabled"), console.log("FORMID::", e.detail.formId), a.uploadFormId(e.detail.formId, 2),
      t.aldstat.sendEvent("[首页]按钮与邀请码去重", {
        "用户渠道": t.aldMediaId
      }), t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
        "用户渠道": t.aldMediaId,
        "机会来源": "禁止制作，无机会",
        "是否继续": "新做"
      });
  },
  continueVoiceMake: function(e) {
    var a = this;
    if (console.log("FORMID::", e.detail.formId), a.uploadFormId(e.detail.formId, 2),
      t.aldstat.sendEvent("[首页]按钮与邀请码去重", ""), t.aldstat.sendEvent("[制作tab首页]制作按钮点击", {
        "机会来源": "原有剩余机会",
        "是否继续": "续做"
      }), t.Stats.voicemake(2), !this.data.hasAllComplete) {
      var i = {
        base: t.globalData.basequery,
        param: {
          categoryId: "1001"
        }
      };
      return a.querySamples(i).then(function(e) {
        if (e.trainTexts && e.trainTexts[0]) return t.globalData.recordInfo.textId = e.trainTexts[0].textId,
          t.globalData.recordInfo.textSegs = e.trainTexts[0].textSegs, void wx.navigateTo({
            url: "/pages/voicemake/main/index"
          });
      }).catch(function(e) {
        wx.showToast({
          title: "数据加载异常,请稍后再试",
          icon: "none"
        });
      });
    }
    wx.navigateTo({
      url: "/pages/voicemake/submit/index"
    });
  },
  remindSubmit: function(e) {
    var a = this,
      i = this;
    console.log("form发生了submit事件，携带数据为：", e.detail.value), console.log("formId" + e.detail.formId);
    var n = {
        base: t.globalData.basequery,
        param: {
          remindNoticeId: e.detail.formId
        }
      },
      o = "";
    if (i.data.nextStriveTime) try {
      "" !== (o = ("" + i.data.nextStriveTime).substring(8, 10)) && void 0 !== o && (o = Number(o) + "");
    } catch (e) {}
    o && t.Stats.remind_strive(o), o && t.aldstat.sendEvent("[制作tab首页]预约提醒点击", {
      "用户渠道": t.aldMediaId,
      date: o || ""
    }), t.Ajax.request({
      url: t.globalData.config.ifc.remindstrive,
      data: n
    }, null, {
      title: "提交中..."
    }).then(function(e) {
      a.remindModal.showModal();
    }).catch(function(e) {
      wx.showToast({
        title: "预约失败,请稍后再试",
        icon: "none"
      });
    });
  },
  toProduct: function(e) {
    t.aldstat.sendEvent("查看教程", {
      "用户渠道": t.aldMediaId,
      "事件来源": "首页"
    }), wx.navigateTo({
      url: "/pages/activity/product/index"
    });
  },
  onShareAppMessage: function() {
    return {
      title: "AI复刻的声音为你播报",
      path: "/pages/index/index"
    };
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  getTrainNumber: function() {
    var e = this,
      a = {
        base: t.globalData.basequery,
        param: {}
      };
    t.Ajax.request({
      url: t.globalData.config.ifc.trainNumber,
      data: a
    }, null).then(function(t) {
      e.setData({
        makeNumber: t.number
      });
    }).catch(function(e) {});
  },
  bannerVoiceTap: function(e) {
    var a = this,
      i = e.currentTarget.dataset.audioSrc || "",
      n = e.currentTarget.dataset.audioName || "",
      o = {
        "用户渠道": t.aldMediaId,
        "卡片名称": n || ""
      };
    i && a.data.playing && i === a.data.playingSrc ? (console.log("音频暂停"), a.audioContext.pause()) : i && i === a.data.playingSrc ? (t.aldstat.sendEvent("[首页]声音卡片点击", o),
      console.warn("卡片点击统计：：[首页]声音卡片点击" + JSON.stringify(o)), a.audioContext.play()) : (t.aldstat.sendEvent("[首页]声音卡片点击", o),
      console.warn("卡片点击统计：：[首页]声音卡片点击" + JSON.stringify(o)), a.audioContext.src = i,
      a.audioContext.play());
  },
  tapCard: function(e) {
    function a(e, a) {
      e && a.data.playing && e === a.data.playingSrc ? (console.log("音频暂停"), a.audioContext.pause()) : e && e === a.data.playingSrc ? (t.aldstat.sendEvent("[首页]声音卡片点击", d),
        console.warn("卡片点击统计：：[首页]声音卡片点击" + JSON.stringify(d)), a.audioContext.play()) : (t.aldstat.sendEvent("[首页]声音卡片点击", d),
        console.warn("卡片点击统计：：[首页]声音卡片点击" + JSON.stringify(d)), a.audioContext.src = e,
        a.audioContext.play());
    }
    console.log(e.detail.cardObj);
    var i = this,
      n = e.detail.cardObj.audio || "",
      o = e.detail.cardObj.vcn || "",
      s = e.detail.cardObj.nickName || "",
      r = e.detail.cardObj.text || "";
    r = r.replace("[[nickName]]", t.globalData.userInfo && t.globalData.userInfo.nickName || "");
    var l = e.detail.cardIndex,
      d = {
        "用户渠道": t.aldMediaId,
        "卡片名称": s || ""
      };
    n ? a(n, i) : (console.log("其他音频暂停"), i.audioContext.pause(), this.synth(o, 2, r).then(function(e) {
      console.log(e.url), i.data.banners[l].audio = e.url, i.setData({
        banners: i.data.banners
      }), a(e.url, i), wx.hideLoading();
    }).catch(function(e) {
      wx.hideLoading();
    }));
  },
  cardShown: function(e) {
    var t = e.detail.cardObj;
    this.setData({
      currentCardItem: t
    }), console.log("card shown::" + t.nickName);
  },
  synth: function(e, a, i) {
    var n = this,
      o = {
        vcn: e,
        vcnType: a || 2,
        speed: 60,
        vol: 100,
        text: i
      },
      s = {
        base: t.globalData.basequery,
        param: o
      };
    return wx.showLoading({
        title: "正在加载...",
        mask: !0
      }), n.synthVoiceTask && n.synthVoiceTask.task && n.synthVoiceTask.task.abort(),
      n.synthVoiceTask = t.Ajax.request({
        url: "https://mina.xfliusheng.com/synth/ttssynth",
        data: s
      }), n.synthVoiceTask;
  },
  uploadFormId: function(e, a) {
    try {
      t.Ajax.request({
        url: t.globalData.config.ifc.uploadwxformid,
        data: {
          base: t.globalData.basequery,
          param: {
            form: {
              formId: e,
              type: a || 1
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