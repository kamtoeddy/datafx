"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBy = void 0;
const objects_1 = require("../objects");
const asObject = (list, key, order) => {
    return list.sort((a, b) => {
        const a_val = (0, objects_1.getDeepValue)(a, key);
        const b_val = (0, objects_1.getDeepValue)(b, key);
        let _order = (order === null || order === void 0 ? void 0 : order.toLowerCase()) === "desc" ? 1 : -1;
        return a_val < b_val ? _order : -_order;
    });
};
const sortBy = (list, determinant, order) => {
    if (!determinant)
        return list.sort((a, b) => (a < b ? -1 : 1));
    const detType = typeof determinant;
    if (detType === "function")
        return list.sort(determinant);
    return asObject(list, determinant, order);
};
exports.sortBy = sortBy;
