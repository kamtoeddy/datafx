import { ObjectType } from "../interfaces";
import { getDeepValue, isSubObjectEqual } from "../objects";
import { isEqual } from "../utils";

type Options = { exclude?: boolean };

const defaultOptions: Options = { exclude: false };

const asArray = <T>(
  list: T[],
  determinant: any,
  { exclude }: Options = defaultOptions
) => {
  return list.filter((dt) => {
    const [key, value] = determinant;
    const dt_val = getDeepValue(dt as ObjectType, key);

    const allowed = isEqual(dt_val, value);

    return exclude ? !allowed : allowed;
  });
};

const asFunction = <T>(list: T[], determinant: any) =>
  list.filter((dt) => determinant(dt));

const asObject = <T>(
  list: T[],
  determinant: any,
  { exclude }: Options = defaultOptions
) => {
  return list.filter((dt) => {
    let allowed = isSubObjectEqual(dt as ObjectType, determinant);

    return exclude ? !allowed : allowed;
  });
};

export const filterBy = <T>(
  list: T[],
  determinant: any,
  options: Options = defaultOptions
) => {
  if (!determinant) return list;

  const detType = typeof determinant;

  if (detType === "function") return asFunction(list, determinant);

  if (Array.isArray(determinant)) return asArray(list, determinant, options);

  return asObject(list, determinant, options);
};
