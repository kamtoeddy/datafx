# groupBy

This function takes the array to categorize as first parameter and a determinant (key or function). It returns an object with the categories as keys and arrays of values under each category

Example:

## By key

```js
import { groupBy } from "datafx";

groupBy(["one", "two", "three"], "length");
// {
//   3: ["one", "two"],
//   5: ["three"],
// };

const users = [
  { name: "James", bio: { followers: 300 } },
  { name: "Mary", bio: { followers: 275 } },
  { name: "Bob", bio: { followers: 300 } },
  { name: "James", bio: { followers: 220 } },
  { name: "Doe", bio: { followers: 250 } },
];

groupBy(users, "bio.followers");
// {
//   220: [{ name: "James", bio: { followers: 220 } }],
//   250: [{ name: "Doe", bio: { followers: 250 } }],
//   275: [{ name: "Mary", bio: { followers: 275 } }],
//   300: [
//     { name: "James", bio: { followers: 300 } },
//     { name: "Bob", bio: { followers: 300 } },
//   ],
// };
```

## By Function

This function accepts one of the items in the array at a time. Whatever is returned from this function will be used as the category under which this item should be placed in.

```js
groupBy([6.1, 4.2, 6.3], Math.floor); // { 4: [4.2], 6: [6.1, 6.3] };
```
