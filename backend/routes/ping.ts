import { Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { pingParamsSchema } from "../types.ts";

export const r = new Router({
  prefix: "/ping",
});

r.get("/", ({ response }) => {
  response.body = "pong";
});

r.get("/:count", ({ response, params }) => {
  const parsedCount = pingParamsSchema.safeParse(params);

  if (!parsedCount.success) {
    response.status = 400;
    response.body = parsedCount.error.flatten().fieldErrors;
    return;
  }

  const { count } = parsedCount.data;

  response.body = JSON.stringify(Array(count).fill("pong"));
});
