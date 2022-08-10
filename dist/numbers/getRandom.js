"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
const getRandom = ({ lowerB = 0.0, upperB = 100.0, dp = 0, } = {
    lowerB: 0.0,
    upperB: 100.0,
    dp: 0,
}) => {
    return Number((Math.random() * (upperB - lowerB) + lowerB).toFixed(dp));
};
exports.getRandom = getRandom;
