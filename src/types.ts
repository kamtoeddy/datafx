export type ObjectKey = string | number | symbol
export type ObjectType<K extends ObjectKey = ObjectKey> = Record<K, any>
export type StringKey<T> = Extract<keyof T, string>

export type NestedKeyOf<T> = T extends ObjectType
  ? {
      [Key in keyof T & (string | number)]: T[Key] extends Array<any>
        ? Key
        : T[Key] extends ObjectType
        ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
        : `${Key}`
    }[keyof T & (string | number)]
  : ''
