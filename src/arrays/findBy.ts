import { ObjectType } from "../interfaces";
import { getDeepValue, getSubObject } from "../objects";
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

  if (detType === "object")
    return list.find((dt) => {
      const sub = getSubObject(dt as ObjectType, determinant);
      console.log(determinant, sub);
      return isEqual(determinant, sub);
    });
};
