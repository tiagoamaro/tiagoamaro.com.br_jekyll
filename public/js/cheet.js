// cheet.js https://github.com/namuol/cheet.js
!function (global) {
    "use strict";
    function keydown(e) {
        var id, k = e ? e.keyCode : event.keyCode;
        if (!held[k]) {
            held[k] = !0;
            for (id in sequences)sequences[id].keydown(k)
        }
    }

    function keyup(e) {
        var k = e ? e.keyCode : event.keyCode;
        held[k] = !1
    }

    function resetHeldKeys() {
        var k;
        for (k in held)held[k] = !1
    }

    function on(obj, type, fn) {
        obj.addEventListener ? obj.addEventListener(type, fn, !1) : obj.attachEvent && (obj["e" + type + fn] = fn, obj[type + fn] = function () {
            obj["e" + type + fn](window.event)
        }, obj.attachEvent("on" + type, obj[type + fn]))
    }

    var cheet, Sequence, sequences = {}, keys = {
        backspace: 8,
        tab: 9,
        enter: 13,
        "return": 13,
        shift: 16,
        "⇧": 16,
        control: 17,
        ctrl: 17,
        "⌃": 17,
        alt: 18,
        option: 18,
        "⌥": 18,
        pause: 19,
        capslock: 20,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        L: 37,
        "←": 37,
        up: 38,
        U: 38,
        "↑": 38,
        right: 39,
        R: 39,
        "→": 39,
        down: 40,
        D: 40,
        "↓": 40,
        insert: 45,
        "delete": 46,
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        "⌘": 91,
        command: 91,
        kp_0: 96,
        kp_1: 97,
        kp_2: 98,
        kp_3: 99,
        kp_4: 100,
        kp_5: 101,
        kp_6: 102,
        kp_7: 103,
        kp_8: 104,
        kp_9: 105,
        kp_multiply: 106,
        kp_plus: 107,
        kp_minus: 109,
        kp_decimal: 110,
        kp_divide: 111,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        equal: 187,
        "=": 187,
        comma: 188,
        ",": 188,
        minus: 189,
        "-": 189,
        period: 190,
        ".": 190
    }, NOOP = function () {
    }, held = {};
    Sequence = function (str, next, fail, done) {
        var i;
        for (this.str = str, this.next = next ? next : NOOP, this.fail = fail ? fail : NOOP, this.done = done ? done : NOOP, this.seq = str.split(" "), this.keys = [], i = 0; i < this.seq.length; ++i)this.keys.push(keys[this.seq[i]]);
        this.idx = 0
    }, Sequence.prototype.keydown = function (keyCode) {
        var i = this.idx;
        return keyCode !== this.keys[i] ? void(i > 0 && (this.reset(), this.fail(this.str), cheet.__fail(this.str))) : (this.next(this.str, this.seq[i], i, this.seq), cheet.__next(this.str, this.seq[i], i, this.seq), void(++this.idx === this.keys.length && (this.done(this.str), cheet.__done(this.str), this.reset())))
    }, Sequence.prototype.reset = function () {
        this.idx = 0
    }, cheet = function (str, handlers) {
        var next, fail, done;
        "function" == typeof handlers ? done = handlers : null !== handlers && void 0 !== handlers && (next = handlers.next, fail = handlers.fail, done = handlers.done), sequences[str] = new Sequence(str, next, fail, done)
    }, cheet.disable = function (str) {
        delete sequences[str]
    }, on(window, "keydown", keydown), on(window, "keyup", keyup), on(window, "blur", resetHeldKeys), on(window, "focus", resetHeldKeys), cheet.__next = NOOP, cheet.next = function (fn) {
        cheet.__next = null === fn ? NOOP : fn
    }, cheet.__fail = NOOP, cheet.fail = function (fn) {
        cheet.__fail = null === fn ? NOOP : fn
    }, cheet.__done = NOOP, cheet.done = function (fn) {
        cheet.__done = null === fn ? NOOP : fn
    }, cheet.reset = function (id) {
        var seq = sequences[id];
        return seq instanceof Sequence ? void seq.reset() : void console.warn("cheet: Unknown sequence: " + id)
    }, global.cheet = cheet, "function" == typeof define && define.amd ? define([], function () {
        return cheet
    }) : "undefined" != typeof module && null !== module && (module.exports = cheet)
}(this);

// Show Easter egg

var show_marine = function() { document.getElementById('easter_egg').style.display = "inline-block"; };
cheet('↑ ↑ ↓ ↓ ← → ← → b a', show_marine);
cheet('i d d q d', show_marine);
cheet('i d k f a', show_marine);
cheet('i d f a', show_marine);
