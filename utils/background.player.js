Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("./algorithm.js"), r = e.md5, s = (e.base64, wx.getBackgroundAudioManager()), o = /(xfinfr\.com)|(haitunvoice\.com)|(xfyousheng\.com)|(voicecloud\.cn)/;

(exports.Player = function(e) {
    var o = this;
    if (this.platform = e.platform || "ios", this.audioDuration = {}, this.__listeners = {}, 
    !e) throw new Error("options null");
    this.producer = e.producer, this.player = s, this.ended = !0, this.paused = void 0, 
    this.eventNamespace = e.eventNamespace || "", this.__consume__ = function(e, s) {
        clearTimeout(o.consumeTimeout), console.log("synth __consume__() "), o.consumeTimeout = setTimeout(function() {
            console.log("synth __consume__() delay"), o.producer.update && (o.audioDuration = {}), 
            o.ended = !1, o.trigger("synthing"), o.paused = !1, o.producer.consume().then(function(t) {
                if (console.log("synth __consume__() resolved"), o.__synthing = !1, o.trigger("synthdone", Object.assign({}, t)), 
                !0 !== o.paused) {
                    o.player.currentSource = t;
                    var a = 0, n = 0, i = o.player.src && o.player.src.split("?")[0] === t.src;
                    if (e && !isNaN(e)) {
                        a = Number(e);
                        console.log("play：：" + o.player.paused + "快进时长占比：" + e);
                    }
                    var l = t.src;
                    console.log("设置音频：title::" + o.producer.title + " src:" + l), i && (o.audioDuration[r(t.src)] || o.player.duration && (o.audioDuration[r(t.src)] = o.player.duration), 
                    n = o.audioDuration[r(t.src)]), o.player.title = o.producer.title, o.player.src = l, 
                    n && a ? (o.player.paused && o.player.play(), o.player.paused ? setTimeout(function() {
                        o.player.seek(n * a);
                    }, 200) : o.player.seek(n * a)) : (console.log("时长占比：：" + a), o.seekPosPercent = a || 0), 
                    setTimeout(function() {
                        s && s();
                    });
                } else console.log("用户暂停状态退回消费记录"), o.producer.rebackconsume(t), console.log("弥补 pause :: 切按钮界面状态"), 
                o.trigger("pause");
            }).catch(function(e) {
                if (e === o.producer.error.ended) return console.warn("ALL ENDED"), o.ended = !0, 
                o.paused = void 0, void o.trigger("ended");
                e ? (console.error(e), o.paused = void 0, o.trigger("synthdone"), o.player.src = "test.com.error.synth?t=" + new Date().getTime(), 
                o.trigger("error", e)) : (console.error("unknown reason"), o.paused = void 0, o.trigger("synthdone"), 
                o.player.src = "test.com.error.synth?t=" + new Date().getTime(), o.trigger("error")), 
                console.error(e);
            });
        }, 0);
    }, [ "onPlay", "onCanplay", "onTimeUpdate", "onPause", "onStop", "onEnded", "onWaiting", "onError" ].forEach(function(e) {
        var t = ("" + e).toLowerCase().substr(2);
        s[e] && s[e](function() {
            if ("play" === t) o.paused = !1, o.trigger(t), o.player.duration && o.seekPosPercent && (o.player.seek(o.seekPosPercent * o.player.duration), 
            o.seekPosPercent = null); else if ("timeupdate" === t) o.player.currentTime && !o.player.paused && o.trigger(t); else if ("ended" === t) console.warn("single audio  Ended "), 
            o.player.pause(), o.__consume__(); else if ("canplay" === t) {
                var e = r(o.player.src), s = o.audioDuration[e];
                if (o.player.duration && !s && (o.audioDuration[e] = o.player.duration, s = o.player.duration), 
                o.seekPosPercent && s) {
                    var a = o.seekPosPercent * s;
                    console.log("canplay：：duration::" + s + "src::" + o.player.src + ";快进时长位置 s：" + a), 
                    o.player.play(), o.player.seek(a), o.seekPosPercent = null;
                }
                o.trigger(t);
            } else if ("pause" === t) {
                o.paused = !0;
                var n = o.player.currentTime + 0;
                console.log("pause time::" + n), o.trigger(t);
            } else if ("stop" === t) o.__synthing || (o.paused = void 0, o.trigger(t)); else {
                if ("error" === t) {
                    var i = o.player.currentSource;
                    o.producer.rebackconsume(i), o.paused = void 0;
                }
                o.trigger(t);
            }
        });
    });
}).prototype = {
    namespaceEvents: function(e) {
        this.eventNamespace = e;
    },
    startPlay: function() {
        this.seek(0, 0, !0);
    },
    play: function(e) {
        var r = this;
        if (this.player.paused || void 0 === this.player.paused) if (r.ended) this.seek(0, 0, !1, e); else if (this.producer.update) this.__consume__(0, e); else if (r.player.paused) if (console.log("播放器paused属性：" + r.player.paused + ";src=" + r.player.src + ";;me.paused::" + r.paused), 
        r.player.src) if (o.test(r.player.src)) {
            console.log("暂停了？？player.paused:" + r.player.paused + ";src:" + r.player.src + ";utilsPaused::" + r.paused + "；重新调用播放play()");
            var s = r.player.currentTime + 0;
            console.log(" paly after pause::" + s + "s"), r.trigger("waiting"), r.player.play(), 
            setTimeout(function() {
                e && e();
            });
        } else r.seek(0); else r.seek(0); else this.__consume__(0, e); else console.log("正在播放.."), 
        o.test(this.player.src) ? (r.trigger("waiting"), this.player.play(), setTimeout(function() {
            e && e();
        })) : this.seek(0);
    },
    pause: function() {
        var e = this;
        e.paused = !0, clearTimeout(e.consumeTimeout), e.player.play(), e.player.pause();
    },
    stop: function() {
        this.__synthing = !1, clearTimeout(this.consumeTimeout), console.log("stop appPlayer wxPlayer stop"), 
        this.player.stop(), wx.stopBackgroundAudio();
    },
    seek: function(e, r, s, o) {
        var t = this;
        this.player.stop(), wx.stopBackgroundAudio(), console.log("拖动位置：" + e + ";音频需快进：" + r || 0), 
        t.producer.seek(e, !!s), t.__synthing = !0, t.__consume__(r || null, o);
    },
    getAudioProp: function(e) {
        return this.player[e];
    },
    on: function(e, r) {
        for (var s = this, o = (e = ("" + e).toLocaleLowerCase()).split(" "), t = 0, a = o.length; t < a; t++) {
            var n = o[t] + "";
            if (n.indexOf(".") > 0) {
                var i = n.substr(0, n.indexOf(".")), l = n.substr(n.indexOf(".") + 1);
                s.__listeners[l] || (s.__listeners[l] = {}), s.__listeners[l][i] ? s.__listeners[l][i].push(r) : s.__listeners[l][i] = [ r ];
            } else s.__listeners.allnamespace || (s.__listeners.allnamespace = {}), s.__listeners.allnamespace[n] ? s.__listeners.allnamespace[n].push(r) : s.__listeners.allnamespace[n] = [ r ];
        }
    },
    off: function(e, r) {
        for (var s = this, o = (e = ("" + e).toLocaleLowerCase()).split(" "), t = 0, a = o.length; t < a; t++) {
            var n = o[t] + "";
            if (n.indexOf(".") > 0) {
                var i = n.substr(0, n.indexOf(".")), l = n.substr(n.indexOf(".") + 1);
                if ("*" === i) {
                    s.__listeners[l] = {};
                    break;
                }
                s.__listeners[l][i] = [];
            } else {
                if ("*" === n) {
                    s.__listeners.allnamespace = {};
                    break;
                }
                s.__listeners.allnamespace[n] = [];
            }
        }
    },
    trigger: function(e) {
        var r = this, s = this, o = (e = ("" + e).toLocaleLowerCase()).split(" "), t = Array.prototype.slice.apply(arguments);
        t.shift();
        for (var a = "", n = null, i = null, l = s.eventNamespace + "", p = 0, u = o.length; p < u; p++) {
            if (a = o[p] + "", (i = r.__listeners.allnamespace) && i[a] && i[a].length) for (var c in i[a]) Promise.resolve(i[a][c]).then(function(e) {
                try {
                    e && e.apply(r.player, t);
                } catch (e) {
                    console.error("执行监听方法[" + a + "]异常:" + e.message);
                }
            });
            if (l && (n = r.__listeners[l]) && n[a] && n[a].length) for (var c in n[a]) Promise.resolve(n[a][c]).then(function(e) {
                try {
                    e && e.apply(r.player, t);
                } catch (e) {
                    console.error("执行监听方法[" + a + "]异常:" + e.message);
                }
            });
        }
    },
    setPlatform: function(e) {
        console.log("set plat form", e), this.platform = "android" === e ? "android" : "ios";
    }
};