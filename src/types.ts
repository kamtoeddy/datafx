export type ObjectKey = string | number | symbol;
export type ObjectType<K extends ObjectKey = ObjectKey> = Record<K, any>;
export type StringKey<T> = Extract<keyof T, string>;

export type DeepKeyOf<T, K extends keyof T = keyof T> = K extends
  | string
  | number
  | `${number}`
  ? T[K] extends infer R
    ? R extends Function
      ? never
      : R extends Record<string, unknown>
      ? `${K}` | `${K}.${DeepKeyOf<R>}`
      : `${K}`
    : never
  : never;

export type DeepValueOf<
  T,
  P extends DeepKeyOf<T>
> = P extends `${infer K}.${infer Rest}`
  ? T[K & keyof T] extends infer S
    ? Rest extends DeepKeyOf<S>
      ? DeepValueOf<S, Rest>
      : never
    : never
  : T[P & keyof T];
