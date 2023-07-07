import z from "https://deno.land/x/zod@v3.21.4/index.ts";

export const userSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
});
export type User = z.infer<typeof userSchema>;

export const sessionSchema = z.object({
  userId: z.string(),
  expiresAt: z.number(),
});
export type Session = z.infer<typeof sessionSchema>;

export const pingParamsSchema = z.object({
  count: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  ),
});

export const postSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});
export type Post = z.infer<typeof postSchema>;
