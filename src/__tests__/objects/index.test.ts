import {
  assignDeep_Tests,
  getDeepValue_Tests,
  getDifference_Tests,
  getSubObject_Tests,
  hasDeepKey_Tests,
} from ".";
import {
  assignDeep,
  getDeepValue,
  getDifference,
  getSubObject,
  hasDeepKey,
} from "../../";

assignDeep_Tests({ assignDeep });
getDeepValue_Tests({ getDeepValue });
getDifference_Tests({ getDifference });
getSubObject_Tests({ getSubObject });
hasDeepKey_Tests({ hasDeepKey });
