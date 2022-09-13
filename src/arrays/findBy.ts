import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue, isSubObjectEqual } from "../objects";
import { isEqual } from "../utils";

type Finder<T> = (item: T, index: number, array: T[]) => boolean;
type FindAsObject<T> = Partial<{ [K in NestedKeyOf<T>]: any }>;
type Options = { fromBack?: boolean };

export const findBy = <T>(
  array: T[],
  determinant: Finder<T> | FindAsObject<T> | [NestedKeyOf<T>, any],
  { fromBack }: Options = { fromBack: false }
) => {
  const detType = typeof determinant;

  let _array = [...array];
  if (fromBack) _array = _array.reverse();

  if (detType === "function") return _array.find(determinant as Finder<T>);

  if (Array.isArray(determinant))
    return _array.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt as ObjectType, key);

      return isEqual(dt_val, value);
    });

  return _array.find((dt) => isSubObjectEqual(dt as ObjectType, determinant));
};
