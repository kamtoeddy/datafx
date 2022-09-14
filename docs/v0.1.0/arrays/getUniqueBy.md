# getUniqueBy

Used to get an array of unique values. It takes an array and a key or nested key(string) as first and second parameters respectively. The key is optional

It also takes an object as third parameter(optional). This object has a property; `fromBack` (boolean). If fromBack is true, the array will be processed starting with the last item. By default fromBack is `false`

Example:

```js
import { getUniqueBy } from "datafx";

const array = [
  11,
  1,
  { name: "James" },
  { name: "Mary" },
  2,
  { name: "James" },
  1,
];

getUniqueBy(array);
// [11, 1, { name: "James" }, { name: "Mary" }, 2, { name: "James" }, 1];

getUniqueBy(array, undefined, { fromBack: true });
// [11, 1, { name: "James" }, { name: "Mary" }, 2, { name: "James" }];

const users = [
  { name: "James", bio: { followers: 300 } },
  { name: "Mary", bio: { followers: 275 } },
  { name: "Bob", bio: { followers: 300 } },
  { name: "James", bio: { followers: 220 } },
  { name: "Doe", bio: { followers: 250 } },
];

getUniqueBy(users, "bio.followers");
// [
//   { name: "James", bio: { followers: 300 } },
//   { name: "Mary", bio: { followers: 275 } },
//   { name: "James", bio: { followers: 220 } },
//   { name: "Doe", bio: { followers: 250 } },
// ];
```
