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
  millisecond: ms,
  milliseconds: ms,
  s,
  second: s,
  seconds: s,
  m,
  minute: m,
  minutes: m,
  h,
  H: h,
  hour: h,
  hours: h,
  d,
  D: d,
  day: d,
  days: d,
  w,
  week: w,
  weeks: w,
  W: w,
  mo,
  M: mo,
  month: mo,
  months: mo,
  y,
  Y: y,
  year: y,
  years: y,
};

export const getMilliseconds = (value: number, unit: DateTimeUnit) => {
  return value * unitsAsMs?.[unit] ?? 0;
};
