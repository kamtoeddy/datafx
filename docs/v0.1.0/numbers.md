## isDivisibleBy

Tells whether a number is divisible by another

```js
import { isDivisibleBy } from "datafx";

console.log(isDivisibleBy(3, 1)); // true
console.log(isDivisibleBy(11, 11)); // true
console.log(isDivisibleBy(0, 0)); // false
console.log(isDivisibleBy(10, 0)); // false
console.log(isDivisibleBy(4, 3)); // false
console.log(isDivisibleBy(4.4, 2)); // false
```

## isEven

Tells is a number is even

```js
import { isEven } from "datafx";

console.log(isEven(3)); // false
console.log(isEven(4)); // true
console.log(isEven(4.4)); // false
```

## isPrime

Tells if a number is prime or not

```js
import { isPrime } from "datafx";

console.log(isPrime(3)); // true
console.log(isPrime(4)); // fasle
console.log(isPrime(4.4)); // false
console.log(isPrime(7)); // true
```

## getFactors

Gives the factors of a number

```js
import { getFactors } from "datafx";

console.log(getFactors(3)); // [1, 3]
console.log(getFactors(4)); // [1, 2, 4]
console.log(getFactors(10)); // [1, 2, 5, 10]
```

## getOrdinalPosition

```js
import { getOrdinalPosition } from "datafx";

console.log(getOrdinalPosition(0)); // th
console.log(getOrdinalPosition(1)); // st
console.log(getOrdinalPosition(2)); // nd
console.log(getOrdinalPosition(3)); // rd
console.log(getOrdinalPosition(4)); // th
console.log(getOrdinalPosition(10)); // th
console.log(getOrdinalPosition(21)); // st
console.log(getOrdinalPosition(32)); // nd
```

## getRandom

Gives a random number within a range. It also takes as third argument the number of decimal places to consider

```js
import { getRandom } from "datafx";

console.log(getRandom(0, 10)); // 8
console.log(getRandom(0, 10, 1)); // 8.5
```
