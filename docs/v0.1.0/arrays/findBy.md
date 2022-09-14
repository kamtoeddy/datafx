# findBy

A function to help you find an item in an array. It takes in the array as first argument, the second argument is the filter( an array([key, value]), an object or a function ) used to compare the items.

The third argument is an object with property fromBack(boolean) to start the search from the end of the array.

It returns `undefined` if no item if found to match the filter

## By Array

```js
import { findBy } from "datafx";

const users = [
  { name: "Mary", age: 25, bio: { displayName: "mary-jane", followers: 275 } },
  { name: "Bob", age: 31, bio: { displayName: "bobby", followers: 300 } },
  { name: "James", age: 22, bio: { displayName: "james", followers: 220 } },
  { name: "Doe", age: 30, bio: { displayName: "john-doe", followers: 250 } },
  { name: "James", age: 24, bio: { displayName: "james-1", followers: 275 } },
];

findBy(users, ["name", "James"]);
// {
//   name: "James",
//   age: 22,
//   bio: { displayName: "james", followers: 220 },
// };

findBy(users, ["name", "James"], { fromBack: true });
// {
//   name: "James",
//   age: 24,
//   bio: { displayName: "james-1", followers: 275 },
// };

findBy(users, ["bio.followers", 275]);
// {
//   name: "Mary",
//   age: 25,
//   bio: { displayName: "mary-jane", followers: 275 },
// };
```

## By Object

```js
import { findBy } from "datafx";

findBy(users, { age: 22, name: "James" });
// {
//   name: "James",
//   age: 22,
//   bio: { displayName: "james", followers: 220 },
// };

findBy(users, { "bio.followers": 275 });
//  {
//   name: "Mary",
//   age: 25,
//   bio: { displayName: "mary-jane", followers: 275 },
// };

findBy(users, { "bio.followers": 275 }, { fromBack: true });

//  {
//   name: "James",
//   age: 24,
//   bio: { displayName: "james-1", followers: 275 },
// };
```

## By Function

This function accepts 3 arguments(the currentItem, currentIndex and the array) and is expected to return a boolean.

```js
const filter = (user) => user.age === 30;

findBy(users, filter);
// [
//   { name: "Doe", age: 30, bio: { displayName: "john-doe", followers: 250 } },
// ];
```
