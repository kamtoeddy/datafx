import { useIfFalsy } from "../utils";

const isNegative = (v: any) => isNaN(v) || v < 0;

export const getTimeLeft = (endTime: string) => {
  const total = Date.parse(endTime) - Date.parse(new Date().toUTCString());
  const seconds = useIfFalsy(0, Math.floor((total / 1000) % 60), isNegative);
  const minutes = useIfFalsy(
    0,
    Math.floor((total / 1000 / 60) % 60),
    isNegative
  );
  const hours = useIfFalsy(
    0,
    Math.floor((total / (1000 * 60 * 60)) % 24),
    isNegative
  );
  const days = useIfFalsy(
    0,
    Math.floor(total / (1000 * 60 * 60 * 24)),
    isNegative
  );

  return { days, hours, minutes, seconds };
};
