import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue, isSubObjectEqual } from "../objects";
import { isEqual } from "../utils";

type Filter<T> = (item: T, index: number, array: T[]) => boolean;
type FilterAsObject<T> = Partial<{ [K in NestedKeyOf<T>]: any }>;
type Options = { exclude?: boolean };

const defaultOptions: Options = { exclude: false };

const asArray = <T>(
  array: T[],
  determinant: any,
  { exclude }: Options = defaultOptions
) => {
  return array.filter((dt) => {
    const [key, value] = determinant;
    const dt_val = getDeepValue(dt as ObjectType, key);

    const allowed = isEqual(dt_val, value);

    return exclude ? !allowed : allowed;
  });
};

const asFunction = <T>(array: T[], determinant: any) =>
  array.filter((dt) => determinant(dt));

const asObject = <T>(
  array: T[],
  determinant: any,
  { exclude }: Options = defaultOptions
) => {
  return array.filter((dt) => {
    let allowed = isSubObjectEqual(dt as ObjectType, determinant);

    return exclude ? !allowed : allowed;
  });
};

export const filterBy = <T>(
  array: T[],
  determinant: Filter<T> | FilterAsObject<T> | [NestedKeyOf<T>, any],
  options: Options = defaultOptions
) => {
  if (!determinant) return array;

  const detType = typeof determinant;

  if (detType === "function") return asFunction(array, determinant);

  if (Array.isArray(determinant)) return asArray(array, determinant, options);

  return asObject(array, determinant, options);
};
