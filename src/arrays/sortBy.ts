import { ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type DeterminantFunction<T> = (a: T, b: T) => -1 | 1;
type SortOrder = "asc" | "desc";

const getSortOrder = (order: SortOrder) =>
  order.toLowerCase() === "asc" ? -1 : 1;

const asObject = <T>(list: T[], key: string, order: SortOrder = "asc") => {
  return list.sort((a, b) => {
    const a_val = getDeepValue(a as ObjectType, key);
    const b_val = getDeepValue(b as ObjectType, key);

    let _order = getSortOrder(order);

    return a_val < b_val ? _order : -_order;
  });
};

const defaultSort = <T>(list: T[], order: SortOrder = "asc") => {
  const _order = getSortOrder(order);
  return list.sort((a, b) => (a < b ? _order : -_order));
};

export const sortBy = <T>(
  list: T[],
  determinant?: DeterminantFunction<T> | string | null,
  order: SortOrder = "asc"
) => {
  if (!determinant) return defaultSort(list, order);

  const detType = typeof determinant;

  if (detType === "function")
    return list.sort(determinant as DeterminantFunction<T>);

  return asObject(list, determinant as string, order) as T[];
};
