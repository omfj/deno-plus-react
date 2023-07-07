import { Router } from "https://deno.land/x/oak@v12.5.0/router.ts";
import { postSchema } from "../types.ts";
import { createPost, getAllPosts, getPost } from "../db/post.ts";

export const r = new Router({
  prefix: "/posts",
});

r.get("/", async ({ response }) => {
  const posts = await getAllPosts();

  response.status = 200;
  response.body = JSON.stringify(posts);
});

r.post("/", async ({ request, response }) => {
  try {
    const post = postSchema.parse(await request.body().value);

    await createPost(post);

    response.status = 201;
    response.body = "Post created";
  } catch {
    response.status = 400;
    response.body = "Invalid post";
  }
});

r.get("/:id", async ({ params, response }) => {
  const post = await getPost(params.id);

  if (!post) {
    response.status = 404;
    response.body = "Post not found";
    return;
  }

  response.status = 200;
  response.body = JSON.stringify(post);
});
