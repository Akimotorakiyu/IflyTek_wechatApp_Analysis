function a(t, l, n, r, s, c) {
  var g = t.globalData.config.lkey.userinfokey;
  t = t || this;
  var i = null;
  try {
    i = wx.getStorageSync(g);
  } catch (a) {}
  if (!i || !i.userId || c && !i.userMobile)
    if (t.globalData.loginReq || t.globalData.loginReqPrefix) {
      if (t.globalData.loginReqPrefix) return void setTimeout(function() {
        a(t, l, n, r, s, c);
      }, 200);
      t.globalData.loginReq.then(function(a) {
        if (t.globalData.loginReq = null, s && wx.hideLoading(), console.log(a), "000000" === a.base.retCode) {
          t.globalData.basequery.userId = a.accountInfo.userId || "", t.globalData.basequery.sid = a.accountInfo.sid || "",
            t.globalData.userInfo = a.accountInfo, t.globalData.userInfo.avatarUrl = t.globalData.userInfo.avatarUrl || "/images/personal/avatar-default.png";
          try {
            wx.setStorageSync(g, a.accountInfo);
          } catch (a) {}
          try {
            var e = a.accountInfo.avatarUrl || "/images/personal/avatar-default.png";
            e && !t.globalData.avatarUrlGot && wx.getImageInfo({
              src: e,
              success: function(a) {
                console.warn("获取网络头像成功"), wx.setStorage({
                  key: o.lkey.headerurlkey,
                  data: a.path,
                  success: function() {
                    t.globalData.avatarUrlGot = !0;
                  }
                });
              },
              fail: function() {
                console.error("获取网络头像异常");
              }
            });
          } catch (a) {
            console.error("获取网络头像异常");
          }
          l && l();
        }
      }).catch(function(a) {
        t.globalData.loginReq = null, t.globalData.loginReqPrefix = !1, s && wx.hideLoading(),
          r && r(a);
      });
    } else t.globalData.loginReqPrefix = !0, wx.getSetting({
      success: function(a) {
        a.authSetting["scope.userInfo"] ? wx.login({
          success: function(a) {
            a.code ? (console.log("获取的code:" + a.code), t.globalData.usrparam || (t.globalData.usrparam = {}),
              wx.getUserInfo({
                withCredentials: !0,
                success: function(n) {
                  n.userInfo && (t.globalData.userInfo = n.userInfo);
                  try {
                    var c = n.userInfo.avatarUrl || "/images/personal/avatar-default.png";
                    c && !t.globalData.avatarUrlGot && wx.getImageInfo({
                      src: c,
                      success: function(a) {
                        console.warn("获取网络头像成功"), wx.setStorage({
                          key: o.lkey.headerurlkey,
                          data: a.path,
                          success: function() {
                            t.globalData.avatarUrlGot = !0;
                          }
                        });
                      },
                      fail: function() {
                        console.error("获取网络头像异常");
                      }
                    });
                  } catch (a) {
                    console.error("获取网络头像异常");
                  }
                  try {
                    wx.setStorageSync(g, n.userInfo);
                  } catch (a) {}
                  t.globalData.usrparam.res = n, console.log("has Permied  : code::" + a.code + ",  userInfo::" + JSON.stringify(t.globalData.usrparam));
                  var i = {
                    base: t.globalData.basequery,
                    param: {
                      userInfo: n.userInfo,
                      code: a.code,
                      rawData: n.rawData,
                      encryptedData: n.encryptedData,
                      signature: n.signature,
                      iv: n.iv
                    }
                  };
                  s && wx.showLoading({
                    title: "登录中...",
                    icon: "none"
                  }), t.globalData.loginReq || (t.globalData.loginReq = e.request({
                    url: t.globalData.config.ifc.login,
                    data: i,
                    method: "post",
                    header: {
                      "content-type": "application/json"
                    }
                  }, {
                    appid: t.globalData.basequery.appId
                  })), t.globalData.loginReq.then(function(a) {
                    if (t.globalData.loginReqPrefix = !1, t.globalData.loginReq = null, s && wx.hideLoading(),
                      console.log(a), "000000" === a.base.retCode) {
                      t.globalData.basequery.userId = a.accountInfo.userId || "", t.globalData.basequery.sid = a.accountInfo.sid || "",
                        t.globalData.userInfo = a.accountInfo, t.globalData.userInfo.avatarUrl = t.globalData.userInfo.avatarUrl || "/images/personal/avatar-default.png";
                      try {
                        wx.setStorageSync(g, a.accountInfo);
                      } catch (a) {}
                      try {
                        l && l(), t.userInfoReadyCallback && (console.log("usr goted after page loaded"),
                          t.userInfoReadyCallback(a));
                      } catch (a) {
                        console.error(a);
                      }
                    }
                  }).catch(function(a) {
                    t.globalData.loginReqPrefix = !1, t.globalData.loginReq = null, s && wx.hideLoading(),
                      r && r(a);
                  });
                },
                fail: function(a) {
                  t.globalData.loginReqPrefix = !1, r();
                }
              })) : (t.globalData.loginReqPrefix = !1, r());
          },
          fail: function() {
            t.globalData.loginReqPrefix = !1, r();
          }
        }) : (t.globalData.loginReqPrefix = !1, n && n());
      },
      fail: function() {
        t.globalData.loginReqPrefix = !1, n && n();
      }
    });
  else {
    t.globalData.basequery.userId = i.userId, t.globalData.basequery.sid = i.sid, t.globalData.userInfo = i;
    try {
      wx.login({
        success: function(a) {
          a.code && wx.getUserInfo({
            success: function(a) {
              var o = i,
                l = a.userInfo,
                n = i.nickName;
              if (console.warn("wxUserInfo", l), a.userInfo) {
                var r = Object.assign({}, o, l);
                if (r.userId && r.sid && (t.globalData.userInfo = r), l.nickName != n && !t.globalData.updateUserInfoReq) {
                  console.warn("异步更新wxUserInfo");
                  var s = {
                    base: t.globalData.basequery,
                    param: {
                      userInfo: l
                    }
                  };
                  t.globalData.updateUserInfoReq = e.request({
                    url: t.globalData.config.ifc.userinfo,
                    data: s,
                    method: "post",
                    header: {
                      "content-type": "application/json"
                    }
                  }, {}).then(function(a) {
                    t.globalData.updateUserInfoReq = null, console.warn("用户微信信息更新异常，稍后进入会再次触发自动更新！");
                    try {
                      wx.setStorage({
                        key: g,
                        data: r
                      });
                    } catch (a) {}
                  }).catch(function(a) {
                    t.globalData.userInfo.nickName = n, t.globalData.updateUserInfoReq = null;
                  });
                }
              }
            }
          });
        }
      });
    } catch (a) {}
    try {
      var u = i.avatarUrl || "/images/personal/avatar-default.png";
      u && !t.globalData.avatarUrlGot && wx.getImageInfo({
        src: u,
        success: function(a) {
          console.warn("获取网络头像成功"), wx.setStorage({
            key: o.lkey.headerurlkey,
            data: a.path,
            success: function() {
              t.globalData.avatarUrlGot = !0;
            }
          });
        },
        fail: function() {
          console.error("获取网络头像异常");
        }
      });
    } catch (a) {
      console.error("获取网络头像异常");
    }
    l && l();
  }
}

var e = require("./wx.request.js"),
  o = require("./config.js");

module.exports = {
  getUserInfo: a
};