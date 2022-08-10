"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeLeft = void 0;
const utils_1 = require("../utils");
const isNegative = (v) => isNaN(v) || v < 0;
const getTimeLeft = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date().toUTCString());
    const seconds = (0, utils_1.useIfFalsy)(0, Math.floor((total / 1000) % 60), isNegative);
    const minutes = (0, utils_1.useIfFalsy)(0, Math.floor((total / 1000 / 60) % 60), isNegative);
    const hours = (0, utils_1.useIfFalsy)(0, Math.floor((total / (1000 * 60 * 60)) % 24), isNegative);
    const days = (0, utils_1.useIfFalsy)(0, Math.floor(total / (1000 * 60 * 60 * 24)), isNegative);
    const isOver = [days, hours, minutes, seconds].every((v) => v === 0);
    return { isOver, days, hours, minutes, seconds };
};
exports.getTimeLeft = getTimeLeft;
