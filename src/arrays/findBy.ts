import { looseObject } from "../interfaces";
import { getDeepValue, getSubObject } from "../objects";
import { isEqual } from "../utils";

export const findBy = (list: looseObject[] = [], determinant: any) => {
  const detType = typeof determinant;

  if (detType === "function") return list.find(determinant);

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
