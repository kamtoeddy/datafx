import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Options = { unique?: boolean };

export const getListOf = <T, K extends any>(
  array: T[],
  key: NestedKeyOf<T>,
  { unique }: Options = { unique: false }
): K[] => {
  const _array = array.map((dt) => getDeepValue(dt as ObjectType, key));

  return unique ? Array.from(new Set(_array)) : _array;
};
