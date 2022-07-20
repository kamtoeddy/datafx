import { ILooseObject } from "../interfaces";
import { isEqual } from "../utils";

export const getDifference = (a: ILooseObject, b: ILooseObject) => {
  if (isEqual(a, b)) return {};

  const diff: ILooseObject = {};

  for (let key in a) {
    if (isEqual(a[key], b[key])) continue;

    diff[key] = a[key];
  }

  return diff;
};
