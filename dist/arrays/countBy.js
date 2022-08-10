"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countBy = void 0;
const objects_1 = require("../objects");
const useCount = (obj, key) => {
    return obj[key] ? obj[key]++ : (obj[key] = 1);
};
const countInstances = (list) => {
    const obj = {};
    list.forEach((key) => useCount(obj, key));
    return obj;
};
const countBy = (list = [], determinant) => {
    if (!list)
        return [];
    if (!determinant)
        return countInstances(list);
    const asFx = typeof determinant === "function";
    return list.reduce((prev, next) => {
        const key = asFx ? determinant(next) : (0, objects_1.getDeepValue)(next, determinant);
        if (key === undefined)
            return prev;
        return useCount(prev, key);
    }, {});
};
exports.countBy = countBy;
