import { ObjectType } from "./interfaces";
interface Translations {
    [locale: string]: ObjectType;
}
export declare class Translator {
    [key: string]: any;
    fallback: string;
    locale: string;
    locales: string[];
    private translations;
    constructor(translations: Translations, fallback?: string);
    private isValidLocale;
    private getAlternative;
    setLocale: (locale: string) => string | undefined;
    translate: (key: string, depth?: number) => any;
}
export {};
