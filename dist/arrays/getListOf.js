"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListOf = void 0;
const objects_1 = require("../objects");
const getListOf = (list, key, { unique } = { unique: false }) => {
    const _list = list.map((dt) => (0, objects_1.getDeepValue)(dt, key));
    return unique ? [...new Set(_list)] : _list;
};
exports.getListOf = getListOf;
