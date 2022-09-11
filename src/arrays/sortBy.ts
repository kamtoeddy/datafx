import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Sorter<T> = (a: T, b: T) => -1 | 1;
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
  determinant?: Sorter<T> | NestedKeyOf<T>,
  order: SortOrder = "asc"
) => {
  const _list = Array.from(list);
  if (!determinant) return defaultSort(_list, order);

  const detType = typeof determinant;

  if (detType === "function") return _list.sort(determinant as Sorter<T>);

  return asObject(_list, determinant as string, order) as T[];
};
