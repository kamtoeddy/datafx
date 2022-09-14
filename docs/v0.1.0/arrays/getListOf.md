# getListOf

It takes an array and a key or nested key(string) as first and second parameters respectively. The key is used to extract the values from each item in the array and the list of these values is returned.

It also takes an object as third parameter(optional). This object has a property; `unique` (boolean). If unique is true, the list of values returned would only be comprised of unique values. By default unique is `false`

Example:

```js
import { getListOf } from "datafx";

const array = ["one", "three", "five", "seven"];

getListOf(array, "length"); // [3, 5, 4, 5]

getListOf(array, "length", { unique: true }); // [3, 5, 4]

const users = [
  { name: "James", bio: { followers: 300 } },
  { name: "Mary", bio: { followers: 275 } },
  { name: "Bob", bio: { followers: 300 } },
  { name: "James", bio: { followers: 220 } },
  { name: "Doe", bio: { followers: 250 } },
];

getListOf(users, "bio.followers"); // [300, 275, 300, 220, 250];
```
