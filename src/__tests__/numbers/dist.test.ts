import {
  getInteger_Tests,
  getOrdinalPosition_Tests,
  getRandom_Tests,
  isDivisibleBy_Tests,
  isEven_Tests,
  isPrime_Tests,
} from ".";
import {
  getOrdinalPosition,
  getRandom,
  isDivisibleBy,
  isEven,
  isPrime,
} from "../../../dist";

getOrdinalPosition_Tests({ getOrdinalPosition });
getRandom_Tests({ getRandom });
isEven_Tests({ isEven });
isDivisibleBy_Tests({ isDivisibleBy });
isPrime_Tests({ isPrime });
