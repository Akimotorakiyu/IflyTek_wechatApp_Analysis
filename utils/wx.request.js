var e = require("./algorithm.js"),
  a = e.md5,
  o = (e.base64, require("./config.js"));

module.exports = {
  request: function(e, r, t) {
    var n = (r = r || {}).timestamp || new Date().getTime(),
      s = "CONTENT-MD5=" + a(JSON.stringify(e.data || {})) + "&X-APPID=" + (r.appid || o.appId) + "&X-VERSION=" + (r.version || "1.0") + "&X-TIMESTAMP=" + n,
      i = {
        "X-APPID": r.appid || o.appId,
        "X-VERSION": r.version || "1.0",
        "X-TIMESTAMP": n,
        "X-SIGNATURE": a(s),
        "content-type": "application/json"
      };
    Object.assign(i, e.header || {});
    var l = null;
    t && (t.mask = !0), t && wx.showLoading(t), console.log("请求::" + e.url + ":::body信息" + JSON.stringify(e.data));
    var d = new Promise(function(a, o) {
      l = wx.request({
        url: e.url,
        data: e.data,
        header: i,
        method: e.method || "post",
        dataType: e.dataType || "json",
        responseType: e.responseType || "text",
        success: function(r, n, s) {
          t && wx.hideLoading();
          try {
            //这里报错  200004
            console.log("响应结果" + e.url + ":::" + JSON.stringify(r));
          } catch (e) {
            console.log(r);
          }
          r.data.base && "000000" === r.data.base.retCode ? a(r.data) : (o(r.data), console.error(r.data));
        },
        fail: function(e) {
          t && wx.hideLoading(), e && e.errMsg && e.errMsg.indexOf("fail") > -1 && e.errMsg.indexOf("abort") > -1 ? (console.warn("主动abort"),
            o("abort")) : (console.error(e), o(e));
        },
        complete: e.complete || null
      });
    });
    return d.task = l, d;
  },
  uploadFile: function(e, r, t) {
    console.log("appid" + JSON.stringify(o));
    var n = (r = r || {}).timestamp || new Date().getTime(),
      s = "CONTENT-MD5=" + a("") + "&X-APPID=" + (r.appid || o.appId) + "&X-VERSION=" + (r.version || "1.0") + "&X-TIMESTAMP=" + n,
      i = {
        "X-APPID": r.appid || o.appId,
        "X-VERSION": r.version || "1.0",
        "X-TIMESTAMP": n,
        "X-SIGNATURE": a(s)
      };
    Object.assign(i, e.header || {});
    var l = null;
    t && (t.mask = !0), t && wx.showLoading(t);
    var d = new Promise(function(a, o) {
      l = wx.uploadFile({
        url: e.url,
        filePath: e.filePath,
        name: e.name || "file",
        formData: e.formData || {},
        header: i,
        success: function(e, r, n) {
          t && wx.hideLoading(t);
          try {
            console.log("响应结果" + JSON.stringify(e));
          } catch (a) {
            console.log(e);
          }
          var s = e.data;
          try {
            s = JSON.parse(s), (s = s[0] ? s[0] : s).base && "000000" === s.base.retCode ? (console.info(s),
              a(s)) : (console.error(s), o(s));
          } catch (e) {
            a(s = {});
          }
        },
        fail: function(e) {
          t && wx.hideLoading(), e && e.errMsg && e.errMsg.indexOf("fail") > -1 && e.errMsg.indexOf("abort") > -1 ? (console.warn("主动abort"),
            o("abort")) : o(e);
        },
        complete: e.complete || null
      });
    });
    return d.task = l, d;
  }
};