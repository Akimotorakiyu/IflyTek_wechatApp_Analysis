Component({
    properties: {
        carousels: {
            type: Array,
            value: []
        },
        playing: {
            type: Boolean,
            value: !1
        },
        playingSrc: {
            type: String,
            value: ""
        },
        zoomsmall: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        current: 0,
        virtureIdx: {
            v1: null,
            v2: null,
            vp1: null,
            vp2: null
        }
    },
    ready: function() {
        var t = this;
        t.cardOriginHeight = 0, t.cardOriginWidth = 0, wx.createSelectorQuery().in(this).select("#carousel_item_" + this.data.current).boundingClientRect(function(r) {
            t.cardOriginHeight = r.width, t.cardOriginHeight = r.height;
        }).exec(), this.changeVirtureCards();
        var r = {
            cardObj: Object.assign({}, this.properties.carousels[this.data.current])
        }, e = {};
        this.triggerEvent("cardshown", r, e);
    },
    methods: {
        handletouchmove: function(t) {
            var r = t.touches[0].pageX, e = t.touches[0].pageY, a = r - this.data.lastX, s = e - this.data.lastY;
            Math.abs(a) > Math.abs(s) && !this.moved && (a < -75 ? (console.log("向左滑动"), this.nextCard(), 
            this.moved = !0) : a > 75 && (console.log("向右滑动"), this.prevCard(), this.moved = !0));
        },
        handletouchtart: function(t) {
            this.data.lastX = t.touches[0].pageX, this.data.lastY = t.touches[0].pageY, this.moved = !1;
        },
        nextCard: function() {
            var t = this;
            t.setData({
                current: (t.data.current + 1) % t.properties.carousels.length
            }), this.changeVirtureCards();
            var r = {
                cardObj: Object.assign({}, this.properties.carousels[this.data.current])
            }, e = {};
            this.triggerEvent("cardshown", r, e);
        },
        prevCard: function() {
            var t = this;
            t.setData({
                current: t.data.current - 1 >= 0 ? t.data.current - 1 : t.properties.carousels.length + (t.data.current - 1)
            }), this.changeVirtureCards();
            var r = {
                cardObj: Object.assign({}, this.properties.carousels[this.data.current])
            }, e = {};
            this.triggerEvent("cardshown", r, e);
        },
        bindtapCard: function(t) {
            var r = Number(t.currentTarget.dataset.cardIndex);
            if (r > this.data.current || this.data.current == this.properties.carousels.length - 1 && r < this.data.current) this.nextCard(); else if (r < this.data.current || 0 == this.data.current && r > this.data.current) this.prevCard(); else {
                var e = {
                    cardObj: Object.assign({}, this.properties.carousels[r]),
                    cardIndex: r
                }, a = {};
                this.triggerEvent("cardtaped", e, a);
            }
        },
        changeVirtureCards: function() {
            var t, r, e, a, s = this.properties.carousels.length;
            this.data.current >= 2 ? (e = this.data.current - 1, a = this.data.current - 2) : 0 == this.data.current ? (e = s - 1, 
            a = s - 2) : (e = 0, a = s - 1), this.data.current + 1 >= s ? (t = 0, r = 1) : this.data.current + 2 >= s ? (t = s - 1, 
            r = 0) : (t = this.data.current + 1, r = this.data.current + 2), this.setData({
                virtureIdx: {
                    v1: t,
                    v2: r,
                    vp1: e,
                    vp2: a
                }
            });
        }
    }
});