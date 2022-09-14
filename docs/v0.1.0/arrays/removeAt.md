# removeAt

Use to remove one or more items from an array. It takes 3 arguments; the array, the startIndex and the delete count in that order respectively. The default start index is 0 and the default delete count is 1.

Example:

```js
import { removeAt } from "datafx";

const array = [1, 2, 3, 4, 5, -45];

removeAt(array); // [2, 3, 4, 5, -45]
removeAt(array, 1, 4); // [1, -45]
```
