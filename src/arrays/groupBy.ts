import { ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type GroupedMap<T> = {
  [key: number | string]: T[];
};

export const groupBy = <T>(list: T[] = [], determinant: any) => {
  if (!list) return {} as GroupedMap<T>;

  const asFx = typeof determinant === "function";

  return list.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next as ObjectType, determinant);

    if (key === undefined) return prev;

    prev.hasOwnProperty(key) ? prev[key].push(next) : (prev[key] = [next]);

    return prev;
  }, {} as GroupedMap<T>);
};
