function t(t, e, n, o) {
    Object.defineProperty(t, e, {
        value: n,
        enumerable: !!o,
        writable: !0,
        configurable: !0
    });
}

function e(t, e) {
    t.__proto__ = e;
}

function n(e, n, o) {
    for (var i = 0, r = o.length; i < r; i++) {
        var s = o[i];
        t(e, s, n[s]);
    }
}

function o(t) {
    this.data = t, Array.isArray(t) ? ((h ? e : n)(t, f, p), this.observeArray(t)) : this.walk(t);
}

function i(t, e) {
    if (t && "object" === (void 0 === t ? "undefined" : u(t))) return new o(t);
}

function r() {
    this.id = l++, this.subs = [];
}

function s(t, e, n) {
    this.cb = n, this.vm = t, this.expOrFn = e, this.depIds = {}, this.getter = "function" == typeof e ? e : this.parseGetter(e), 
    this.value = this.get();
}

function a(t) {
    this.$options = t || {};
    var e = this._data = this.$options.data, n = this;
    Object.keys(e).forEach(function(t) {
        n._proxyData(t);
    }), i(e, this);
}

var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, c = Array.prototype, f = Object.create(c);

[ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ].forEach(function(e) {
    var n = c[e];
    t(f, e, function() {
        for (var t = arguments.length, e = new Array(t); t--; ) e[t] = arguments[t];
        return n.apply(this, e);
    });
});

var h = "__proto__" in {}, p = Object.getOwnPropertyNames(f);

o.prototype = {
    observeArray: function(t) {
        for (var e = 0, n = t.length; e < n; e++) i(t[e]);
    },
    walk: function(t) {
        var e = this;
        Object.keys(t).forEach(function(n) {
            e.convert(n, t[n]);
        });
    },
    convert: function(t, e) {
        this.defineReactive(this.data, t, e);
    },
    defineReactive: function(t, e, n) {
        var o = new r(), s = i(n);
        Object.defineProperty(t, e, {
            enumerable: !0,
            configurable: !1,
            get: function() {
                return r.target && o.depend(), console.log("访问：：" + e), n;
            },
            set: function(t) {
                console.log("设置：：：：" + t), t !== n && (n = t, s = i(t), console.warn(o), o.notify());
            }
        });
    }
};

var l = 0;

r.prototype = {
    addSub: function(t) {
        this.subs.push(t);
    },
    depend: function() {
        r.target.addDep(this);
    },
    removeSub: function(t) {
        var e = this.subs.indexOf(t);
        -1 != e && this.subs.splice(e, 1);
    },
    notify: function() {
        this.subs.forEach(function(t) {
            t.update();
        });
    }
}, r.target = null, s.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var t = this.get(), e = this.value;
        console.log(JSON.stringify(t)), console.log(JSON.stringify(e)), t !== e && (this.value = t, 
        this.cb.call(this.vm, t, e));
    },
    addDep: function(t) {
        this.depIds.hasOwnProperty(t.id) || (t.addSub(this), this.depIds[t.id] = t);
    },
    get: function() {
        r.target = this;
        var t = this.getter.call(this.vm, this.vm);
        return r.target = null, t;
    },
    parseGetter: function(t) {
        if (!/[^\w.$]/.test(t)) {
            var e = t.split(".");
            return function(t) {
                for (var n = 0, o = e.length; n < o; n++) {
                    if (!t) return;
                    t = t[e[n]];
                }
                return t;
            };
        }
    }
}, a.prototype = {
    $watch: function(t, e, n) {
        new s(this, t, e);
    },
    _proxyData: function(t, e, n) {
        var o = this;
        e = e || Object.defineProperty(o, t, {
            configurable: !1,
            enumerable: !0,
            get: function() {
                return o._data[t];
            },
            set: function(e) {
                o._data[t] = e;
            }
        });
    }
}, module.exports = {
    DDM: a
};