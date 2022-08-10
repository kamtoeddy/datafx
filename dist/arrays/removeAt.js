"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAt = void 0;
const removeAt = (list = [], start = 0, deleteCount = 1) => {
    const newList = [...list];
    newList.splice(start, deleteCount);
    return newList;
};
exports.removeAt = removeAt;
