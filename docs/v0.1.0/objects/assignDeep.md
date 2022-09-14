# assignDeep

Used to assign a value to an object. It takes the target object, the key and the value as only parameters in that order.

> Note that it works with the reference of the object

Example:

```js
const object = {};

assignDeep(object, "name", "James");

console.log(object); // { name: "James" }

const user = { age: 17, name: "Paul" };

console.log(assignDeep(user, "name", "James")); // { age: 17, name: "James" };

const user2 = {};

assignDeep(user2, "bio.facebook.displayName", "james-1");

console.log(user2);
// {
//   bio: {
//     facebook: { displayName: "james-1" },
//   },
// }
```
