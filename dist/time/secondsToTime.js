"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsToTime = void 0;
function secondsToTime(timeInSecs) {
    const days = Math.floor(timeInSecs / (60 * 60 * 24));
    timeInSecs -= days * (60 * 60 * 24);
    const hours = Math.floor(timeInSecs / (60 * 60));
    timeInSecs -= hours * (60 * 60);
    const minutes = Math.floor(timeInSecs / 60);
    timeInSecs -= minutes * 60;
    return {
        days,
        hours,
        minutes,
        seconds: Math.floor(timeInSecs),
    };
}
exports.secondsToTime = secondsToTime;
