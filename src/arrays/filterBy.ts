import { getDeepValue, getSubObject, isEqual } from "../utils";

type options = {
  exclude?: boolean;
};

const asArray = (
  data: any[],
  determinant: any,
  options: options = { exclude: false }
) => {
  const { exclude } = options;

  return data.filter((dt) => {
    const [key, value] = determinant;
    const dt_val = getDeepValue(dt, { key });

    const allowed = isEqual(dt_val, value);

    return exclude ? !allowed : allowed;
  });
};

const asFunction = (
  data: any[],
  determinant: any,
  options: options = { exclude: false }
) => {
  const { exclude } = options;

  return data.filter((dt) => {
    const allowed = determinant(dt);
    return exclude ? !allowed : allowed;
  });
};

const asObject = (
  data: any[],
  determinant: any,
  options: options = { exclude: false }
) => {
  const { exclude } = options;

  return data.filter((dt) => {
    const sub = getSubObject(dt, determinant);

    let allowed = isEqual(determinant, sub);

    return exclude ? !allowed : allowed;
  });
};

export const filterBy = (
  data: any[],
  determinant: any,
  options: options = { exclude: false }
) => {
  const detType = typeof determinant;

  if (detType === "function") return asFunction(data, determinant, options);

  if (Array.isArray(determinant)) return asArray(data, determinant, options);

  if (detType === "object") return asObject(data, determinant, options);

  const { exclude } = options;

  return data.filter((dt) => {
    let allowed = getDeepValue(dt, { key: determinant });
    return exclude ? !allowed : allowed;
  });
};
