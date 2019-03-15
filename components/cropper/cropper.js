var t = wx.getSystemInfoSync(), e = t.windowWidth / 750, a = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
};

Component({
    properties: {
        ratio: {
            type: Number,
            observer: function(t, a) {
                this.setData({
                    width: 640 * e,
                    height: 640 * e / t
                });
            }
        },
        url: {
            type: String,
            observer: function(t, e) {
                t && this.setData({
                    cropperOpened: !0
                }), this.initImg(t);
            }
        }
    },
    data: {
        cropperOpened: !1,
        deviceWidth: t.windowWidth,
        contentTop: (t.windowHeight - 750 * e) / 2 / e,
        width: 640 * e,
        height: 640 * e,
        originImg: null,
        stv: {
            offsetX: 0,
            offsetY: 0,
            zoom: !1,
            distance: 0,
            scale: 1,
            rotate: 0
        }
    },
    methods: {
        preventD: function() {},
        uploadTap: function() {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    t.initImg(e.tempFilePaths[0]);
                }
            });
        },
        rotate: function() {
            var t = this;
            t.setData({
                "stv.rotate": t.data.stv.rotate % 90 == 0 ? t.data.stv.rotate = t.data.stv.rotate + 90 : t.data.stv.rotate = 0
            });
        },
        cancel: function() {
            this.setData({
                cropperOpened: !1
            });
        },
        cropperImg: function() {
            var a = this;
            wx.showLoading({
                title: "处理中...",
                mask: !0
            });
            var s = this, o = wx.createCanvasContext("imgcrop", this), i = s.data.stv;
            o.save();
            var n = (s.data.originImg.width - s.data.originImg.width * i.scale) / 2, c = (s.data.originImg.height - s.data.originImg.height * i.scale) / 2, h = 2 * (i.offsetX + n) + s.data.originImg.width * i.scale, r = 2 * (i.offsetY + c) + s.data.originImg.height * i.scale;
            o.translate(h, r), o.rotate(i.rotate * Math.PI / 180), o.translate(-h, -r), console.warn(2 * (i.offsetX + n - (t.windowWidth - s.data.width) / 2)), 
            console.warn(2 * (i.offsetY + c - s.data.contentTop * e)), console.warn(2 * s.data.originImg.width * i.scale), 
            console.warn(2 * s.data.originImg.width * i.scale), o.drawImage(s.data.originImg.url, 2 * (i.offsetX + n - (t.windowWidth - s.data.width) / 2), 2 * (i.offsetY + c - s.data.contentTop * e), 2 * s.data.originImg.width * i.scale, 2 * s.data.originImg.height * i.scale), 
            o.restore(), o.draw(!1, function() {
                wx.canvasToTempFilePath({
                    canvasId: "imgcrop",
                    destWidth: 300,
                    destHeight: 300,
                    quality: .8,
                    success: function(t) {
                        console.log(t.tempFilePath), wx.hideLoading(), setTimeout(function() {
                            s.setData({
                                cropperOpened: !1
                            });
                        }), s.triggerEvent("getCropperImg", {
                            url: t.tempFilePath
                        });
                    },
                    fail: function(t) {
                        console.log(t), wx.hideLoading(), wx.showToast({
                            title: "生成图片失败",
                            icon: "none"
                        });
                    }
                }, a);
            });
        },
        initImg: function(e) {
            var a = this;
            wx.getImageInfo({
                src: e,
                success: function(s) {
                    console.log(s);
                    var o = s.width / s.height;
                    s.width < a.data.width ? a.setData({
                        originImg: {
                            url: e,
                            width: a.data.width,
                            height: a.data.width / o
                        },
                        stv: {
                            offsetX: 0,
                            offsetY: 0,
                            zoom: !1,
                            distance: 0,
                            scale: 1,
                            rotate: 0
                        }
                    }) : a.setData({
                        originImg: {
                            url: e,
                            width: t.windowWidth,
                            height: t.windowWidth / o
                        },
                        stv: {
                            offsetX: 0,
                            offsetY: 0,
                            zoom: !1,
                            distance: 0,
                            scale: 1,
                            rotate: 0
                        }
                    });
                }
            });
        },
        touchstartCallback: function(t) {
            if (1 === t.touches.length) {
                var e = t.touches[0], s = e.clientX, o = e.clientY;
                this.startX = s, this.startY = o, this.touchStartEvent = t.touches;
            } else {
                var i = t.touches[1].clientX - t.touches[0].clientX, n = t.touches[1].clientY - t.touches[0].clientY, c = Math.sqrt(i * i + n * n);
                a.x1 = 2 * t.touches[0].pageX, a.y1 = 2 * t.touches[0].pageY, a.x2 = 2 * t.touches[1].pageX, 
                a.y2 = 2 * t.touches[1].pageY, this.setData({
                    "stv.distance": c,
                    "stv.zoom": !0
                });
            }
        },
        touchmoveCallback: function(t) {
            s(this, t);
        },
        touchendCallback: function(t) {
            0 === t.touches.length && this.setData({
                "stv.zoom": !1
            });
        }
    }
});

var s = function(t, e, a) {
    var s = null, o = null;
    return function() {
        var i = +new Date(), n = this, c = arguments;
        o || (o = i);
        var h = i - o;
        a && h >= a ? (t.apply(n, c), o = i) : (clearTimeout(s), s = setTimeout(function() {
            t.apply(n, c);
        }, e));
    };
}(function(t, e) {
    if (1 === e.touches.length) {
        if (t.data.stv.zoom) return;
        var s = e.touches[0], o = s.clientX, i = s.clientY, n = o - t.startX, c = i - t.startY;
        t.startX = o, t.startY = i;
        var h = t.data.stv;
        h.offsetX += n, h.offsetY += c, h.offsetLeftX = -h.offsetX, h.offsetLeftY = -h.offsetLeftY, 
        t.setData({
            stv: h
        });
    } else {
        if (2 !== e.touches.length) return;
        var r = function(t, e, a, s) {
            this.x = a - t, this.y = s - e;
        }, d = JSON.parse(JSON.stringify(a));
        a.x1 = 2 * e.touches[0].pageX, a.y1 = 2 * e.touches[0].pageY, a.x2 = 2 * e.touches[1].pageX;
        var l = new r(d.x1, d.y1, d.x2, d.y2), f = new r(a.x1, a.y1, a.x2, a.y2), u = function(t, e) {
            return (t.x * e.x + t.y * e.y) / (Math.sqrt(t.x * t.x + t.y * t.y) * Math.sqrt(e.x * e.x + e.y * e.y));
        }(l, f), g = 180 * Math.acos(u) / Math.PI, v = function(t, e) {
            return t.x * e.y - e.x * t.y > 0 ? 1 : -1;
        }(l, f) * g, w = e.touches[1].clientX - e.touches[0].clientX, p = e.touches[1].clientY - e.touches[0].clientY;
        Math.sqrt(w * w + p * p), t.data.stv.distance;
        if (t.data.stv.scale, Math.abs(v) > 1) ; else {
            var m = e.touches[1].clientX - e.touches[0].clientX, x = e.touches[1].clientY - e.touches[0].clientY, y = Math.sqrt(m * m + x * x), I = y - t.data.stv.distance, X = t.data.stv.scale + .005 * I, Y = t.data.stv.offsetX * X / t.data.stv.scale, D = t.data.stv.offsetY * X / t.data.stv.scale;
            t.setData({
                "stv.distance": y,
                "stv.scale": X,
                "stv.offsetX": Y,
                "stv.offsetY": D
            });
        }
    }
}, 10, 10);