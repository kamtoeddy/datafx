import { isDivisibleBy } from "./isDivisibleBy";
import { toInteger } from "./toInteger";

export const getFactors = (num: number) => {
  const factors: number[] = [];

  for (let i = 1; i <= num; i++)
    if (isDivisibleBy(toInteger(num), i)) factors.push(i);

  return factors;
};
