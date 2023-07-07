import { Application } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import logger from "./utils/logger.ts";
import {
  pingRouter,
  sessionRouter,
  usersRouter,
  postsRouter,
} from "./routes/index.ts";
import { cors } from "./utils/cors.ts";

const PORT = 8080;

const app = new Application();

app.use(logger.middleware);
app.use(cors);

app.use(pingRouter.routes());
app.use(pingRouter.allowedMethods());
app.use(sessionRouter.routes());
app.use(sessionRouter.allowedMethods());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());
app.use(postsRouter.routes());
app.use(postsRouter.allowedMethods());

logger.info(`🚀 Server is running on port: ${PORT}`);

await app.listen({ port: PORT });
