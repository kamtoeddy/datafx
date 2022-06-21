import { looseObjArr } from "../interfaces";
import { getDeepValue } from "../utils";

export const groupBy = (data: looseObjArr = [], determinant: any) => {
  if (!data) return [];

  const asFx = typeof determinant === "function";

  return data.reduce((prev, next) => {
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
