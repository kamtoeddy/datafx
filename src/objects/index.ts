import { looseObject } from "../interfaces";
import { cloneDeep } from "../utils";

export * from "./getDifference";

export const assignDeep = (
  data: looseObject,
  { keys, value }: { keys: string[]; value: any }
): looseObject => {
  const key = keys.shift();

  if (!key) return data;

  if (!keys.length) {
    data[key] = value;

    return data;
  }

  return { ...data, [key]: assignDeep(data[key], { keys, value }) };
};

export const getDeepValue = (
  data: looseObject,
  { key }: { key: string }
): any => {
  return key.split(".").reduce((prev, next) => prev?.[next], data);
};

export const getSubObject = (obj: looseObject, sampleSub: looseObject) => {
  const _obj: looseObject = {},
    keys = Object.keys(sampleSub);

  keys.forEach((key) => (_obj[key] = getDeepValue(obj, { key })));

  return _obj;
};

const _removeDeep = (data: looseObject, keys: string[]): looseObject => {
  const key = keys.shift();

  if (!key) return data;

  if (!keys.length) {
    delete data[key];
    return data;
  }

  return { ...data, [key]: _removeDeep(data[key], keys) };
};

export const removeDeep = (data: looseObject, key: string) => {
  return _removeDeep(data, key.split("."));
};

export const setDeepValue = (
  data: looseObject,
  { key, value }: { key: string; value: any }
) => {
  const keys = key.split(".");

  return assignDeep(cloneDeep(data), { keys, value });
};
