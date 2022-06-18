import { looseObjArr, looseObject } from "./interfaces";

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

export const cloneDeep = (data: looseObject) =>
  JSON.parse(JSON.stringify(data));

export const getRandom = ({
  lowerB = 0.0,
  upperB = 100.0,
  dp = 0,
}: {
  lowerB: number;
  upperB: number;
  dp: number;
}) => {
  return Number((Math.random() * (upperB - lowerB) + lowerB).toFixed(dp));
};

const getSubObject = (obj: looseObject, sampleSub: looseObject) => {
  const _obj: looseObject = {};

  Object.keys(sampleSub).forEach(
    (key) => (_obj[key] = getDeepValue(obj, { key }))
  );

  return _obj;
};

export const filter = (
  data: any[],
  determinant: any,
  { exclude }: { exclude: boolean } = { exclude: false }
) => {
  const detType = typeof determinant;

  if (detType === "function")
    return data.filter((dt) => {
      const allowed = determinant(dt);
      return exclude ? !allowed : allowed;
    });

  if (Array.isArray(determinant))
    return data.filter((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt, { key });

      const allowed = isEqual(dt_val, value);

      return exclude ? !allowed : allowed;
    });

  if (detType === "object")
    return data.filter((dt) => {
      const sub = getSubObject(dt, determinant);

      let allowed = isEqual(determinant, sub);

      return exclude ? !allowed : allowed;
    });

  return data.filter((dt) => {
    let allowed = getDeepValue(dt, { key: determinant });
    return exclude ? !allowed : allowed;
  });
};

export const find = (data: looseObjArr = [], determinant: any) => {
  const detType = typeof determinant;

  if (detType === "function") return data.find(determinant);

  if (Array.isArray(determinant))
    return data.find((dt) => {
      const [key, value] = determinant;
      const dt_val = getDeepValue(dt, { key });

      return isEqual(dt_val, value);
    });

  if (detType === "object")
    return data.find((dt) => {
      const sub = getSubObject(dt, determinant);

      return isEqual(determinant, sub);
    });

  return data.find((dt) => getDeepValue(dt, { key: determinant }));
};

export const getDateString = (value = new Date()) =>
  new Date(value).toISOString().substring(0, 10);

export const getList = (data: looseObjArr, { key }: { key: string }) => {
  return [...new Set(data.map((dt) => getDeepValue(dt, { key })))];
};

export const getDeepValue = (data: looseObject, { key }: { key: string }) => {
  return key.split(".").reduce((prev, next) => prev?.[next], data);
};

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

export const setDeepValue = (
  data: looseObject,
  { key, value }: { key: string; value: any }
) => {
  const keys = key.split(".");

  return assignDeep(cloneDeep(data), { keys, value });
};

export const getUnique = ({ data = [], key = "id" }) => {
  const obj = {};

  data.forEach((dt) => (obj[dt[key]] = dt));

  return Object.values(obj);
};

export const groupBy = (data: looseObjArr = [], determinant: any) => {
  if (!data) return [];

  const asFx = typeof determinant === "function";

  return data.reduce((prev, next) => {
    const key = asFx
      ? determinant(next)
      : getDeepValue(next, { key: determinant });

    if (prev.hasOwnProperty(key)) {
      prev[key].push(next);
    } else {
      prev[key] = [next];
    }

    return prev;
  }, {});
};

// export const getPeriod = ({
//   start = new Date(),
//   stop,
//   distance = 1,
//   useDistance = false,
// }) => {
//   let otherTime;

//   if (!start && useDistance) {
//     otherTime = new Date(getDateString(stop || new Date()));
//     start = new Date(otherTime.getTime() - distance * 24 * 60 * 60 * 1000);
//   }

//   if (!stop && useDistance) {
//     otherTime = new Date(getDateString(start));
//     stop = new Date(otherTime.getTime() + distance * 24 * 60 * 60 * 1000);
//   }

//   return {
//     start: new Date(getDateString(start)),
//     stop: new Date(getDateString(stop)),
//   };
// };

export const makeStepArray = (length = 5) =>
  Array.from({ length }, (v, k) => k);

export const removeAt = (list = [], index = 0) => {
  const newList = [...list];
  newList.splice(index, 1);
  return newList;
};

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

export const toBase64 = async (file: File) => {
  return new Promise((reslove, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => reslove(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
