# clone

Used to make a copy by value of any data structure.

Example:

```js
import { clone } from "datafx";

const object = { name: "James" };

const object1 = clone(object); // { name: "James" }

console.log(object === object1); // false
```
