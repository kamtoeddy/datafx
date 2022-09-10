export type ObjectType = Record<number | string, any>;
export type StringKey<T> = Extract<keyof T, string>;
type KeyOf<T> = (keyof T & string) | number;

export type NestedKeyOf<T extends ObjectType> = {
  [Key in KeyOf<T>]: T[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
    : `${Key}`;
}[keyof KeyOf<T>];
