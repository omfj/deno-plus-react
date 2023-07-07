import { Session } from "../types.ts";
import { SESSIONS_PREFIX, db } from "./kv.ts";
import { getUser } from "./user.ts";

export const createSession = async (session: Session) => {
  const sessionId = crypto.randomUUID();

  await db.set([SESSIONS_PREFIX, sessionId], session);

  return sessionId;
};

export const getUserBySession = async (sessionId: string) => {
  const session = await db.get<Session>([SESSIONS_PREFIX, sessionId]);

  const userId = session.value?.userId;

  if (!userId) {
    return undefined;
  }

  const user = await getUser(userId);

  return user;
};
