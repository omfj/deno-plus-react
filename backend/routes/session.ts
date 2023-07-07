import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import logger from "../utils/logger.ts";
import { db } from "../db/kv.ts";

export const r = new Router({
  prefix: "/session",
});

r.post("/", async ({ response, cookies }) => {
  const uuid = crypto.randomUUID();

  logger.info("Creating session", uuid);

  await cookies.set("session", uuid, {
    httpOnly: true,
    sameSite: "strict",
  });

  const s = await db.set(["session", uuid], {});

  if (!s.ok) {
    logger.error("Session creation failed", uuid);
    response.status = 500;
    response.body = "Session creation failed";
    return;
  }

  response.status = 201;
  response.body = `Session created: ${uuid}`;
});

r.get("/", async ({ response, cookies }) => {
  const session = await cookies.get("session");

  if (!session) {
    response.status = 404;
    response.body = "Session not found";
    return;
  }

  response.body = `Session found: ${session}`;
});

r.get("/all", async ({ response }) => {
  const sessions = [];

  for await (const session of db.list({ prefix: ["session"] })) {
    sessions.push(session);
  }

  response.body = sessions;
});
