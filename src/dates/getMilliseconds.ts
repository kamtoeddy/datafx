import { DateTimeUnit } from "./units";

const ms = 1,
  s = 1000 * ms,
  m = 60 * s,
  h = 60 * m,
  d = 24 * h,
  w = 7 * d,
  mo = 30 * d,
  y = 365.25 * d;

export const unitsAsMs: Record<DateTimeUnit, number> = {
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

/**
 *
 * @param a bigger unit
 * @param b smaller unit
 * @returns how many times `a` is bigger that `b`
 */
function getRatio(a: DateTimeUnit, b: DateTimeUnit) {
  return Math.floor(unitsAsMs[a] / unitsAsMs[b]);
}

export function composeRatio(
  units: DateTimeUnit[]
): [DateTimeUnit, number | undefined][] {
  const sorted = sortUnits(units),
    lastIndex = sorted.length - 1;

  return sorted.map((unit, i) => {
    return i === lastIndex
      ? [unit, undefined]
      : [unit, getRatio(sorted[i + 1], unit)];
  });
}

/**
 *
 * @param a datetime unit to compare
 * @param b datetime unit to compare
 * @returns if `a` has a greater coefficient(in ms) than `b`
 */
function isUnitGreater(a: DateTimeUnit, b: DateTimeUnit) {
  return unitsAsMs[a] > unitsAsMs[b];
}

function sortUnits(units: DateTimeUnit[]) {
  return [...units].sort((a, b) => (isUnitGreater(a, b) ? 1 : -1));
}
