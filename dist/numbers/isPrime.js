"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrime = void 0;
const getFactors_1 = require("./getFactors");
const isPrime = (num) => num < 2 ? false : (0, getFactors_1.getFactors)(num).length === 2;
exports.isPrime = isPrime;
