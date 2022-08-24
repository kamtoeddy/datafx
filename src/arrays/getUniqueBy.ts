import { ObjectType } from "../interfaces";
import { getDeepValue } from "../objects";

type GetUniqueByOptions = { backwards?: boolean };

export const serialize = (dt: any, revert = false) => {
  try {
    return revert ? JSON.parse(dt) : JSON.stringify(dt);
  } catch (err) {
    return dt;
  }
};

export const getUnique = <T>(list: T[]) => {
  let _list = list.map((dt) => serialize(dt));

  _list = Array.from(new Set(_list));

  return _list.map((dt) => serialize(dt, true));
};

export const getUniqueBy = <T>(
  list: T[],
  key?: string,
  { backwards }: GetUniqueByOptions = { backwards: false }
) => {
  let _list = Array.from(list);

  if (backwards) _list = _list.reverse();

  if (!key) return getUnique(_list) as T[];

  let obj: ObjectType = {};

  _list.forEach((dt) => (obj[getDeepValue(dt as ObjectType, key)] = dt));

  return Object.values(obj) as T[];
};
