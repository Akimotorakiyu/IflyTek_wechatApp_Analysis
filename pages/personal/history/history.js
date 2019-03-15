var t = getApp();

Page({
    data: {
        rootModule: null,
        historyCount: 0,
        isEdit: !1,
        queryCount: 50,
        offset: 0,
        hasMore: !0,
        loading: !1,
        loadError: !1,
        listenHistoryList: [],
        deleteItemIndex: -1,
        deleteItemSid: ""
    },
    onLoad: function(e) {
        var o = this;
        this.deleteHintModal = this.selectComponent("#deleteHint"), o.getListenHistory(o.data.offset, o.data.queryCount, !0), 
        t.Stats.personal_history();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "AI复刻的声音为你播报",
            path: "/pages/index/index"
        };
    },
    clickEdit: function() {
        var t = this;
        null != t.data.listenHistoryList && 0 != t.data.listenHistoryList.length ? (t.data.isEdit = !0, 
        t.setData({
            isEdit: t.data.isEdit
        })) : wx.showToast({
            title: "没有可编辑的文章哦",
            icon: "none"
        });
    },
    clickFinish: function() {
        var t = this;
        t.data.isEdit = !1, t.setData({
            isEdit: t.data.isEdit
        });
    },
    clickItemDelete: function(t) {
        var e = this, o = t.currentTarget.dataset.index, i = t.currentTarget.dataset.itemsid;
        e.data.deleteItemIndex = o, e.data.deleteItemSid = i, e.deleteHintModal.showModal();
    },
    clickItem: function(e) {
        var o = this, i = e.currentTarget.dataset.itemsid;
        e.currentTarget.dataset.isModuleArticle;
        console.log("history_clickItem | itemSid = " + i);
        var a = {
            base: t.globalData.basequery,
            param: {
                itemSid: i
            }
        };
        t.Ajax.request({
            url: t.globalData.config.ifc.listenhistorydetail,
            data: a || {}
        }, {}, {
            title: "正在加载..."
        }).then(function(e) {
            console.log("history_clickItem | resp = ", e);
            var i = e.item;
            e.item && e.item.moduleInfo && e.item.moduleInfo.parentModuleId ? o.getParentModuleInfo(e.item.moduleInfo.parentModuleId).then(function(e) {
                i.rootModule = o.data.rootModule, t.globalData.listenhistoryInfo = i, wx.navigateTo({
                    url: "/packageApplication/pages/listenpage/index"
                });
            }).catch(function(t) {
                console.log("history_clickItem | err = 父模块信息获取失败"), console.log("history_clickItem | err = ", t), 
                wx.showToast({
                    title: "获取详情失败",
                    icon: "none"
                });
            }) : (t.globalData.listenhistoryInfo = e.item, wx.navigateTo({
                url: "/packageApplication/pages/listenpage/index"
            }));
        }).catch(function(t) {
            console.log("history_clickItem | err = ", t), wx.showToast({
                title: "获取详情失败",
                icon: "none"
            });
        });
    },
    getParentModuleInfo: function(e) {
        var o = this;
        return new Promise(function(i, a) {
            var n = {
                base: t.globalData.basequery,
                param: {
                    moduleId: e
                }
            };
            t.Ajax.request({
                url: t.globalData.config.ifc.moduleinfo,
                data: n
            }, null, {
                title: "正在加载..."
            }).then(function(t) {
                t.base && "000000" === t.base.retCode && t.module ? (o.setData({
                    rootModule: t.module
                }), i()) : a();
            }).catch(function(t) {
                console.error(t), a();
            });
        });
    },
    listenItemScrollLower: function(t) {
        var e = this;
        e.data.hasMore && e.getListenHistory(e.data.offset, e.data.queryCount, !1);
    },
    deleteItem: function() {
        var e = this, o = e.data.deleteItemIndex, i = e.data.deleteItemSid;
        if (console.log("history_deleteItem | index = ", o), console.log("history_deleteItem | itemSid = ", i), 
        e.deleteHintModal.closeModal(), i && 0 != i.length) {
            var a = {
                base: t.globalData.basequery,
                param: {
                    action: 2,
                    listenHistory: {
                        itemSid: i
                    }
                }
            };
            t.Ajax.request({
                url: t.globalData.config.ifc.listenhistorymanager,
                data: a || {}
            }, {}, {
                title: "正在删除..."
            }).then(function(t) {
                console.log("history_deleteItem | resp = ", t), e.data.listenHistoryList.splice(o, 1), 
                e.setData({
                    listenHistoryList: e.data.listenHistoryList,
                    historyCount: e.data.historyCount - 1
                }), wx.showToast({
                    title: "删除历史成功",
                    icon: "none"
                });
            }).catch(function(t) {
                console.log("history_deleteItem | err = ", t), wx.showToast({
                    title: "删除历史失败",
                    icon: "none"
                });
            });
        } else console.log("history_deleteItem | itemSid is null");
    },
    getListenHistory: function(e, o, i) {
        var a = this, n = this;
        if (n.listenHistoryPromise) console.log("history_getListenHistory | requesting do nothing"); else {
            n.setData({
                loading: !0
            });
            var s = {
                base: t.globalData.basequery,
                param: {
                    offset: e,
                    count: o,
                    isNeedTotal: i
                }
            };
            n.listenHistoryPromise = t.Ajax.request({
                url: t.globalData.config.ifc.listenhistory,
                data: s || {}
            }, {}).then(function(t) {
                if (console.log("histoty_getListenHistory | resp = ", t), n.listenHistoryPromise = null, 
                a.setData({
                    loading: !1
                }), t.listenHistory) {
                    var e = n.data.listenHistoryList || [];
                    e = e.concat(t.listenHistory);
                    var o = i ? t.total : n.data.historyCount;
                    n.setData({
                        listenHistoryList: e,
                        offset: n.data.offset + t.listenHistory.length,
                        hasMore: t.hasMore,
                        loadError: !1,
                        historyCount: o
                    });
                } else n.data.listenHistory.length || n.setData({
                    loading: !1,
                    loadError: !0
                }), wx.showToast({
                    title: "获取朗读历史失败",
                    icon: "none"
                });
            }).catch(function(t) {
                console.log("histoty_getListenHistory | err = ", t), n.listenHistoryPromise = null, 
                a.setData({
                    loading: !1,
                    loadError: !0
                }), wx.showToast({
                    title: "获取朗读历史失败",
                    icon: "none"
                });
            });
        }
    }
});