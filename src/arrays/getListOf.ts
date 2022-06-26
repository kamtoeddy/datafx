import { getDeepValue } from "../objects";

type options = { unique?: boolean };

export const getListOf = (
  list: any[],
  key: string,
  { unique }: options = { unique: false }
) => {
  const _list = list.map((dt) => getDeepValue(dt, { key }));

  return unique ? [...new Set(_list)] : _list;
};