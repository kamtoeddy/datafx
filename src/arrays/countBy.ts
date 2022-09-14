import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Counter<T> = (item: T) => any;

const useCount = (obj: ObjectType, key: string) => {
  obj[key] ? obj[key]++ : (obj[key] = 1);

  return obj;
};

const countInstances = (array: any[]) => {
  const obj: ObjectType = {};

  array.forEach((key) => useCount(obj, key));

  return obj;
};

export const countBy = <T>(
  array: T[],
  determinant?: Counter<T> | NestedKeyOf<T>
) => {
  if (!array) return [];

  if (!determinant) return countInstances(array);

  const asFx = typeof determinant === "function";

  return array.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next as ObjectType, determinant);

    return useCount(prev, key);
  }, {} as ObjectType);
};
