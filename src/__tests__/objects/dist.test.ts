import {
  getDeepValue_Tests,
  getDifference_Tests,
  getUniqueBy_Tests,
  getUnique_Tests,
  serialize_Tests,
} from ".";
import { getDeepValue, getDifference, getUniqueBy } from "../../../dist";
import { getUnique, serialize } from "../../../dist/arrays/getUniqueBy";

getDeepValue_Tests({ getDeepValue });
getDifference_Tests({ getDifference });
getUnique_Tests({ getUnique });
getUniqueBy_Tests({ getUniqueBy });
serialize_Tests({ serialize });
