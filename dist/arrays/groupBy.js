"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
const objects_1 = require("../objects");
const groupBy = (list = [], determinant) => {
    if (!list)
        return [];
    const asFx = typeof determinant === "function";
    return list.reduce((prev, next) => {
        const key = asFx ? determinant(next) : (0, objects_1.getDeepValue)(next, determinant);
        if (key === undefined)
            return prev;
        if (prev.hasOwnProperty(key)) {
            prev[key].push(next);
        }
        else {
            prev[key] = [next];
        }
        return prev;
    }, {});
};
exports.groupBy = groupBy;
