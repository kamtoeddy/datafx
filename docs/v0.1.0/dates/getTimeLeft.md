### getTimeLeft

It returns the time left between the the date provided and today in the [supported time units](./index.md#supported-units) provided together with `isOver`; a boolean which tells whether all units returned have zero as value

```js
import { dates } from "datafx";

const { getTimeLeft } = dates;

const timeLeft = getTimeLeft("2500-01-01", ["Y", "M", "D", "H"]);

console.log(timeLeft);
// {
//   isOver: boolean;
//   Y: number;
//   M: number;
//   D: number;
//   H: number;
// };
```
