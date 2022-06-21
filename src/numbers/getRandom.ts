export const getRandom = (
  {
    lowerB = 0.0,
    upperB = 100.0,
    dp = 0,
  }: {
    lowerB?: number;
    upperB?: number;
    dp?: number;
  } = {
    lowerB: 0.0,
    upperB: 100.0,
    dp: 0,
  }
) => {
  return Number((Math.random() * (upperB - lowerB) + lowerB).toFixed(dp));
};
