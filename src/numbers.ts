export {
  getInteger,
  isDivisibleBy,
  isEven,
  isPrime,
  getFactors,
  getOrdinalPosition,
  getRandom
}

const getInteger = (num: number) => parseInt(`${num}`)

const isDivisibleBy = (dividend: number, divisor: number) =>
  dividend % divisor === 0

const isEven = (num: number) => num % 2 === 0

const isPrime = (num: number) =>
  num < 2 ? false : getFactors(num).length === 2

const getFactors = (num: number) => {
  const factors: number[] = []

  for (let i = 1; i <= num; i++)
    if (isDivisibleBy(getInteger(num), i)) factors.push(i)

  return factors
}

const getOrdinalPosition = (value: number): number | string => {
  if (isNaN(value)) return ''

  if (value === 1) return 'st'

  if (value === 2) return 'nd'

  if (value === 3) return 'rd'

  if (value === 0 || (value >= 4 && value <= 20)) return 'th'

  return getOrdinalPosition(parseInt(`${value % 10}`))
}

const getRandom = (lowerB = 0.0, upperB = 100.0, dp = 0) => {
  return Number((Math.random() * (upperB - lowerB) + lowerB).toFixed(dp))
}
