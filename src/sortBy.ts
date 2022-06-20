import { getDeepValue } from "./utils";

const asObject = (data: any[], key: string, order?: string) => {
  return data.sort((a, b) => {
    const a_val = getDeepValue(a, { key });
    const b_val = getDeepValue(b, { key });

    let _order = order?.toLowerCase() === "desc" ? 1 : -1;

    return a_val < b_val ? _order : -_order;
  });
};

export const sortBy = (data: any[], determinant?: any, order?: string) => {
  if (!determinant) return data.sort((a, b) => (a < b ? -1 : 1));

  const detType = typeof determinant;

  if (detType === "function") return data.sort(determinant);

  return asObject(data, determinant, order);
};
