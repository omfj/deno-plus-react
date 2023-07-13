import { Wanted } from "./types.ts";
import { createUnique } from "./utils/list.ts";
import COUNTRIES from "./countries.ts";
import REASONS from "./reasons.ts";
import { getRandomInt } from "./utils/random.ts";

const AGENCIES = ["CIA", "FBI", "PST", "KGB"];

export class WantedFactory {
  create = (name: string): Wanted => {
    const reason = REASONS[getRandomInt(REASONS.length)];
    const agency = AGENCIES[getRandomInt(AGENCIES.length)];

    const countriesArr = Array(getRandomInt(10))
      .fill(undefined)
      .map(() => COUNTRIES[getRandomInt(COUNTRIES.length)]);
    const countries = createUnique(countriesArr);

    return {
      reason,
      agency,
      countries,
      name,
    };
  };
}
