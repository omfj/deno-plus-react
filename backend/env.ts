export const DEV = Deno.env.get("DEV") == "true";
export const PORT = parseInt(Deno.env.get("PORT") ?? "8080", 10);
