"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
const objects_1 = require("./objects");
class Translator {
    constructor(translations, fallback) {
        this.fallback = "";
        this.locale = "";
        this.locales = [];
        this.translations = {};
        this.isValidLocale = (locale) => {
            return this.locales.includes(locale);
        };
        this.setLocale = (locale) => {
            if (!this.locales.includes(locale))
                return;
            this.locale = locale;
            return this.locale;
        };
        this.translate = (key, depth = 1) => {
            var _a, _b;
            return ((_b = (_a = (0, objects_1.getDeepValue)(this.translations[this.locale], key)) !== null && _a !== void 0 ? _a : (0, objects_1.getDeepValue)(this.translations[this.fallback], key)) !== null && _b !== void 0 ? _b : this.getAlternative(key, depth));
        };
        this.translations = translations;
        const locales = Object.keys(this.translations);
        this.locales = locales;
        if (!fallback || !this.isValidLocale(fallback))
            fallback = locales[0];
        this.fallback = fallback;
        this.setLocale(fallback);
    }
    getAlternative(key, depth) {
        const keys = key.split(".");
        return keys[keys.length - depth];
    }
}
exports.Translator = Translator;
