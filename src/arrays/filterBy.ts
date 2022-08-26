import { ObjectType } from "../interfaces";
import { getDeepValue, getSubObject } from "../objects";
import { isEqual } from "../utils";

type FilterByOptions = { exclude?: boolean };

type Fx = <T>(list: T[], determinant: any, options?: FilterByOptions) => T[];

const asArray: Fx = <T>(
  list: T[],
  determinant: any,
  options: FilterByOptions = { exclude: false }
) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const [key, value] = determinant;
    const dt_val = getDeepValue(dt as ObjectType, key);

    const allowed = isEqual(dt_val, value);

    return exclude ? !allowed : allowed;
  });
};

const asFunction: Fx = <T>(
  list: T[],
  determinant: any,
  options: FilterByOptions = { exclude: false }
) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const allowed = determinant(dt);
    return exclude ? !allowed : allowed;
  });
};

const asObject: Fx = <T>(
  list: T[],
  determinant: any,
  options: FilterByOptions = { exclude: false }
) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const sub = getSubObject(dt as ObjectType, Object.keys(determinant));

    let allowed = isEqual(determinant, sub);

    return exclude ? !allowed : allowed;
  });
};

export const filterBy: Fx = <T>(
  list: T[],
  determinant: any,
  options: FilterByOptions = { exclude: false }
) => {
  const detType = typeof determinant;

  if (detType === "function") return asFunction(list, determinant, options);

  if (Array.isArray(determinant)) return asArray(list, determinant, options);

  if (detType === "object") return asObject(list, determinant, options);

  const { exclude } = options;

  return list.filter((dt) => {
    let allowed = getDeepValue(dt as ObjectType, determinant);
    return exclude ? !allowed : allowed;
  });
};
