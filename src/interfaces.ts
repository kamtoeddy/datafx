export type ObjectType = Record<number | string, any>;
export type StringKey<T> = Extract<keyof T, string>;
type KeyOf<T> = keyof T & (string | number);

export type NestedKeyOf<T> = T extends never
  ? ""
  : {
      [Key in KeyOf<T>]: T[Key] extends ObjectType
        ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
        : `${Key}`;
    }[KeyOf<T>];
