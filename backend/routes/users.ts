import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";
import { createUser, getAllUsers, getUser } from "../db/user.ts";
import { userSchema } from "../types.ts";

export const r = new Router({
  prefix: "/users",
});

r.get("/", async ({ response }) => {
  const users = await getAllUsers();

  response.status = 200;
  response.body = JSON.stringify(users);
});

r.post("/", async ({ request, response }) => {
  try {
    const user = userSchema.parse(await request.body().value);

    createUser(user);

    response.status = 201;
    response.body = "User created";
  } catch {
    response.status = 400;
    response.body = "Invalid user";
  }
});

r.get("/:id", async ({ params, response }) => {
  const { id } = params;

  const user = await getUser(id);

  if (!user) {
    response.status = 404;
    response.body = "User not found";
    return;
  }

  response.status = 200;
  response.body = JSON.stringify(user);
});
