"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsAt = void 0;
const getItemsAt = (list, start = 0, end) => {
    return [...list].slice(start, end);
};
exports.getItemsAt = getItemsAt;
