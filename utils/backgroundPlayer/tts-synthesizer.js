function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.synthesizer = void 0;

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = require("./tts.fetch"), s = require("../config.js"), i = function() {
    function i() {
        var n, o, s = this;
        t(this, i);
        var a = Object.assign({}, "[object Object]" === Object.prototype.toString.call((n = arguments.length - 1, 
        arguments.length <= n ? void 0 : arguments[n])) ? (o = arguments.length - 1, arguments.length <= o ? void 0 : arguments[o]) : {}), c = a.enableConsole ? console : function() {
            var e = {}, t = function() {};
            return Object.keys(console).forEach(function(r) {
                e[r] = t;
            }), e;
        }();
        this.ttsUrl = "[object String]" === Object.prototype.toString.call(arguments.length <= 0 ? void 0 : arguments[0]) && (arguments.length <= 0 ? void 0 : arguments[0]) || i.default_ttsUrl, 
        this.speed = 50, this.synthThreshold = a.synthThreshold || 3;
        var l = [], h = 0;
        Object.defineProperty(this, "synthQueqe", {
            get: function() {
                return [].concat(e(l));
            },
            set: function(e) {
                throw new Error("Synthesizer || synthQueqe-property is readonly");
            }
        });
        var u = function(e) {
            c.log("trigger tts-reqeust dirty check:", e || "");
            var t = l[h] instanceof Promise;
            if (l[h] && (!t || l[h].__errored)) {
                o = r({}, t ? l[h].__origin : l[h], {
                    __errored: 0,
                    __synloged: !1
                });
                l[h] = i.ttsReq(o), l[h].__origin = o;
            }
            l[h].catch(function(e) {
                l[h].__errored = (l[h].__errored || 0) + 1, l[h].__synloged || (c.error("合成失败", l[h].__origin), 
                l[h].__synloged = !0);
            });
            for (var n = 1; h + n < l.length && n < s.synthThreshold; ) {
                var o;
                !function() {
                    var e = l[h + n] instanceof Promise;
                    l[h + n] && !e && (o = r({}, e ? l[h + n].__origin : l[h + n], {
                        __errored: 0,
                        __synloged: !1
                    }), l[h + n] = i.ttsReq(o), l[h + n].__origin = o);
                    var t = h + n;
                    l[t].catch(function(e) {
                        l[t].__synloged || (c.error("合成失败", l[t].__origin), l[t].__synloged = !0);
                    }), n++;
                }();
            }
        };
        this.initQueqe = function(t) {
            if (s.clearQueqe(), "[object String]" === Object.prototype.toString.call(arguments.length <= 1 ? void 0 : arguments[1]) && (arguments.length <= 1 ? void 0 : arguments[1]) && (s.ttsUrl = arguments.length <= 1 ? void 0 : arguments[1]), 
            !t || !Array.isArray(t)) throw new Error("first param of init-synthesizer function should be a Array of synth-datas");
            l = [].concat(e(t)).map(function(e) {
                return r({
                    speed: s.speed,
                    api: s.ttsUrl
                }, e);
            }), u("init-data");
        }, this.pushQueqe = function(e) {
            e = r({
                speed: 50
            }, e, {
                api: s.ttsUrl
            }), l.push(e), u("push-data");
        }, this.clearQueqe = function() {
            l.map(function(e) {
                if (e instanceof Promise) try {
                    e.reqTask && e.reqTask.abort();
                } catch (e) {
                    console.error(e);
                }
            }), l = [], h = 0;
        }, this.updateTTS = function(e) {
            var t = {};
            (e = e || {}(e.ttsUrl || e.api) && (s.ttsUrl = e.ttsUrl || e.api) && (t.api = e.ttsUrl || e.api)).speed && (t.speed = e.speed), 
            e.vcn && (t.vcn = e.vcn), l = l.map(function(e) {
                if (e instanceof Promise) {
                    try {
                        e.reqTask && e.reqTask.abort();
                    } catch (e) {
                        console.error(e);
                    }
                    var n = e.__origin;
                    return n.__errored = 0, n.__synloged = !1, r({}, n, t);
                }
                return r({}, e, t);
            }), e.synthThreshold && (s.synthThreshold = e.synthThreshold || s.synthThreshold);
        }, Object.defineProperty(this, "ttResp", {
            get: function() {
                return function(e) {
                    return e >= 0 && e <= l.length - 1 ? (h = e || 0, c.log("访问队列音频，@pos: " + e, "脏检测起始位置::" + h), 
                    u("access-data"), l[e]) : (c.log("合成队列中不存在访问的数据,(0位开始) 访问@pos:" + e, "超出队列游标范围，[0~" + (l.length - 1) + "]"), 
                    Promise.reject("合成队列中不存在访问的数据, @pos:", e));
                };
            }
        });
    }
    return n(i, null, [ {
        key: "ttsReq",
        value: function(e) {
            return (e = Object.assign({}, e)).src || e.url ? (e.url = e.url || e.src, Promise.resolve(Object.assign({}, e))) : (0, 
            o.fetchTTS)({
                url: e.api,
                data: {
                    base: {
                        appId: "J9Q7O4EL",
                        userId: "",
                        sid: ""
                    },
                    param: {
                        text: e.text,
                        vcn: e.vcn,
                        speed: e.speed,
                        vol: e.vol || 100,
                        vcnType: e.vcnType || 2
                    }
                },
                header: {
                    appId: "J9Q7O4EL"
                }
            });
        }
    }, {
        key: "default_ttsUrl",
        get: function() {
            return s.ifc && s.ifc.ttssynth || "https://mina.xfliusheng.com/synth/ttssynth";
        }
    } ]), n(i, [ {
        key: "queqeLength",
        get: function() {
            return this.synthQueqe.length;
        }
    } ]), i;
}();

exports.synthesizer = new i({
    enableConsole: !0
});