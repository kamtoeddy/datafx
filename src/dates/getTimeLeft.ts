import { DateType } from ".";
import { toArray, useIf } from "../utils";
import { composeRatio, unitsAsMs } from "./utils";
import { DateTimeUnit } from "./units";

type TypeTimeLeft = { isOver: boolean } & {
  [K in DateTimeUnit]?: number;
};

const isNegative = (v: any) => isNaN(v) || v < 0;

export const getTimeLeft = (
  endDateTime: DateType,
  units: DateTimeUnit | DateTimeUnit[]
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
