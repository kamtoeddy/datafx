import { ILooseObject } from "../interfaces";
import { getDeepValue } from "../objects";

export const groupBy = (list: ILooseObject[] = [], determinant: any) => {
  if (!list) return [];

  const asFx = typeof determinant === "function";

  return list.reduce((prev, next) => {
    const key = asFx ? determinant(next) : getDeepValue(next, determinant);

    if (key === undefined) return prev;

    if (prev.hasOwnProperty(key)) {
      prev[key].push(next);
    } else {
      prev[key] = [next];
    }

    return prev;
  }, {});
};
