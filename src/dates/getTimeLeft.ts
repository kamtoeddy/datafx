import { DateType } from ".";
import { toArray, useIf } from "../utils";
import { composeRatio, unitsAsMs } from "./getMilliseconds";
import { DateTimeUnit } from "./units";

type TypeTimeLeft = { isOver: boolean } & {
  [K in DateTimeUnit]?: number;
};

const isNegative = (v: any) => isNaN(v) || v < 0;

export const getTimeLeft = (
  endDateTime: DateType,
  units: DateTimeUnit | DateTimeUnit[] = [
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ]
) => {
  const totalInMs = useIf(
    0,
    Date.parse(new Date(endDateTime).toUTCString()) -
      Date.parse(new Date().toUTCString()),
    isNegative
  );

  const timeLeft: TypeTimeLeft = { isOver: true };

  const ratio = composeRatio(toArray(units));

  ratio.forEach(([unit, nextCoefficient]) => {
    const value =
      nextCoefficient === undefined
        ? Math.floor(totalInMs / unitsAsMs[unit])
        : Math.floor((totalInMs / unitsAsMs[unit]) % nextCoefficient);

    if (value !== 0) timeLeft.isOver = false;

    timeLeft[unit] = value;
  });

  return timeLeft;
};

const date = new Date("2022-09-12T17:11:05.890Z");

setInterval(() => {
  console.log(getTimeLeft(date, ["H", "m", "s"]));
}, 1000);
