import { ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type GetUniqueByOptions = { backwards?: boolean };

const getUnique = (list: any[]) => {
  list = list.map((dt) => {
    try {
      return JSON.stringify(dt);
    } catch (err) {
      return dt;
    }
  });

  list = Array.from(new Set(list));

  list = list.map((dt) => {
    try {
      return JSON.parse(dt);
    } catch (err) {
      return dt;
    }
  });

  return list;
};

export const getUniqueBy = <T>(
  list: T[],
  key?: string,
  { backwards }: GetUniqueByOptions = { backwards: false }
) => {
  if (backwards) list = list.reverse();

  if (!key) return getUnique(list) as T[];

  let obj: ObjectType = {};

  list.forEach((dt) => (obj[getDeepValue(dt as ObjectType, key)] = dt));

  return Object.values(obj) as T[];
};
