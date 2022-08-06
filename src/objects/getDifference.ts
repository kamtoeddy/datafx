import { ObjectType } from "../interfaces";
import { isEqual } from "../utils";

export const getDifference = (a: ObjectType, b: ObjectType) => {
  if (isEqual(a, b)) return {};

  const diff: ObjectType = {};

  for (let key in a) {
    if (isEqual(a[key], b[key])) continue;

    diff[key] = a[key];
  }

  return diff;
};
