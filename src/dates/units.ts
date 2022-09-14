export type Year = "y" | "Y" | "year" | "years";
export type Month = "mo" | "M" | "month" | "months";
export type Week = "w" | "W" | "week" | "weeks";
export type Day = "d" | "D" | "day" | "days";
export type Hour = "h" | "H" | "hour" | "hours";
export type Minute = "m" | "minute" | "minutes";
export type Second = "s" | "second" | "seconds";
export type Millisecond = "ms" | "millisecond" | "milliseconds";

export type DateTimeUnit =
  | Year
  | Month
  | Week
  | Day
  | Hour
  | Minute
  | Second
  | Millisecond;

export type DateType = Date | string;

export type DateTuple = [number, DateTimeUnit];
