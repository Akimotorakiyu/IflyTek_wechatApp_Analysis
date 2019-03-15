function e(e) {
    if (Array.isArray(e)) {
        for (var n = 0, r = Array(e.length); n < e.length; n++) r[n] = e[n];
        return r;
    }
    return Array.from(e);
}

function n(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.backgroundPlayer = void 0;

var r = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), t = require("./tts-synthesizer.js"), o = 0, a = 0, i = "", l = "", s = function() {
    function s() {
        for (var r = this, c = arguments.length, u = Array(c), f = 0; f < c; f++) u[f] = arguments[f];
        n(this, s);
        var g = u[u.length - 1] && "[object Boolean]" === Object.prototype.toString.call(u[u.length - 1]) ? console : function() {
            var e = {}, n = function() {};
            return Object.keys(console).forEach(function(r) {
                e[r] = n;
            }), e;
        }(), y = {
            pause: "pause",
            stop: "stop",
            unset: !1
        }, p = {
            onCanplay: {},
            onWaiting: {},
            onPlay: {},
            onSeeked: {},
            onSeeking: {},
            onTimeUpdate: {},
            onPause: {},
            onEnded: {},
            onStop: {},
            onError: {},
            onPrev: {},
            onNext: {},
            onSynthing: {},
            onSynthSuccess: {},
            onSynthError: {}
        }, d = {}, h = y.unset, P = function(e, n, r) {
            p[e][n] ? p[e][n].unshift(r) : p[e][n] = [ r ];
        }, v = function(n) {
            for (var i = arguments.length, c = Array(i > 1 ? i - 1 : 0), u = 1; u < i; u++) c[u - 1] = arguments[u];
            try {
                if ("onEnded" === n && o < a) {
                    var f = t.synthesizer.ttResp(o);
                    f && (r.title = "" + l, r.src = f);
                }
            } catch (e) {
                console.error(e);
            }
            try {
                for (var g = [].concat(e(r.emitcontext)), y = null, h = 0, P = g.length; h < P; h++) {
                    if (p[n][g[h]]) for (var v in p[n][g[h]]) {
                        var m;
                        if (!1 === (m = p[n][g[h]])[v].apply(m, c)) break;
                    }
                    null === y && d[g[h]] && (y = h);
                }
                if (null !== y && p[n][s.gcontext]) for (var v in p[n][s.gcontext]) {
                    var x;
                    if (!1 === (x = p[n][s.gcontext])[v].apply(x, c)) break;
                }
            } catch (e) {
                console.error(e);
            }
        };
        this.emitcontext = [ s.gcontext ], this.gPlayer = wx.getBackgroundAudioManager(), 
        this.ended = !1, this.inited = !1;
        var m = void 0;
        [ "src", "title", "epname", "singer", "startTime", "coverImgUrl", "currentTime", "duration", "paused", "buffered", "webUrl", "protocol" ].forEach(function(e) {
            Object.defineProperty(r, e, {
                get: function() {
                    return this.gPlayer[e];
                },
                set: function(n) {
                    var r = this;
                    if ([ "src", "title", "epname", "singer", "coverImgUrl", "startTime", "webUrl", "protocol" ].indexOf(e) > -1) if ("src" === e) {
                        if (!i) throw new Error("backgroundPlayer should set a context to speciafy this src from where before use player , please use [initContext] function at first");
                        if (!a) throw new Error("backgroundPlayer should set audios-length  to play , please use [currentAudiosLength(num)] function at first");
                        if (m = {}, this.ended = !1, n) if (n instanceof Promise) {
                            h = y.unset;
                            var t = m;
                            this.inited && this.src && !this.ended && !this.paused && void 0 !== this.paused && this.stop(), 
                            v("onSynthing", n.__origin), n.then(function(e) {
                                if (g.log("合成成功", e), g.warn(r.markerPlayerRes(e.url, i)), t === m) {
                                    v("onSynthSuccess", n.__origin);
                                    try {
                                        if (g.log("设置异步音频成功", r.markerPlayerRes(e.url, i)), r.gPlayer.title = l || "", r.gPlayer.src = r.markerPlayerRes(e.url, i), 
                                        r.inited = !0, h) return;
                                        h = y.unset;
                                    } catch (e) {
                                        h = y.stop, g.error("bgPlayer || ", e);
                                    }
                                } else g.log("之前赋值 异步音频丢弃:src" + e.url, "【异步期间 更新其他src】");
                            }).catch(function(e) {
                                t === m ? (g.error("合成结果异常,trigger Event: onSynthError", e), v("onSynthError", e, n.__origin)) : g.log("之前 异步音频结果 丢弃，【异步期间 已切换其他src】", e);
                            });
                        } else try {
                            this.gPlayer.title = l || "", this.gPlayer.src = this.markerPlayerRes(n, i), g.log("设置同步步音频成功", this.markerPlayerRes(n, i)), 
                            h = y.unset, this.inited = !0;
                        } catch (e) {
                            g.error("bgPlayer || ", e);
                        }
                    } else this.gPlayer[e] = n, "title" === e && (l = n);
                }
            });
        }), [ "play", "pause", "stop", "seek" ].forEach(function(e) {
            Object.defineProperty(r, e, {
                get: function() {
                    var n = this;
                    if (("play" === e || "seek" === e) && (!n.gPlayer.src || n.ended)) throw new Error("GlobalPlayer ||:: you must specify a valid src for player before play-action ");
                    return function() {
                        var r;
                        switch (g.log("wxPlayer method called::", e), e) {
                          case "play":
                          case "seek":
                            break;

                          case "pause":
                          case "stop":
                            g.log("bgPlayer || __pauseHook set a value", y[e]), h = y[e], v("on" + e.toLowerCase().replace(/( |^)[a-z]/g, function(e) {
                                return e.toUpperCase();
                            })), "stop" === e && (this.inited = !1);
                        }
                        return g.log("wxPlayer method called at once::", e), (r = n.gPlayer)[e].apply(r, arguments);
                    };
                }
            });
        }), [ "onCanplay", "onWaiting", "onPlay", "onSeeked", "onSeeking", "onTimeUpdate", "onPause", "onEnded", "onStop", "onError", "onPrev", "onNext" ].forEach(function(e) {
            g.log("bgPlayer || " + e + "::", r.gPlayer[e]), r.gPlayer[e] && r.gPlayer[e](function() {
                for (var n = arguments.length, t = Array(n), a = 0; a < n; a++) t[a] = arguments[a];
                g.warn("bgPlayer || ", e + "wxGlobalPlayer event"), [ "onPause", "onEnded", "onStop", "onError", "onPrev", "onNext" ].indexOf(e) > -1 && (g.log("bgPlayer || __pauseHook clear::", e), 
                h = y.unset), "onEnded" === e ? (o++, r.ended = !0) : r.ended = !1, ("onStop" === e && r.inited || "onStop" !== e) && ("onTimeUpdate" === e && r.gPlayer.paused || "onPlay" === e && h ? (g.log("bgPlayer || wxGlobalPlayer [" + e + "]-event ignored: [" + e + "] called after paused or stop"), 
                "onPlay" === e && h && (g.log("wxPlayer [" + h + "] method called (delayed) after play event::", h), 
                r.gPlayer[h + ""](), h = y.unset)) : v.apply(void 0, [ e ].concat(t))), [ "onStop", "onError", "onPrev", "onNext", "onEnded" ].indexOf(e) > -1 && (r.inited = !1, 
                g.log("bgPlayer || current resource destory"));
            }), Object.defineProperty(r, e, {
                get: function() {
                    return function(n, r) {
                        if (!r) throw new Error("argument is missing, you must specify a argument for Event`s trigger Context on the second position in function`s params");
                        P(e, r, n);
                    };
                }
            });
        }), [ "onSynthing", "onSynthSuccess", "onSynthError" ].forEach(function(e) {
            g.log("bgPlayer || " + e), Object.defineProperty(r, e, {
                get: function() {
                    return function(n, r) {
                        if (!r) throw new Error("argument is missing, you must specify a argument for Event`s trigger Context on the second position in function`s params");
                        P(e, r, n);
                    };
                }
            });
        }), this.removeEventListener = function(e) {
            for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), t = 1; t < n; t++) r[t - 1] = arguments[t];
            if (!e) throw g.error("bgPlayer || clear-context invalid when removing listenners"), 
            new Error("globalPlayer remove listenner must be specify a value of clear-context");
            if (r.length) for (var o in r) p[r[o]][e] = []; else Object.keys(p).forEach(function(n) {
                p[n][e] = [];
            });
        }, this.eventsNamespace = function() {
            for (var e = arguments.length, n = Array(e), t = 0; t < e; t++) n[t] = arguments[t];
            g.log("bgPlayer || emit event-namespace ||::", JSON.stringify(n));
            var o = [];
            if ("[object Boolean]" === Object.prototype.toString.call(n[n.length - 1])) {
                for (var a = 0, i = n.length - 1; a < i; a++) d["" + n[a]] = n[n.length - 1];
                o = n.splice(0, n.length - 1);
            } else {
                o = n.splice(0, n.length);
                for (var a = 0, i = n.length - 1; a < i; a++) d["" + n[a]] = !1;
            }
            r.emitcontext = o;
        }, this.isCurrentContext = function(e) {
            return i === e || r.src && r.src.indexOf("xfmp=" + encodeURIComponent(s.appPlayerSignal)) > -1 && r.src.indexOf("xfmpcontext=" + encodeURIComponent(e)) > -1;
        }, this.markerPlayerRes = function() {
            var e = arguments.length <= 0 ? void 0 : arguments[0], n = arguments.length <= 1 ? void 0 : arguments[1], r = "";
            return r = e.indexOf("?") > -1 ? "&xfmp=" + encodeURIComponent(s.appPlayerSignal) + "&xfmpcontext=" + encodeURIComponent(n) : "?xfmp=" + encodeURIComponent(s.appPlayerSignal) + "&xfmpcontext=" + encodeURIComponent(n), 
            e + r;
        }, this.initContext = function() {
            i = (arguments.length <= 0 ? void 0 : arguments[0]) || "", a = (arguments.length <= 1 ? void 0 : arguments[1]) || 0, 
            l = (arguments.length <= 2 ? void 0 : arguments[2]) || "", o = 0;
        };
    }
    return r(s, [ {
        key: "currentAudioIdx",
        get: function() {
            return o;
        },
        set: function(e) {
            return o = e, !0;
        }
    }, {
        key: "currentAudiosLength",
        set: function(e) {
            return a = e, !0;
        }
    } ], [ {
        key: "gcontext",
        get: function() {
            return "__";
        }
    }, {
        key: "appPlayerSignal",
        get: function() {
            return "_mpplayer_xf";
        }
    } ]), s;
}(), c = exports.backgroundPlayer = new s(!0);

[ "gcontext", "appPlayerSignal" ].forEach(function(e) {
    c[e] = s[e];
});