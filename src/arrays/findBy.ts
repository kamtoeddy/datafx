import { ObjectType } from "../interfaces";
import {
  assignDeep,
  getDeepValue,
  getSubObject,
  isDeepKeyed,
} from "../objects";
import { isEqual } from "../utils";

type Options = { fromBack?: boolean };

export const findBy = <T>(
  list: T[],
  determinant: any,
  { fromBack }: Options = { fromBack: false }
) => {
  const detType = typeof determinant;

  let _list = [...list];
  if (fromBack) _list = _list.reverse();

  if (detType === "function") return _list.find(determinant);

  if (Array.isArray(determinant))
    return _list.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt as ObjectType, key);

      return isEqual(dt_val, value);
    });

  return _list.find((dt) => {
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
