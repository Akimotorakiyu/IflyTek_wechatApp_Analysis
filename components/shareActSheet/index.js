Component({
    properties: {
        hiddenCancel: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        showActionSheet: !1
    },
    methods: {
        showShareActSheet: function() {
            this.setData({
                showActionSheet: !0
            });
        },
        closeActionSheet: function() {
            this.setData({
                showActionSheet: !1
            });
        },
        preventTouchMove: function() {},
        cancelActSheet: function() {
            this.setData({
                showActionSheet: !1
            });
        },
        sharePicture: function(t) {
            var e = {}, o = {};
            this.triggerEvent("sharepic", e, o);
        }
    }
});