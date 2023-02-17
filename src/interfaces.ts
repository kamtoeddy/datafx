export type ObjectType = Record<number | string, any>;
export type StringKey<T> = Extract<keyof T, string>;

export type NestedKeyOf<T> = T extends never
  ? ""
  : {
      [K in StringKey<T>]: T[K] extends Function
        ? never
        : T[K] extends Array<any>
        ? `${K}.${NestedKeyOf<T[K]>}`
        : `${K}` | `${K}.${NestedKeyOf<T[K]>}`;
    }[StringKey<T>];
