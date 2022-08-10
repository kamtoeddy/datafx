"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = void 0;
const toBase64 = async (file) => {
    return new Promise((reslove, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => reslove(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
exports.toBase64 = toBase64;
