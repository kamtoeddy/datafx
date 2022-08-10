"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBy = void 0;
const objects_1 = require("../objects");
const utils_1 = require("../utils");
const findBy = (list = [], determinant, options = { fromBack: false }) => {
    const { fromBack } = options;
    const detType = typeof determinant;
    if (detType === "function")
        return list.find(determinant);
    if (fromBack)
        list = list.reverse();
    if (Array.isArray(determinant))
        return list.find((dt) => {
            const [key, value] = determinant;
            const dt_val = (0, objects_1.getDeepValue)(dt, key);
            return (0, utils_1.isEqual)(dt_val, value);
        });
    if (detType === "object")
        return list.find((dt) => {
            const sub = (0, objects_1.getSubObject)(dt, determinant);
            return (0, utils_1.isEqual)(determinant, sub);
        });
    return list.find((dt) => (0, objects_1.getDeepValue)(dt, determinant));
};
exports.findBy = findBy;
