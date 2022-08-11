import { DateType } from ".";
import { useIf } from "../utils";

const isNegative = (v: any) => isNaN(v) || v < 0;

export const getTimeLeft = (endDateTime: DateType) => {
  const total =
    Date.parse(new Date(endDateTime).toUTCString()) -
    Date.parse(new Date().toUTCString());

  const seconds = useIf(0, Math.floor((total / 1000) % 60), isNegative);
  const minutes = useIf(0, Math.floor((total / (1000 * 60)) % 60), isNegative);
  const hours = useIf(
    0,
    Math.floor((total / (1000 * 60 * 60)) % 24),
    isNegative
  );
  const days = useIf(0, Math.floor(total / (1000 * 60 * 60 * 24)), isNegative);

  const isOver = [days, hours, minutes, seconds].every((v) => v === 0);

  return { isOver, days, hours, minutes, seconds };
};
