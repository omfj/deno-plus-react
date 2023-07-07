import { createBrowserRouter } from "react-router-dom";

import { Create } from "./routes/create";
import { PostPage } from "./routes/posts/post-page";
import { RootPage } from "./routes/root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);
