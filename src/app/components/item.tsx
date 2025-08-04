"use client";

import { Post } from "@/api/types";

interface Props extends Post {
  onClickUpdate: (post: Post) => void;
}

const Item = (post: Props) => {
  const { userId, title, body, onClickUpdate } = post;
  return (
    <div>
      <p>{userId}</p>
      <h2>{title}</h2>
      <p>{body}</p>
      <button type="button" onClick={() => onClickUpdate(post)}>
        update
      </button>
    </div>
  );
};

export default Item;
