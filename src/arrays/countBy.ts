import { looseObject } from "../interfaces";
import { getDeepValue } from "../objects";

export const countBy = (list: looseObject[] = [], determinant: any) => {
  if (!list) return [];

  const asFx = typeof determinant === "function";

  return list.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next, { key: determinant });

    if (key === undefined) return prev;

    if (prev.hasOwnProperty(key)) {
      prev[key] += 1;
    } else {
      prev[key] = 1;
    }

    return prev;
  }, {});
};
