import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Grouper<T> = (item: T) => any;
type GroupedMap<T> = Record<NestedKeyOf<T>, T[]>;

export const groupBy = <T>(
  array: T[],
  determinant: Grouper<T> | NestedKeyOf<T>
) => {
  if (!array) return {} as GroupedMap<T>;

  const asFx = typeof determinant === "function";

  return array.reduce((prev, next) => {
    const key = asFx
      ? (determinant(next) as NestedKeyOf<T>)
      : (getDeepValue(
          next as ObjectType,
          determinant as string
        ) as NestedKeyOf<T>);

    if (key === undefined) return prev;

    prev.hasOwnProperty(key) ? prev[key].push(next) : (prev[key] = [next]);

    return prev;
  }, {} as GroupedMap<T>);
};
