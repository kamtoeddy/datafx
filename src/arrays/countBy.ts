import { looseObjArr } from "../interfaces";
import { getDeepValue } from "../objects";

export const countBy = (data: looseObjArr = [], determinant: any) => {
  if (!data) return [];

  const asFx = typeof determinant === "function";

  return data.reduce((prev, next) => {
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
