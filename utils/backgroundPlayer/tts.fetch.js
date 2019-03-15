Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fetchTTS = function(t) {
    var r = null, a = null, o = new Date().getTime();
    try {
        a = new Promise(function(a, n) {
            var s = t.header || {}, i = s.timestamp || new Date().getTime(), c = "CONTENT-MD5=" + (0, 
            e.md5)(JSON.stringify(t.data || {})) + "&X-APPID=" + (s.appid || "") + "&X-VERSION=" + (s.version || "1.0") + "&X-TIMESTAMP=" + i, l = {
                "X-APPID": s.appid || "APPID",
                "X-VERSION": s.version || "1.0",
                "X-TIMESTAMP": i,
                "X-SIGNATURE": (0, e.md5)(c),
                "content-type": "application/json"
            };
            Object.assign(l, t.header), console.log("请求" + t.url + ":::" + JSON.stringify(t.data)), 
            r = wx.request({
                url: t.url,
                data: t.data,
                header: l,
                method: t.method || "post",
                dataType: t.dataType || "json",
                responseType: t.responseType || "text",
                success: function(e, r, s) {
                    try {
                        console.log("响应结果" + t.url + ":::" + JSON.stringify(e));
                    } catch (r) {
                        console.log("响应结果" + t.url + ":::", e);
                    }
                    console.warn("tts 请求链路耗时：", new Date().getTime() - o), e.data.base && "000000" === e.data.base.retCode ? a(e.data) : n(e.data);
                },
                fail: function(e) {
                    console.error(e), console.warn("tts error 请求链路耗时：", new Date().getTime() - o), n(e);
                }
            });
        });
    } catch (e) {
        console.error("合成请求初始化异常:::", e), a = Promise.reject(e);
    }
    return r && (a.reqTask = r), a;
};

var e = require("../algorithm");