import { getMilliseconds } from "./getMilliseconds";
import { DateTimeUnit } from "./units";

export * from "./getTimeLeft";
export * from "./secondsToTime";

export type DateType = Date | string;

export const getDateString = (value = new Date()) =>
  new Date(value).toISOString().substring(0, 10);

export function add(date: DateType, value: number, unit: DateTimeUnit) {
  return new Date(new Date(date).getTime() + getMilliseconds(value, unit));
}

export function isAfter(
  date: DateType,
  refDate: DateType,
  minsOfTolerance = 0
) {
  return (
    new Date(date).getTime() > add(refDate, minsOfTolerance, "m").getTime()
  );
}

export function isBefore(date: DateType, refDate: DateType) {
  return new Date(date).getTime() < new Date(refDate).getTime();
}
