# removeDeep

Used to remove a property or nested property of an object.

> Note that it works with the reference of the object

Example:

```js
const user = {
  name: "James",
  age: 20,
  bio: {
    joinDate: "today",
    facebook: { link: "/facebook/james", likes: 1700 },
  },
};

removeDeep(user, "name");
// {
//   age: 20,
//   bio: {
//     joinDate: "today",
//     facebook: { link: "/facebook/james", likes: 1700 },
//   },
// }

removeDeep(user, "bio.facebook.likes");
// {
//   age: 20,
//   bio: {
//     joinDate: "today",
//     facebook: { link: "/facebook/james",  },
//   },
// }
```
