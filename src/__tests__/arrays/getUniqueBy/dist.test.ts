import { getUniqueBy_Tests, getUnique_Tests, serialize_Tests } from ".";

import { getUniqueBy } from "../../../../dist";
import { getUnique, serialize } from "../../../../dist/arrays/getUniqueBy";

getUnique_Tests({ getUnique });
getUniqueBy_Tests({ getUniqueBy });
serialize_Tests({ serialize });
