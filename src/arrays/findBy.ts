import { ObjectType } from "../interfaces";
import {
  assignDeep,
  getDeepValue,
  getSubObject,
  isDeepKeyed,
} from "../objects";
import { isEqual } from "../utils";

type FindByOptions = { fromBack?: boolean };

type Fx = <T>(
  list: T[],
  determinant: any,
  options?: FindByOptions
) => T | undefined;

export const findBy: Fx = <T>(
  list: T[],
  determinant: any,
  options: FindByOptions = { fromBack: false }
) => {
  const { fromBack } = options;
  const detType = typeof determinant;

  if (detType === "function") return list.find(determinant);

  if (fromBack) list = list.reverse();

  if (Array.isArray(determinant))
    return list.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt as ObjectType, key);

      return isEqual(dt_val, value);
    });

  return list.find((dt) => {
    const keys = Object.keys(determinant);

    const sub = getSubObject(dt as ObjectType, keys);

    if (!isDeepKeyed(determinant)) return isEqual(sub, determinant);

    const determinantObject = {};

    keys.forEach((key) =>
      assignDeep(determinantObject, { key, value: determinant[key] })
    );

    return isEqual(sub, determinantObject);
  });
};
