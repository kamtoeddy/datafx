import { ObjectType, StringKey } from "./interfaces";
import { getDeepValue } from "./objects";

type Translations = Record<string, ObjectType>;

export class Translator<T extends Translations> {
  private _fallback: StringKey<T>;
  private _locale: StringKey<T>;
  private _locales: StringKey<T>[] = [];

  constructor(private translations: T, fallback: StringKey<T>) {
    this.translations = translations;

    this._locales = Object.keys(this.translations) as StringKey<T>[];

    if (!fallback || !this.isValidLocale(fallback))
      fallback = this._locales[0] as StringKey<T>;

    this._fallback = fallback as StringKey<T>;
    this._locale = this._fallback;
  }

  get fallback() {
    return this._fallback;
  }

  get locale() {
    return this._locale;
  }

  get locales() {
    return this._locales;
  }

  private isValidLocale = (locale: any) =>
    this._locales.includes(locale as StringKey<T>);

  private getAlternative(key: string, depth: number) {
    const keys = key.split(".");

    return key.split(".")[keys.length - depth];
  }

  setLocale = (locale: StringKey<T>) => {
    if (!this.isValidLocale(locale)) return;
    this._locale = locale;

    return this._locale;
  };

  translate = (key: string, depth = 1) => {
    return (
      getDeepValue(this.translations[this._locale], key as any) ??
      getDeepValue(this.translations[this._fallback], key as any) ??
      this.getAlternative(key, depth)
    );
  };
}
