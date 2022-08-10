"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDeepValue = exports.removeDeep = exports.hasDeepKey = exports.getSubObject = exports.getDeepValue = exports.cloneDeep = exports.assignDeep = void 0;
__exportStar(require("./getDifference"), exports);
const getKeys = (key) => Array.isArray(key) ? key : key.split(".");
const hasProp = (obj = {}, prop = "") => obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty(prop);
const assignDeep = (data, { key, value }) => {
    key = getKeys(key);
    const _key = key.shift();
    if (!_key)
        return data;
    if (!key.length) {
        data[_key] = value;
        return data;
    }
    if (data === null || data === void 0 ? void 0 : data[_key])
        data[_key] = {};
    return Object.assign(Object.assign({}, data), { [_key]: (0, exports.assignDeep)(data[_key], { key, value }) });
};
exports.assignDeep = assignDeep;
const cloneDeep = (data) => JSON.parse(JSON.stringify(data));
exports.cloneDeep = cloneDeep;
const getDeepValue = (data, key) => {
    return key.split(".").reduce((prev, next) => prev === null || prev === void 0 ? void 0 : prev[next], data);
};
exports.getDeepValue = getDeepValue;
const getSubObject = (obj, sampleSub) => {
    const _obj = {}, keys = Object.keys(sampleSub);
    keys.forEach((key) => (_obj[key] = (0, exports.getDeepValue)(obj, key)));
    return _obj;
};
exports.getSubObject = getSubObject;
const hasDeepKey = (obj, key) => {
    key = getKeys(key);
    const _key = key.shift();
    if (!_key || !obj)
        return false;
    const keyFound = hasProp(obj, _key);
    if (!keyFound && key.length)
        return false;
    if (keyFound && !key.length)
        return true;
    return (0, exports.hasDeepKey)(obj === null || obj === void 0 ? void 0 : obj[_key], key);
};
exports.hasDeepKey = hasDeepKey;
const removeDeep = (obj, key) => {
    key = getKeys(key);
    const _key = key.shift();
    if (!_key)
        return obj;
    if (!key.length) {
        delete obj[_key];
        return obj;
    }
    return Object.assign(Object.assign({}, obj), { [_key]: (0, exports.removeDeep)(obj[_key], key) });
};
exports.removeDeep = removeDeep;
const setDeepValue = (data, { key, value }) => {
    return (0, exports.assignDeep)((0, exports.cloneDeep)(data), { key, value });
};
exports.setDeepValue = setDeepValue;
