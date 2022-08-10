"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.debounce = void 0;
const debounce = (cb, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => cb(...args), delay !== null && delay !== void 0 ? delay : 1000);
    };
};
exports.debounce = debounce;
const throttle = (cb, delay) => {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (!waitingArgs)
            return (shouldWait = false);
        cb(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay !== null && delay !== void 0 ? delay : 1000);
    };
    return (...args) => {
        if (shouldWait)
            return (waitingArgs = args);
        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay !== null && delay !== void 0 ? delay : 1000);
    };
};
exports.throttle = throttle;
