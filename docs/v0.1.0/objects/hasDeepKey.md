# hasDeepKey

Used to check if an object has a property or nested property.

Example:

```js
import { hasDeepKey } from "datafx";

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
hasDeepKey(user, "name"); // true
hasDeepKey(user, "age"); // true
hasDeepKey(user, "address"); // false

// nested keys
hasDeepKey(user, "bio.facebook.displayName"); // true
```
