import { ObjectType } from "./interfaces";
import { getDeepValue } from "./objects";

type Translations = Record<string, ObjectType>;

export class Translator {
  fallback: string = "";
  locale: string = "";
  locales: string[] = [];

  constructor(private translations: Translations, fallback: string) {
    this.translations = translations;

    this.locales = Object.keys(this.translations);

    if (!fallback || !this.isValidLocale(fallback)) fallback = this.locales[0];

    this.fallback = fallback;

    this.setLocale(fallback);
  }

  private isValidLocale = (locale: any) => this.locales.includes(locale);

  private getAlternative(key: string, depth: number) {
    const keys = key.split(".");

    return key.split(".")[keys.length - depth];
  }

  setLocale = (locale: string) => {
    if (!this.isValidLocale(locale)) return;
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
