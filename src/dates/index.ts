import { getMilliseconds } from "./getMilliseconds";
import { DateTimeUnit } from "./units";

export * from "./getTimeLeft";
export * from "./secondsToTime";

export type DateType = Date | string;
type DateTuple = [number, DateTimeUnit];

const getDateTuple = (args: DateTuple | DateTuple[]) => {
  if (!args.length) return [];

  return Array.isArray(args?.[0])
    ? (args as DateTuple[])
    : ([args] as DateTuple[]);
};

export const getDateString = (value = new Date()) =>
  new Date(value).toISOString().substring(0, 10);

export function add(date: DateType, ...args: DateTuple | DateTuple[]) {
  const _units: DateTuple[] = getDateTuple(args);

  const ms: number = _units.reduce(
    (total: number, [value, unit]: DateTuple) => {
      return (total += getMilliseconds(value, unit));
    },
    0
  );

  return new Date(new Date(date).getTime() + ms);
}

export function isAfter(
  date: DateType,
  refDate: DateType,
  ...periodOfTolerance: DateTuple | DateTuple[]
) {
  return (
    new Date(date).getTime() > add(refDate, ...periodOfTolerance).getTime()
  );
}

export function isBefore(date: DateType, refDate: DateType) {
  return new Date(date).getTime() < new Date(refDate).getTime();
}
