import { looseObjArr } from "../interfaces";
import { getDeepValue, getSubObject } from "../objects";
import { isEqual } from "../utils";

export const findBy = (data: looseObjArr = [], determinant: any) => {
  const detType = typeof determinant;

  if (detType === "function") return data.find(determinant);

  if (Array.isArray(determinant))
    return data.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt, { key });

      return isEqual(dt_val, value);
    });

  if (detType === "object")
    return data.find((dt) => {
      const sub = getSubObject(dt, determinant);

      return isEqual(determinant, sub);
    });

  return data.find((dt) => getDeepValue(dt, { key: determinant }));
};
