import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";
import z from "https://deno.land/x/zod@v3.21.4/index.ts";
import { getOrCreateWantedPerson } from "../db/wanted.ts";
import logger from "../utils/logger.ts";

export const r = new Router({
  prefix: "/wanted",
});

const wantedPayload = z.object({
  name: z.string(),
});

r.post("/", async ({ request, response }) => {
  try {
    const name = wantedPayload
      .parse(await request.body({ type: "json" }).value)
      .name.toLowerCase();

    const wanted = await getOrCreateWantedPerson(name);

    response.status = 200;
    response.headers.set("Content-Type", "application/json");
    response.body = JSON.stringify(wanted);
  } catch (error) {
    logger.info(error.message);

    if (error instanceof z.ZodError) {
      response.status = 400;
      return;
    }

    response.status = 500;
  }
});
