"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueBy = void 0;
const objects_1 = require("../objects");
const getUnique = (list) => {
    list = list.map((dt) => {
        try {
            return JSON.stringify(dt);
        }
        catch (err) {
            return dt;
        }
    });
    list = Array.from(new Set(list));
    list = list.map((dt) => {
        try {
            return JSON.parse(dt);
        }
        catch (err) {
            return dt;
        }
    });
    return list;
};
const getUniqueBy = (list, key, { backwards } = { backwards: false }) => {
    if (backwards)
        list = list.reverse();
    if (!key)
        return getUnique(list);
    let obj = {};
    list.forEach((dt) => (obj[(0, objects_1.getDeepValue)(dt, key)] = dt));
    return Object.values(obj);
};
exports.getUniqueBy = getUniqueBy;
