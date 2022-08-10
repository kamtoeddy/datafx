import {
  getOrdinalPosition,
  isDivisibleBy,
  isEven,
  isPrime,
  getInteger,
} from "../numbers";

describe("Ordinal Position", () => {
  it("should return the ordinal position of any number", () => {
    // truthy
    const nums: [number, string][] = [
      [1, "st"],
      [2, "nd"],
      [3, "rd"],
      [11, "th"],
      [12, "th"],
      [13, "th"],
      [21, "st"],
      [22, "nd"],
      [23, "rd"],
    ];

    for (const [num, position] of nums)
      expect(getOrdinalPosition(num)).toBe(position);

    // falsy
    expect(getOrdinalPosition(NaN)).toBe("");
    expect(getOrdinalPosition(parseInt("hahaha"))).toBe("");
  });
});

describe("isEven", () => {
  it("should tell if a number is even", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(1)).toBe(false);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(4)).toBe(true);
    expect(isEven(4.4)).toBe(false);
  });
});

describe("isDivisibleBy", () => {
  it("should tell if a number is fully divisible by another", () => {
    expect(isDivisibleBy(4, 2)).toBe(true);
    expect(isDivisibleBy(5, 2)).toBe(false);
  });
});

describe("isPrime", () => {
  it("should tell if a number is prime", () => {
    const primes = [2, 3, 5, 7, 11, 13, 23];

    for (let num of primes) expect(isPrime(num)).toBe(true);

    const notPrimes = [4, 6, 8, 10, 12, 14, 24];
    for (let num of notPrimes) expect(isPrime(num)).toBe(false);
  });
});

describe("getInteger", () => {
  it("should return integer portion of a number", () => {
    const nums = [
      [0.1, 0],
      [0.99, 0],
      [1, 1],
      [20.99, 20],
    ];

    for (let [num, int] of nums) expect(getInteger(num)).toBe(int);
  });
});
