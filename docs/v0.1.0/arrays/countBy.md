# sortBy

A function to help you sort an array. It takes in the array to sort as first parapemter, the deteminant (a function or string) used to compare the items of the array and the sort order as third argument. The second and third arguments optional.

Example:

```js
import { sortBy } from "datafx";

sortBy([11, 4, 6, 3, 7]); // [3, 4, 6, 7, 11]
sortBy([11, 4, 6, 3, 7], undefined, "asc"); // [3, 4, 6, 7, 11]
sortBy([11, 4, 6, 3, 7], undefined, "desc"); // [11, 7, 6, 4, 3]
```

## By key

```js
import { sortBy } from "datafx";

const users = [
  { name: "Mary", bio: { followers: 275 } },
  { name: "Bob", bio: { followers: 300 } },
  { name: "James", bio: { followers: 220 } },
  { name: "Doe", bio: { followers: 250 } },
];

sortBy(users, "name");
// [
//   { name: "Bob", bio: { followers: 300 } },
//   { name: "Doe", bio: { followers: 250 } },
//   { name: "James", bio: { followers: 220 } },
//   { name: "Mary", bio: { followers: 275 } },
// ];
sortBy(users, "bio.followers", "desc");
// [
//   { name: "James", bio: { followers: 220 } },
//   { name: "Doe", bio: { followers: 250 } },
//   { name: "Mary", bio: { followers: 275 } },
//   { name: "Bob", bio: { followers: 300 } },
// ];
```

## By Function

This function accepts two arguments and is expected to return `-1` and `1` for ascending & descending orders respectively. With this determinant, the sort order(third argument) is ignored

```js
function sorter(a, b) {
  return a.followers < b.followers ? -1 : 1;
}

sortBy(users, sorter);
// [
//   { name: "Bob", bio: { followers: 300 } },
//   { name: "Doe", bio: { followers: 250 } },
//   { name: "James", bio: { followers: 220 } },
//   { name: "Mary", bio: { followers: 275 } },
// ];
```
