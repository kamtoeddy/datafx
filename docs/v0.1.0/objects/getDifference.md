# getDifference

Used to get the difference between two objects. It is read as: **How is `a` different from `b`?**

Example:

```js
const a = { name: "Joe" },
  b = { name: "Jo", age: 12 },
  c = { name: "Jo", age: 13 };

getDifference(a, a); // {}
getDifference(a, b); // { name: "Joe" }
getDifference(b, a); // { name: "Jo", age: 12 }
getDifference(b, c); // { age: 12 }
getDifference(c, b); // { age: 13 }
```
