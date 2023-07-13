import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import logger from "./utils/logger.ts";
import { wantedRouter } from "./routes/index.ts";
import { cors } from "./utils/cors.ts";

const PORT = 8080;

const app = new Application();

app.use(logger.middleware);
app.use(cors);

app.use(wantedRouter.routes());
app.use(wantedRouter.allowedMethods());

logger.info(`🚀 Server is running on port: ${PORT}`);

await app.listen({ port: PORT });
