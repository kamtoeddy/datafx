import { looseObject } from "../interfaces";
import { getDeepValue } from "../utils";

type options = {
  backwards?: boolean;
};

const getUnique = (data: any[]) => {
  data = data.map((dt) => {
    try {
      return JSON.stringify(dt);
    } catch (err) {
      return dt;
    }
  });

  data = [...new Set(data)];

  data = data.map((dt) => {
    try {
      return JSON.parse(dt);
    } catch (err) {
      return dt;
    }
  });

  return data;
};

export const getUniqueBy = (
  data: any[],
  key?: string,
  { backwards }: options = { backwards: false }
) => {
  if (backwards) data = data.reverse();

  if (!key) return getUnique(data);

  let obj: looseObject = {};

  data.forEach((dt) => (obj[getDeepValue(dt, { key })] = dt));

  return Object.values(obj);
};
