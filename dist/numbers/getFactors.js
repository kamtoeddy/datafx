"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactors = void 0;
const isDivisibleBy_1 = require("./isDivisibleBy");
const toInteger_1 = require("./toInteger");
const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++)
        if ((0, isDivisibleBy_1.isDivisibleBy)((0, toInteger_1.toInteger)(num), i))
            factors.push(i);
    return factors;
};
exports.getFactors = getFactors;
