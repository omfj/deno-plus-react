export const db = await Deno.openKv();

export const USERS_PREFIX = "users";
export const SESSIONS_PREFIX = "sessions";
export const POSTS_PREFIX = "posts";
