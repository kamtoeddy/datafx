# getSubObject

Used to get a subset of an object.

Example:

```js
import { getSubObject } from "datafx";

const user = {
  id: 1,
  name: "James",
  age: 10,
  bio: {
    facebook: {
      displayName: "james-1",
      followers: 200,
      link: "/facebook/james",
    },
    instagram: {
      displayName: "jamezz",
      followers: 500,
      link: "/instagram/jamezz",
    },
  },
};

// keys
getSubObject(user, "name"); // { name: "James" }
getSubObject(user, ["name"]); // { name: "James" }
getSubObject(user, ["age", "name"]); // { age: 10, name: "James" }

// nested keys
getSubObject(user, "bio.facebook.displayName"); // { bio: { facebook: { displayName: "james-1" } } }
```
