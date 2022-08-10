"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdinalPosition = void 0;
const getOrdinalPosition = (value) => {
    if (isNaN(value))
        return "";
    if (value === 1)
        return "st";
    if (value === 2)
        return "nd";
    if (value === 3)
        return "rd";
    if (value === 0 || (value >= 4 && value <= 20))
        return "th";
    return (0, exports.getOrdinalPosition)(parseInt(`${value % 10}`));
};
exports.getOrdinalPosition = getOrdinalPosition;
