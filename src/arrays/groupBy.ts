import { looseObject } from "../interfaces";
import { getDeepValue } from "../objects";

export const groupBy = (list: looseObject[] = [], determinant: any) => {
  if (!list) return [];

  const asFx = typeof determinant === "function";

  return list.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next, { key: determinant });

    if (key === undefined) return prev;

    if (prev.hasOwnProperty(key)) {
      prev[key].push(next);
    } else {
      prev[key] = [next];
    }

    return prev;
  }, {});
};
