import { getDeepValue, getSubObject } from "../objects";
import { isEqual } from "../utils";

type options = { fromBack?: boolean };

type Fx = (list: any[], determinant: any, options?: options) => any[];

export const findBy: Fx = (
  list = [],
  determinant,
  options = { fromBack: false }
) => {
  const { fromBack } = options;
  const detType = typeof determinant;

  if (detType === "function") return list.find(determinant);

  if (fromBack) list = list.reverse();

  if (Array.isArray(determinant))
    return list.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt, { key });

      return isEqual(dt_val, value);
    });

  if (detType === "object")
    return list.find((dt) => {
      const sub = getSubObject(dt, determinant);

      return isEqual(determinant, sub);
    });

  return list.find((dt) => getDeepValue(dt, { key: determinant }));
};
