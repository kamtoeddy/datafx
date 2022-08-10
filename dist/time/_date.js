"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateAfter = exports.addMinutes = void 0;
function addMinutes(date, minutes = 1) {
    return new Date(new Date(date).getTime() + minutes * 60000);
}
exports.addMinutes = addMinutes;
function isDateAfter(date, refDate, minsOfTolerance = 0) {
    return (new Date(date).getTime() > addMinutes(refDate, minsOfTolerance).getTime());
}
exports.isDateAfter = isDateAfter;
