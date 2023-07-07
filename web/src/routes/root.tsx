import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { type Post } from "../types";

const getPosts = async () => {
  return fetch("http://localhost:8080/posts").then((res) => res.json());
};

export const RootPage = () => {
  const { data: posts } = useQuery<Array<Post>>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="mx-auto my-20 flex w-full max-w-lg flex-col gap-5 rounded-lg border p-5">
      <h1 className="mb-10 text-center text-4xl font-bold">
        React + Tailwind + TypeScript + Vite
      </h1>

      <Link to="/create">
        <p className="text-center text-blue-600 underline hover:text-blue-500 hover:no-underline">
          Create a post
        </p>
      </Link>

      {posts && posts.length > 0 ? (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                className="block px-2 py-4 hover:bg-gray-100"
                href={`/post/${post.id}`}
              >
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm">{post.body.slice(0, 100)}...</p>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No posts found.</p>
      )}
    </div>
  );
};
