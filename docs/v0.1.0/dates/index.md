## Supported Units

| name        | relative value | units                         |
| ----------- | -------------- | ----------------------------- |
| millisecond | 1              | ms, millisecond, milliseconds |
| second      | 1000ms         | s, second, seconds            |
| minute      | 60s            | m, minute, minutes            |
| hour        | 60m            | h, H, hour, hours             |
| day         | 24h            | d, D, day, days               |
| week        | 7d             | w, W, week, weeks             |
| month       | 30d            | mo, M, month, months          |
| year        | 365.25d        | y, Y, year, years             |

## add

Adds a time period to a date

```js
import { dates } from "datafx";

const { add } = dates;

add(new Date(), 5, "m");
add(new Date(), [23, "h"], [5, "m"]);
```

## isAfter

Tells whether a date comes after another. It also takes a tolerance period as third and optional argument

```js
import { dates } from "datafx";

const { isAfter } = dates;

console.log(isAfter("06-07-2021", "05-07-2020")); // true
console.log(isAfter("06-07-2021", "07-07-2021")); // false

console.log(isAfter("07-08-2021", "07-07-2021")); // true
console.log(isAfter("12-08-2021", "12-07-2021", 23, "m")); // true
console.log(isAfter("12-08-2021", "12-07-2021", 24, "m")); // true
console.log(isAfter("12-08-2021", "12-07-2021", 23, "h")); // true
console.log(isAfter("12-08-2021", "12-07-2021", [23, "h"], [5, "m"])); // true
console.log(isAfter("12-08-2021", "12-07-2021", [23, "h"], [60, "m"])); // false
```

## isBefore

Tells whether a date comes before another.

```js
import { dates } from "datafx";

const { isBefore } = dates;

console.log(isBefore("06-07-2000", "06-07-2020")); // true
console.log(isBefore("05-07-2021", "05-07-2020")); // false
console.log(isBefore("05-08-2020", "05-07-2020")); // false
console.log(isBefore("05-07-2020", "05-07-1934")); // false
```
