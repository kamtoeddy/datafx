export const getOrdinalPosition = (value: number): number | string => {
  if (value === 1) return "st";

  if (value === 2) return "nd";

  if (value === 3) return "rd";

  if (value === 0 || (value >= 4 && value <= 20)) return "th";

  return getOrdinalPosition(Number(value % 10));
};
