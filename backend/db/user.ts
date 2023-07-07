import { User } from "../types.ts";
import { db } from "./kv.ts";
import { USERS_PREFIX } from "./kv.ts";

export const createUser = async (user: User) => {
  const uuid = crypto.randomUUID();

  await db.set([USERS_PREFIX, uuid], user);
};

export const getUser = async (uuid: string) => {
  const user = await db.get<User>([USERS_PREFIX, uuid]);

  return {
    id: user.key[1],
    ...user.value,
  };
};

export const getAllUsers = async () => {
  const users = [];

  const entries = db.list<User>({ prefix: [USERS_PREFIX] });

  for await (const entry of entries) {
    const id = entry.key[1];
    users.push({
      id,
      ...entry.value,
    });
  }

  return users;
};
