import { getDeepValue } from "../objects";

const asObject = (list: any[], key: string, order?: string) => {
  return list.sort((a, b) => {
    const a_val = getDeepValue(a, key);
    const b_val = getDeepValue(b, key);

    let _order = order?.toLowerCase() === "desc" ? 1 : -1;

    return a_val < b_val ? _order : -_order;
  });
};

export const sortBy = <T>(list: T[], determinant?: any, order?: string) => {
  if (!determinant) return list.sort((a, b) => (a < b ? -1 : 1)) as T[];

  const detType = typeof determinant;

  if (detType === "function") return list.sort(determinant) as T[];

  return asObject(list, determinant, order) as T[];
};
