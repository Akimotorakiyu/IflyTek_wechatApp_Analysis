Component({
    properties: {
        btnType: {
            type: String,
            value: "1"
        },
        confirmBtnLabel: {
            type: String,
            value: "确定"
        },
        cancelBtnLabel: {
            type: String,
            value: "取消"
        },
        hideConfirmBtn: {
            type: Boolean,
            value: !1
        },
        hideCancelBtn: {
            type: Boolean,
            value: !1
        },
        hideCloseIcon: {
            type: Boolean,
            value: !0
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        closeBtnClass: {
            type: String,
            value: ""
        }
    },
    data: {
        showModal: !1
    },
    onLoad: function() {},
    methods: {
        isShown: function() {
            return this.data.showModal;
        },
        showModal: function() {
            this.setData({
                showModal: !0
            });
        },
        hideModal: function() {
            this.setData({
                showModal: !1
            });
        },
        onConfirm: function() {
            if (!this.data.disabled) {
                var t = {
                    btnType: this.data.btnType
                }, e = {};
                this.triggerEvent("confirm", t, e);
            }
        },
        onClose: function() {
            var t = {}, e = {};
            this.hideModal(), this.triggerEvent("close", t, e);
        },
        preventTouchMove: function() {}
    }
});