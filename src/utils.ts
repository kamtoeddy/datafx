import { looseObjArr, looseObject } from "./interfaces";

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

const capitaliseOne = (word = "") => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalise = (value: string) => {
  if (typeof value !== "string") return value;

  value = value.trim();
  if (value === "") return value;

  let _capitalised = "";

  value.split(" ").forEach((word, index) => {
    if (index !== 0) _capitalised += " ";
    _capitalised += capitaliseOne(word);
  });

  return _capitalised;
};

export const cloneDeep = (data: any) => JSON.parse(JSON.stringify(data));

export const getRandom = (
  {
    lowerB = 0.0,
    upperB = 100.0,
    dp = 0,
  }: {
    lowerB?: number;
    upperB?: number;
    dp?: number;
  } = {
    lowerB: 0.0,
    upperB: 100.0,
    dp: 0,
  }
) => {
  return Number((Math.random() * (upperB - lowerB) + lowerB).toFixed(dp));
};

export const getDateString = (value = new Date()) =>
  new Date(value).toISOString().substring(0, 10);

export const getDeepValue = (
  data: looseObject,
  { key }: { key: string }
): any => {
  return key.split(".").reduce((prev, next) => prev?.[next], data);
};

export const getList = (data: looseObjArr, { key }: { key: string }) => {
  return [...new Set(data.map((dt) => getDeepValue(dt, { key })))];
};

export const getSubObject = (obj: looseObject, sampleSub: looseObject) => {
  const _obj: looseObject = {};

  Object.keys(sampleSub).forEach(
    (key) => (_obj[key] = getDeepValue(obj, { key }))
  );

  return _obj;
};

export function isEqual(a: any, b: any) {
  const typeOf_a = typeof a;
  const typeOf_b = typeof b;

  if (typeOf_a !== typeOf_b) return false;

  if (typeOf_a === "undefined") return true;

  let ref_a = a;
  let ref_b = b;

  if (!["bigint", "boolean", "number", "string", "symbol"].includes(typeOf_a)) {
    ref_a = JSON.stringify(ref_a);
    ref_b = JSON.stringify(ref_b);
  }

  return ref_a === ref_b;
}

export function secondsToTime(timeInSecs: number) {
  const days = Math.floor(timeInSecs / (60 * 60 * 24));

  timeInSecs -= days * (60 * 60 * 24);

  const hours = Math.floor(timeInSecs / (60 * 60));

  timeInSecs -= hours * (60 * 60);

  const minutes = Math.floor(timeInSecs / 60);

  timeInSecs -= minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds: Math.floor(timeInSecs),
  };
}

export const setDeepValue = (
  data: looseObject,
  { key, value }: { key: string; value: any }
) => {
  const keys = key.split(".");

  return assignDeep(cloneDeep(data), { keys, value });
};

export function setPadStart(str: string | number, num = 2, symbol = "0") {
  return String(str).padStart(num, symbol);
}

export function prettyTime(ms: number) {
  const { days, hours, minutes } = secondsToTime(ms);

  let result = "";

  if (days) result = `${setPadStart(days)}j`;
  if (hours) result = `${result} ${setPadStart(hours)}h`;
  if (minutes) result = `${result} ${setPadStart(minutes)}m`;

  return result.trim() || "00m";
}

export const removeAt = (list = [], index = 0) => {
  const newList = [...list];
  newList.splice(index, 1);
  return newList;
};

export const _removeDeep = (data: looseObject, keys: string[]): looseObject => {
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
