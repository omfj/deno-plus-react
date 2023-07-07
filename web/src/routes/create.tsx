import { useState } from "react";
import { Link } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [formState, setFormState] = useState<"idle" | "submitting">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState("submitting");
    await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    setFormState("idle");

    setTitle("");
    setBody("");
  };

  return (
    <div className="mx-auto my-20 flex w-full max-w-lg flex-col gap-5 rounded-lg border p-5">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Create a new post
      </h1>

      <Link to="/">
        <p className="text-center text-blue-600 underline hover:text-blue-500 hover:no-underline">
          Back to home
        </p>
      </Link>

      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="mb-2 block">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded-md
            border border-gray-300
            px-3 py-2
            focus:border-blue-500 focus:outline-none
            "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="body" className="mb-2 block">
            Body
          </label>
          <textarea
            id="body"
            className="w-full rounded-md
            border border-gray-300
            px-3 py-2
            focus:border-blue-500 focus:outline-none
            "
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-3 py-2 text-white"
          disabled={formState === "submitting"}
        >
          {formState === "submitting" ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};
