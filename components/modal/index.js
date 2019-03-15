Component({
    options: {
        addGlobalClass: !0,
        multipleSlots: !0
    },
    properties: {
        customComponents: {
            type: Boolean,
            value: !1
        },
        showCloseIcon: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: "提示"
        },
        confirmBtnLabel: {
            type: String,
            value: "确认"
        },
        cancelBtnLabel: {
            type: String,
            value: "取消"
        },
        hideCancelBtn: {
            type: Boolean,
            value: !1
        },
        hideConfirmBtn: {
            type: Boolean,
            value: !1
        }
    },
    onLoad: function() {},
    data: {
        showModal: !1
    },
    methods: {
        showModal: function() {
            this.setData({
                showModal: !0
            });
        },
        closeModal: function() {
            this.setData({
                showModal: !1
            });
        },
        preventTouchMove: function() {},
        onAutoClose: function() {
            this.closeModal();
            var o = {
                type: "close"
            }, e = {};
            this.triggerEvent("cancel", o, e);
        },
        onCancel: function() {
            this.closeModal();
            var o = {}, e = {};
            this.triggerEvent("cancel", o, e);
        },
        onConfirm: function() {
            var o = {}, e = {};
            this.triggerEvent("confirm", o, e);
        }
    },
    preventTouchMove: function() {}
});