import { NestedKeyOf, ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type Options = { unique?: boolean };

export const getListOf = <T>(
  array: T[],
  key: NestedKeyOf<T>,
  { unique }: Options = { unique: false }
): T[] => {
  const _array = array.map((dt) => getDeepValue(dt as ObjectType, key));

  return unique ? Array.from(new Set(_array)) : _array;
};
