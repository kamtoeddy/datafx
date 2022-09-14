# filterBy

A function to help you filter an array. It takes in the array to filter as first argument, the second argument is the filter( an array([key, value]), an object or a function ) used to compare the items.

The third argument is an object with property exclude(boolean) which will be used to exclude the values retained by the non-functional filter(array or object only) provided.

## By Array

```js
import { filterBy } from "datafx";

const users = [
  { name: "Mary", age: 25, bio: { displayName: "mary-jane", followers: 275 } },
  { name: "Bob", age: 31, bio: { displayName: "bobby", followers: 300 } },
  { name: "James", age: 22, bio: { displayName: "james", followers: 220 } },
  { name: "Doe", age: 30, bio: { displayName: "john-doe", followers: 250 } },
  { name: "James", age: 24, bio: { displayName: "james-1", followers: 275 } },
];

filterBy(users, ["name", "James"]);
// [
//   { name: "James",age:22, bio: {displayName:"james", followers: 220 } },
//   { name: "James",age:24, bio: {displayName:"james-1", followers: 275 } },
// ];

filterBy(users, ["bio.followers", 275]);
// [
//   { name: "Mary",age:25, bio: {displayName:"mary-jane", followers: 275 } },
//   { name: "James",age:24, bio: {displayName:"james-1", followers: 275 } },
// ];
```

## By Object

```js
import { filterBy } from "datafx";

filterBy(users, { age: 22, name: "James" });
//  [
//   { name: "James", age: 22, bio: { displayName: "james", followers: 220 } },
// ];

filterBy(users, { "bio.followers": 275 });
// [
//   { name: "Mary", age: 25, bio: { displayName: "mary-jane", followers: 275 } },
//   { name: "James", age: 24, bio: { displayName: "james-1", followers: 275 } },
// ];
```

## By Function

This function accepts 3 arguments(the currentItem, currentIndex and the array) and is expected to return a boolean. With this filter, the exclude option is ignored.

```js
const filter = (user) => user.age >= 30;

filterBy(users, filter);
// [
//   { name: "Bob", age: 31, bio: { displayName: "bobby", followers: 300 } },
//   { name: "Doe", age: 30, bio: { displayName: "john-doe", followers: 250 } },
// ];
```
