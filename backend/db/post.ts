import { Post } from "../types.ts";
import { POSTS_PREFIX, db } from "./kv.ts";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";

export const getAllPosts = async () => {
  const posts = [];

  const entries = db.list<Post>({ prefix: [POSTS_PREFIX] });

  for await (const entry of entries) {
    const id = entry.key[1];
    posts.push({
      id,
      ...entry.value,
    });
  }

  return posts;
};

export const getPost = async (id: string) => {
  const entry = await db.get<Post>([POSTS_PREFIX, id]);

  if (!entry.value) {
    return null;
  }

  return {
    id,
    ...entry.value,
  };
};

export const createPost = async (post: Post) => {
  const id = slugify(post.title, { lower: true });

  // Check if post already exists
  const existingPost = await getPost(id);

  if (existingPost) {
    return null;
  }

  await db.set([POSTS_PREFIX, id], {
    ...post,
  });

  return id;
};
