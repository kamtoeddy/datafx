"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBy = void 0;
const objects_1 = require("../objects");
const utils_1 = require("../utils");
const asArray = (list, determinant, options = { exclude: false }) => {
    const { exclude } = options;
    return list.filter((dt) => {
        const [key, value] = determinant;
        const dt_val = (0, objects_1.getDeepValue)(dt, key);
        const allowed = (0, utils_1.isEqual)(dt_val, value);
        return exclude ? !allowed : allowed;
    });
};
const asFunction = (list, determinant, options = { exclude: false }) => {
    const { exclude } = options;
    return list.filter((dt) => {
        const allowed = determinant(dt);
        return exclude ? !allowed : allowed;
    });
};
const asObject = (list, determinant, options = { exclude: false }) => {
    const { exclude } = options;
    return list.filter((dt) => {
        const sub = (0, objects_1.getSubObject)(dt, determinant);
        let allowed = (0, utils_1.isEqual)(determinant, sub);
        return exclude ? !allowed : allowed;
    });
};
const filterBy = (list, determinant, options = { exclude: false }) => {
    const detType = typeof determinant;
    if (detType === "function")
        return asFunction(list, determinant, options);
    if (Array.isArray(determinant))
        return asArray(list, determinant, options);
    if (detType === "object")
        return asObject(list, determinant, options);
    const { exclude } = options;
    return list.filter((dt) => {
        let allowed = (0, objects_1.getDeepValue)(dt, determinant);
        return exclude ? !allowed : allowed;
    });
};
exports.filterBy = filterBy;
