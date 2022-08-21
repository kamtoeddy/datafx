import { ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Options = { unique?: boolean };

export const getListOf = <T = any>(
  list: any[],
  key: string,
  { unique }: Options = { unique: false }
): T[] => {
  const _list = list.map((dt) => getDeepValue(dt as ObjectType, key));

  return unique ? Array.from(new Set(_list)) : _list;
};
