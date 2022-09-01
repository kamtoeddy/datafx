import { ObjectType } from "../interfaces";
import { isEqual, toArray } from "../utils";

export {
  assignDeep,
  cloneDeep,
  getDeepValue,
  getDifference,
  getSubObject,
  hasDeepKey,
  isDeepKeyed,
  removeDeep,
};

// helpers
const getKeys = (key: string | string[]) =>
  Array.isArray(key) ? key : key.split(".");

const hasProp = (obj: ObjectType | undefined = {}, prop = "") =>
  obj?.hasOwnProperty(prop);

// methods
function assignDeep(
  data: ObjectType,
  { key, value }: { key: string | string[]; value: any }
): ObjectType {
  key = getKeys(key);

  const _key = key.shift()!;

  if (!_key) return data;

  if (!key.length) {
    data[_key] = value;

    return data;
  }

  if (!data?.[_key]) data[_key] = {};

  return { ...data, [_key]: assignDeep(data[_key], { key, value }) };
}

function cloneDeep(dt: any) {
  return dt === undefined ? dt : JSON.parse(JSON.stringify(dt));
}

function getDeepValue(data: ObjectType, key: string): any {
  return key.split(".").reduce((prev, next) => prev?.[next], data);
}

function getDifference(a: ObjectType, b: ObjectType) {
  if (isEqual(a, b)) return {};

  const diff: ObjectType = {};

  for (let key in a) {
    if (isEqual(a[key], b[key])) continue;

    diff[key] = a[key];
  }

  return diff;
}

function getSubObject(obj: ObjectType, keys: string | string[] = []) {
  const _obj: ObjectType = {};

  keys = toArray(keys);

  for (const key of keys)
    assignDeep(_obj, { key, value: getDeepValue(obj, key) });

  return _obj;
}

function hasDeepKey(obj: ObjectType, key: string | string[]): boolean {
  key = getKeys(key);

  const _key = key.shift();

  if (!_key || !obj) return false;

  const keyFound = hasProp(obj, _key);

  if (!keyFound && key.length) return false;

  if (keyFound && !key.length) return true;

  return hasDeepKey(obj?.[_key], key);
}

function isDeepKeyed(obj: ObjectType) {
  return Object.keys(obj).some((key) => key.split(".").length > 1);
}

export const isSubObjectEqual = (dt: ObjectType, expected: ObjectType) => {
  const keys = Object.keys(expected);

  const sub = getSubObject(dt as ObjectType, keys);

  if (!isDeepKeyed(expected)) return isEqual(sub, expected);

  const determinantObject = {};

  keys.forEach((key) =>
    assignDeep(determinantObject, { key, value: expected[key] })
  );

  return isEqual(sub, determinantObject);
};

function removeDeep(obj: ObjectType, key: string | string[]): ObjectType {
  key = getKeys(key);

  const _key = key.shift()!;

  if (!_key) return obj;

  if (!key.length) {
    delete obj?.[_key];
    return obj;
  }

  return { ...obj, [_key]: removeDeep(obj[_key], key) };
}
