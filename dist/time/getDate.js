"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
const getDateString = (value = new Date()) => new Date(value).toISOString().substring(0, 10);
exports.getDateString = getDateString;
