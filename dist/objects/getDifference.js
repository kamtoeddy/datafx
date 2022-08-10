"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDifference = void 0;
const utils_1 = require("../utils");
const getDifference = (a, b) => {
    if ((0, utils_1.isEqual)(a, b))
        return {};
    const diff = {};
    for (let key in a) {
        if ((0, utils_1.isEqual)(a[key], b[key]))
            continue;
        diff[key] = a[key];
    }
    return diff;
};
exports.getDifference = getDifference;
