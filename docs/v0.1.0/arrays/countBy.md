# countBy

A function to help you count occurences in an array.

Example:

```js
import { countBy } from "datafx";

countBy([null, "a", null, 1, 2, 1, "a", null, undefined, null]);

// {
//   1: 2,
//   2: 1,
//   a: 2,
//   null: 4,
//   undefined: 1,
// }
```

## By key

```js
import { countBy } from "datafx";

const users = [
  { name: "James", bio: { followers: 300 } },
  { name: "Mary", bio: { followers: 275 } },
  { name: "Bob", bio: { followers: 300 } },
  { name: "James", bio: { followers: 220 } },
  { name: "Doe", bio: { followers: 250 } },
];

countBy(users, "name");
// {
//   Bob: 1,
//   Doe: 1,
//   James: 2,
//   Mary: 1
// }
countBy(users, "bio.followers");
// {
//   220: 1,
//   250: 1,
//   275: 1,
//   300: 2
// }
```

## By Function

This function accepts one of the items in the array to count at a time. Whatever is returned from this function will be used as a key of the returned object.

```js
const counter = (item) => (typeof item === "object" && item ? "object" : item);

countBy(
  [null, "a", null, 1, 2, 1, "a", null, undefined, null, ...users],
  counter
);

// {
//   1: 2,
//   2: 1,
//   a: 2,
//   null: 4,
//   object: 4,
//   undefined: 1,
// }
```
