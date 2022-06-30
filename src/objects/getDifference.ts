import { looseObject } from "../interfaces";
import { isEqual } from "../utils";

export const getDifference = (a: looseObject, b: looseObject) => {
  if (isEqual(a, b)) return {};

  const diff: looseObject = {};

  for (let key in a) {
    if (isEqual(a[key], b[key])) continue;

    diff[key] = a[key];
  }

  return diff;
};
