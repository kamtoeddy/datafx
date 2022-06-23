import { getDeepValue, getSubObject } from "../objects";
import { isEqual } from "../utils";

type options = { exclude?: boolean };

type Fx = (list: any[], determinant: any, options?: options) => any[];

const asArray: Fx = (list, determinant, options = { exclude: false }) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const [key, value] = determinant;
    const dt_val = getDeepValue(dt, { key });

    const allowed = isEqual(dt_val, value);

    return exclude ? !allowed : allowed;
  });
};

const asFunction: Fx = (list, determinant, options = { exclude: false }) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const allowed = determinant(dt);
    return exclude ? !allowed : allowed;
  });
};

const asObject: Fx = (list, determinant, options = { exclude: false }) => {
  const { exclude } = options;

  return list.filter((dt) => {
    const sub = getSubObject(dt, determinant);

    let allowed = isEqual(determinant, sub);

    return exclude ? !allowed : allowed;
  });
};

export const filterBy: Fx = (
  list,
  determinant,
  options = { exclude: false }
) => {
  const detType = typeof determinant;

  if (detType === "function") return asFunction(list, determinant, options);

  if (Array.isArray(determinant)) return asArray(list, determinant, options);

  if (detType === "object") return asObject(list, determinant, options);

  const { exclude } = options;

  return list.filter((dt) => {
    let allowed = getDeepValue(dt, { key: determinant });
    return exclude ? !allowed : allowed;
  });
};
