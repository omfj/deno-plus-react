import { useParams } from "react-router-dom";

import { Post } from "../../components/post";

export const PostPage = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="mx-auto my-20 w-full max-w-lg rounded-lg border p-5">
        <p>Invalid post ID</p>
      </div>
    );
  }

  return (
    <div className="mx-auto my-20 w-full max-w-lg rounded-lg border p-5">
      <Post id={id} />
    </div>
  );
};
