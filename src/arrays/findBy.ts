import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue, isSubObjectEqual } from "../objects";
import { isEqual } from "../utils";

type Finder<T> = (item: T, index: number, list: T[]) => boolean;
type FindAsObject<T> = Partial<{ [K in NestedKeyOf<T>]: any }>;
type Options = { fromBack?: boolean };

export const findBy = <T>(
  list: T[],
  determinant: Finder<T> | FindAsObject<T> | [NestedKeyOf<T>, any],
  { fromBack }: Options = { fromBack: false }
) => {
  const detType = typeof determinant;

  let _list = [...list];
  if (fromBack) _list = _list.reverse();

  if (detType === "function") return _list.find(determinant as Finder<T>);

  if (Array.isArray(determinant))
    return _list.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt as ObjectType, key);

      return isEqual(dt_val, value);
    });

  return _list.find((dt) => isSubObjectEqual(dt as ObjectType, determinant));
};
