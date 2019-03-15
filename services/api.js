Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.sysvcns_api = void 0;

var e = require("../utils/wx.request.js"), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/config.js"));

exports.sysvcns_api = function(r, t, u) {
    var i = {};
    return i.url = s.default.ifc.sysvcns, i.data = r, (0, e.request)(i, t, u);
};