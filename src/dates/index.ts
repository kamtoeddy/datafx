import { unitsAsMs } from "./utils";
import { DateTimeUnit, DateTuple, DateType } from "./units";

export { add, getDateString, isAfter, isBefore };
export { getTimeLeft } from "./getTimeLeft";

const getDateTuple = (args: DateTuple | DateTuple[]) => {
  if (!args.length) return [];

  return Array.isArray(args?.[0])
    ? (args as DateTuple[])
    : ([args] as DateTuple[]);
};

const getMilliseconds = (value: number, unit: DateTimeUnit) => {
  return value * unitsAsMs?.[unit] ?? 0;
};

function getDateString(value = new Date()) {
  return new Date(value).toISOString().substring(0, 10);
}

function add(date: DateType, ...args: DateTuple | DateTuple[]) {
  const _units: DateTuple[] = getDateTuple(args);

  const ms: number = _units.reduce(
    (total: number, [value, unit]: DateTuple) => {
      return (total += getMilliseconds(value, unit));
    },
    0
  );

  return new Date(new Date(date).getTime() + ms);
}

function isAfter(
  date: DateType,
  refDate: DateType,
  ...periodOfTolerance: DateTuple | DateTuple[]
) {
  return (
    new Date(date).getTime() > add(refDate, ...periodOfTolerance).getTime()
  );
}

function isBefore(date: DateType, refDate: DateType) {
  return new Date(date).getTime() < new Date(refDate).getTime();
}
