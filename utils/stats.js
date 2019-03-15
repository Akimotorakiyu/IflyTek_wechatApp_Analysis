module.exports = {
    register: function(e, r) {
        try {
            var o = {
                status: e,
                channel: r || "0"
            };
            wx.reportAnalytics("register", o), console.log("register统计" + JSON.stringify(o));
        } catch (e) {
            console.error("register统计失败");
        }
    },
    voicemake: function(e) {
        try {
            wx.reportAnalytics("voicemake", {
                status: "0"
            });
            var r = {
                status: e + "" || "0"
            };
            wx.reportAnalytics("voicemake", r), console.log("voicemake统计" + JSON.stringify(r));
        } catch (e) {
            console.error("voicemake统计失败");
        }
    },
    start_makevoice: function(e) {
        try {
            var r = {
                origin: e || ""
            };
            wx.reportAnalytics("start_makevoice", r), console.log("start_makevoice统计" + JSON.stringify(r));
        } catch (e) {
            console.error("start_makevoice统计失败");
        }
    },
    record_error: function(e) {
        try {
            var r = {
                errortype: e || "3"
            };
            wx.reportAnalytics("record_error", r), console.log("record_error统计" + JSON.stringify(r));
        } catch (e) {
            console.error("record_error统计失败");
        }
    },
    submit_namevoice: function(e) {
        try {
            var r = {
                type: e || "1"
            };
            wx.reportAnalytics("submit_namevoice", r), console.log("submit_namevoice统计" + JSON.stringify(r));
        } catch (e) {
            console.error("submit_namevoice统计失败");
        }
    },
    view_credentials: function(e) {
        try {
            var r = {};
            wx.reportAnalytics("view_credentials", r), console.log("view_credentials统计" + JSON.stringify(r));
        } catch (e) {
            console.error("view_credentials统计失败");
        }
    },
    save_credentials: function(e) {
        try {
            var r = {};
            wx.reportAnalytics("save_credentials", r), console.log("save_credentials统计" + JSON.stringify(r));
        } catch (e) {
            console.error("save_credentials统计失败");
        }
    },
    readpage_show: function(e) {
        try {
            var r = {
                frompage: e
            };
            wx.reportAnalytics("readpage_show", r), console.log("readpage_show统计" + JSON.stringify(r));
        } catch (e) {
            console.error("readpage_show统计失败");
        }
    },
    readpage_toshare: function(e, r) {
        try {
            var o = {
                type: e,
                frompage: r
            };
            wx.reportAnalytics("readpage_toshare", o), console.log("readpage_toshare统计" + JSON.stringify(o));
        } catch (e) {
            console.error("readpage_toshare统计失败");
        }
    },
    readpage_savepic: function(e) {
        try {
            var r = {
                frompage: e
            };
            wx.reportAnalytics("readpage_savepic", r), console.log("readpage_savepic统计" + JSON.stringify(r));
        } catch (e) {
            console.error("readpage_savepic统计失败");
        }
    },
    page_btn_tohome: function(e, r) {
        try {
            var o = {
                from: e || "1",
                frompage: r
            };
            wx.reportAnalytics("page_btn_tohome", o), console.log("page_btn_tohome统计" + JSON.stringify(o));
        } catch (e) {
            console.error("page_btn_tohome统计失败");
        }
    },
    launch_scene: function(e) {
        try {
            var r = {
                scene: e || ""
            };
            wx.reportAnalytics("launch_scene", r), console.log("launch_scene统计" + JSON.stringify(r));
        } catch (e) {
            console.error("launch_scene统计失败");
        }
    },
    personal_voice: function() {
        wx.reportAnalytics("personal_voice", null), console.log("personal_voice统计");
    },
    personal_history: function() {
        wx.reportAnalytics("personal_history", null), console.log("personal_history统计");
    },
    remind_strive: function(e) {
        var r = {
            periodtime: e || ""
        };
        wx.reportAnalytics("remind_strive", r), console.log("remind_strive统计" + JSON.stringify(r));
    },
    record_track: function(e) {
        var r = {
            record_index: e || 1
        };
        wx.reportAnalytics("record_track", r), console.log("record_track统计" + JSON.stringify(r));
    },
    visit_channel: function(e) {
        var r = {
            channel: e || 1
        };
        wx.reportAnalytics("visit_channel", r), console.log("visit_channel统计" + JSON.stringify(r));
    },
    active_stats: function() {
        var e = {};
        wx.reportAnalytics("active_stats", e), console.log("active_stats统计" + JSON.stringify(e));
    },
    save_picture: function() {
        wx.reportAnalytics("save_picture", null), console.log("save_picture统计");
    },
    preset_change_article: function() {
        wx.reportAnalytics("preset_change_article", null), console.log("preset_change_article统计");
    },
    news_change_article: function() {
        wx.reportAnalytics("news_change_article", null), console.log("news_change_article统计");
    },
    news_change_tab: function(e) {
        var r = {
            tab: e || 0
        };
        wx.reportAnalytics("news_change_tab", r), console.log("news_change_tab统计" + JSON.stringify(r));
    },
    share_page_show: function(e, r) {
        var o = {
            open: e || 0,
            source: r || 2
        };
        wx.reportAnalytics("share_page_show", o), console.log("share_page_show统计" + JSON.stringify(o));
    },
    voice_banner_tap: function(e) {
        var r = {
            type: e || ""
        };
        wx.reportAnalytics("voice_banner_tap", r), console.log("voice_banner_tap统计:" + JSON.stringify(r));
    },
    spread_apps: function() {
        wx.reportAnalytics("spread_apps", {}), console.log("spread_apps统计");
    },
    phonebind_tap: function() {
        wx.reportAnalytics("phonebind_tap", {}), console.log("phonebind_tap统计");
    }
};