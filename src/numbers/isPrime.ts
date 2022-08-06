import { getFactors } from "./getFactors";

export const isPrime = (num: number) =>
  num < 2 ? false : getFactors(num).length === 2;
