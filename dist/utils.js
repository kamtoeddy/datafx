"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIfFalsy = exports.prettyTime = exports.setPadStart = exports.isEqual = exports.capitalise = void 0;
const secondsToTime_1 = require("./time/secondsToTime");
const capitaliseOne = (word = "") => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
const capitalise = (value) => {
    if (typeof value !== "string")
        return value;
    value = value.trim();
    if (value === "")
        return value;
    let _capitalised = "";
    value.split(" ").forEach((word, index) => {
        if (index !== 0)
            _capitalised += " ";
        _capitalised += capitaliseOne(word);
    });
    return _capitalised;
};
exports.capitalise = capitalise;
function isEqual(a, b) {
    const typeOf_a = typeof a;
    const typeOf_b = typeof b;
    if (typeOf_a !== typeOf_b)
        return false;
    if (typeOf_a === "undefined")
        return true;
    let ref_a = a;
    let ref_b = b;
    if (!["bigint", "boolean", "number", "string", "symbol"].includes(typeOf_a)) {
        ref_a = JSON.stringify(ref_a);
        ref_b = JSON.stringify(ref_b);
    }
    return ref_a === ref_b;
}
exports.isEqual = isEqual;
function setPadStart(str = "", num = 2, symbol = "0") {
    return String(str).padStart(num, symbol);
}
exports.setPadStart = setPadStart;
function prettyTime(ms) {
    const { days, hours, minutes } = (0, secondsToTime_1.secondsToTime)(ms);
    let result = "";
    if (days)
        result = `${setPadStart(days)}j`;
    if (hours)
        result = `${result} ${setPadStart(hours)}h`;
    if (minutes)
        result = `${result} ${setPadStart(minutes)}m`;
    return result.trim() || "00m";
}
exports.prettyTime = prettyTime;
const useIfFalsy = (alternate, v, determinant) => {
    if (!determinant)
        return v ? v : alternate;
    return determinant(v) ? alternate : v;
};
exports.useIfFalsy = useIfFalsy;
