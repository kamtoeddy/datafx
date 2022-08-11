import { DateTimeUnit } from "./units";

const ms = 1,
  s = 1000 * ms,
  m = 60 * s,
  h = 60 * m,
  d = 24 * h,
  w = 7 * d,
  mo = 30 * d,
  y = 365.25 * d;

const unitsAsMs: Record<DateTimeUnit, number> = {
  ms,
  s,
  m,
  h,
  H: h,
  d,
  D: d,
  w,
  W: w,
  mo,
  M: m,
  y,
  Y: y,
};

export const getMilliseconds = (value: number, unit: DateTimeUnit) => {
  return value * unitsAsMs?.[unit] ?? 0;
};
