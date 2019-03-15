function t(t, r, s, n) {
    Object.defineProperty(t, r, {
        value: s,
        enumerable: !!n,
        writable: !0,
        configurable: !0
    });
}

function r(t, r) {
    var s = {};
    Object.assign(s, c, t);
    var o = null, i = new n(function(t, n) {
        l = new Date().getTime(), (o = e.request({
            url: s.url,
            data: s.data
        })).then(function(r) {
            console.warn("请求合成---\x3e接收结果耗时:::" + (new Date().getTime() - l) + "ms"), t(r);
        }).catch(function(t) {
            "abort" === t ? r.userAbort ? (console.warn("捕获 主动abort"), r.userAbort = !1, n(a.unhandle)) : (r.userAbort = !1, 
            n(a.abort)) : (console.warn("请求合成失败---\x3e接收结果耗时:::" + (new Date().getTime() - l) + "ms"), 
            n(t && t.errMsg ? /timeout/g.test(t.errMsg) ? a.timeout : a.syntherror : t));
        });
    });
    return i.synthReq = o.task, i;
}

function s(s) {
    var e = this, c = (s = s || {}).cacheSize || i;
    e.cacheSize = c, this.title = s.title || " ", this.paragraphs = s.paragraphs || [], 
    this.audios = [], this.synthOption = {}, this.cursor = 0, this.update = !0, this.synthingPromise = null, 
    this.timeouts = [], this.synthingCall = function() {
        if (console.info("合成中..."), e.synthingPromise) console.info("存在合成中。。"); else {
            e.synthingCalling = !1;
            var t = Object.assign({}, e.paragraphs[e.cursor]);
            if (t.index = e.cursor + 0, t.url) {
                o = {
                    index: e.cursor,
                    audioType: "support",
                    url: t.url
                };
                e.synthingPromise = n.resolve(Object.assign({}, t, o));
            } else if (t.src) {
                var o = {
                    index: e.cursor,
                    audioType: "synthed",
                    url: t.src
                };
                e.synthingPromise = n.resolve(Object.assign({}, t, o));
            } else {
                if (!h(t.txt || "")) return e.cursor += 1, void (e.cursor < e.paragraphs.length ? e.synthingCall() : e.synthingPromise = n.reject(a.ended));
                var i = {
                    data: {
                        base: s.basequery,
                        param: Object.assign({
                            text: t.txt
                        }, u, e.synthOption)
                    }
                };
                s.url && (i.url = s.url), e.synthingPromise = r(i, e);
            }
            e.synthingPromise.then(function(r) {
                var s = "合成成功::";
                "support" == r.audioType ? s = "‘合成成功’，直接采用外部指定音频::" : "synthed" == r.audioType && (s = "‘合成成功’，直接采用缓存的已合成音频::"), 
                console.log(s + JSON.stringify({
                    src: r.url,
                    index: t.index,
                    text: "" + t.txt,
                    startWordIdx: t.startWordIdx,
                    totalWords: t.totalWords
                })), e.synthingPromise = null, e.audios.push({
                    src: r.url,
                    index: t.index,
                    text: t.txt,
                    startWordIdx: t.startWordIdx,
                    totalWords: t.totalWords
                }), "support" === r.audioType || e.paragraphs[e.cursor].src || (e.paragraphs[e.cursor].src = r.url), 
                e.cursor += 1;
            }).catch(function(r) {
                e.synthingPromise = null, r !== a.unhandle ? console.error("合成失败：" + JSON.stringify({
                    index: t.index,
                    text: "" + t.txt,
                    startWordIdx: t.startWordIdx,
                    totalWords: t.totalWords
                })) : console.warn("捕获 主动abort.2");
            });
        }
    }, [ "push", "pop", "shift", "unshift" ].forEach(function(r) {
        var s = o[r];
        t(e.audios, r, function() {
            for (var t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t];
            var o = s.apply(this, n);
            return console.log("[" + r + "] 数据变更" + ("push" == r || "unshift" == r ? "压进数据" : "弹出数据")), 
            e.synthingPromise || e.synthingCalling || (e.cursor < e.paragraphs.length ? e.audios.length < e.cacheSize && (console.log("[" + r + "] (" + ("push" == r || "unshift" == r ? "压进数据" : "消费数据") + ") 触发新一轮cache自检测==>触发的合成"), 
            e.synthingCalling = !0, e.timeouts.push(setTimeout(function() {
                try {
                    e.synthingCall();
                } catch (t) {
                    console.error(t.message);
                }
            }, 0))) : console.log("已合成完毕，不再合成")), o;
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("./es6-promise.min.js"), e = require("./wx.request.js"), o = Array.prototype, i = 2, a = {
    timeout: "error::timeout",
    ended: "error::sourceended",
    nonsource: "error::nonsource",
    syntherror: "error::synth",
    abort: "error::abort",
    unhandle: "error::unhandle"
}, u = {
    speed: 50,
    vcnType: 2,
    vol: 100,
    vcn: "xiaoyuan"
}, h = function(t) {
    return !(!t.match(/\[p(\d)+\]/) && !t.match(/[A-Za-z0-9\u4e00-\u9fa5]/));
}, c = {
    url: "https://mina.xfliusheng.com/synth/ttssynth"
}, l = 0;

s.prototype = {
    error: a,
    initData: function(t) {
        var r = this;
        if (r.cursor = t.cursor || 0, r.title = t.title || " ", r.paragraphs = t.paragraphs || [], 
        r.synthingPromise && r.synthingPromise.synthReq) try {
            r.synthingPromise.synthReq.abort && ((r.userAbort = !0) || 1) && r.synthingPromise.synthReq.abort();
        } catch (t) {
            console.warn("取消音频合成请求主动捕获异常：" + t.message);
        }
        r.synthingPromise = null, r.audios.splice(0, r.audios.length), Object.assign(r.synthOption, u, t.synthOption || {}), 
        r.timeouts.forEach(function(t) {
            clearTimeout(t);
        }), r.timeouts = [], r.update = !0;
    },
    updateSynthConfig: function(t) {
        var r = this;
        if (t.cursor && (r.cursor = t.cursor || 0), r.title = t.title || r.title || " ", 
        r.paragraphs.forEach(function(t) {
            t.src = "";
        }), r.synthingPromise && r.synthingPromise.synthReq) try {
            r.synthingPromise.synthReq.abort && ((r.userAbort = !0) || 1) && r.synthingPromise.synthReq.abort();
        } catch (t) {
            console.warn("取消音频合成请求主动捕获异常：" + t.message);
        }
        r.audios.splice(0, r.audios.length), r.synthingPromise = null, t.synthOption && Object.assign(r.synthOption, t.synthOption || {}), 
        r.timeouts.forEach(function(t) {
            clearTimeout(t);
        }), r.timeouts = [], r.update = !0;
    },
    seek: function(t, r) {
        var s = this;
        if (s.cursor = t < s.paragraphs.length ? t : 0, s.synthingPromise && s.synthingPromise.synthReq) try {
            s.synthingPromise.synthReq.abort && ((s.userAbort = !!r) || 1) && s.synthingPromise.synthReq.abort();
        } catch (t) {
            console.warn("取消音频合成请求主动捕获异常：" + t.message);
        }
        s.audios.splice(0, s.audios.length), s.synthingPromise = null, s.timeouts.forEach(function(t) {
            clearTimeout(t);
        }), s.timeouts = [];
        try {
            s.synthingCall();
        } catch (t) {}
    },
    consume: function() {
        var t = this;
        t.update = !1;
        t.audios.length;
        return new n(function(r, s) {
            t.audios.length ? (r(t.audios.shift()), console.log("消费数据")) : t.cursor < t.paragraphs.length ? (t.synthingPromise || t.synthingCall(), 
            t.synthingPromise.then(function(s) {
                var n = t.audios.shift();
                r(n), console.log("消费数据");
            }, function(t) {
                t === a.unhandle ? console.warn("主动捕获 abort.3") : s("[object String]" === Object.prototype.toString.call(t) && /error::/.test(t) ? t : a.syntherror);
            })) : s(0 == t.paragraphs.length ? a.nonsource : a.ended);
        });
    },
    rebackconsume: function(t) {
        var r = this;
        if (r.synthingPromise && r.synthingPromise.synthReq) try {
            r.synthingPromise.synthReq.abort && ((r.userAbort = !0) || 1) && r.synthingPromise.synthReq.abort();
        } catch (t) {
            console.warn("暂停操作，取消音频合成请求主动捕获异常：" + t.message);
        }
        r.synthingPromise = null, r.timeouts.forEach(function(t) {
            clearTimeout(t);
        }), r.timeouts = [], r.audios.unshift(Object.assign({}, t));
    }
}, exports.Producer = s;