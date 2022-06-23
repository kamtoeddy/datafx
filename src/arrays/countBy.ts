import { looseObject } from "../interfaces";
import { getDeepValue } from "../objects";

const useCount = (obj: looseObject, key: string) => {
  return obj[key] ? obj[key]++ : (obj[key] = 1);
};

const countInstances = (list: any[]) => {
  const obj: looseObject = {};

  list.forEach((key) => useCount(obj, key));

  return obj;
};

export const countBy = (list: any[] = [], determinant?: any) => {
  if (!list) return [];

  if (!determinant) return countInstances(list);

  const asFx = typeof determinant === "function";

  return list.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next, { key: determinant });

    if (key === undefined) return prev;

    return useCount(prev, key);
  }, {});
};
