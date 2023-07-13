import { Wanted } from "../types.ts";
import { WantedFactory } from "../wanted.ts";
import { WANTED_PREFIX, db } from "./kv.ts";

const wantedFactory = new WantedFactory();

export const getOrCreateWantedPerson = async (
  name: string
): Promise<Wanted> => {
  const resp = await db.get<Wanted>([WANTED_PREFIX, name]);

  if (resp.value) return resp.value;

  const wanted = wantedFactory.create(name);

  await db.set([WANTED_PREFIX, name], wanted);

  return wanted;
};
