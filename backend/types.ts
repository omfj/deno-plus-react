import z from "https://deno.land/x/zod@v3.21.4/index.ts";

export const wantedSchema = z.object({
  name: z.string(),
  reason: z.string(),
  agency: z.string(),
  countries: z.array(z.string()),
});
export type Wanted = z.infer<typeof wantedSchema>;
