import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Post as TPost } from "../types";

const getPost = async (id: string) => {
  return fetch(`http://localhost:8080/posts/${id}`).then((res) => res.json());
};

export const Post = ({ id }: { id: string }) => {
  const { data: post } = useQuery<TPost>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  return (
    <Fragment>
      <h1 className="mb-10 text-center text-4xl font-bold">{post?.title}</h1>

      <p>{post?.body}</p>
    </Fragment>
  );
};
