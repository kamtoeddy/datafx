# getDeepValue

Used to get the value of a property or nested property of an object.

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

getDeepValue(user, "name"); // "James"
getDeepValue(user, "bio.facebook.likes"); // 1700
```
