import { isDivisibleBy } from "./isDivisibleBy";
import { getInteger } from "./getInteger";

export const getFactors = (num: number) => {
  const factors: number[] = [];

  for (let i = 1; i <= num; i++)
    if (isDivisibleBy(getInteger(num), i)) factors.push(i);

  return factors;
};
