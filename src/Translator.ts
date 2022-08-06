import { ObjectType } from "./interfaces";
import { getDeepValue } from "./objects";

interface Translations {
  [locale: string]: ObjectType;
}

export class Translator {
  [key: string]: any;

  fallback: string = "";
  locale: string = "";
  locales: string[] = [];
  private translations: Translations = {};

  constructor(translations: Translations, fallback?: string) {
    this.translations = translations;

    const locales = Object.keys(this.translations);
    this.locales = locales;

    if (!fallback || !this.isValidLocale(fallback)) fallback = locales[0];

    this.fallback = fallback;

    this.setLocale(fallback);
  }

  private isValidLocale = (locale: any) => {
    return this.locales.includes(locale);
  };

  private getAlternative(key: string, depth: number) {
    const keys = key.split(".");

    return keys[keys.length - depth];
  }

  setLocale = (locale: string) => {
    if (!this.locales.includes(locale)) return;
    this.locale = locale;

    return this.locale;
  };

  translate = (key: string, depth = 1) => {
    return (
      getDeepValue(this.translations[this.locale], key) ??
      getDeepValue(this.translations[this.fallback], key) ??
      this.getAlternative(key, depth)
    );
  };
}
