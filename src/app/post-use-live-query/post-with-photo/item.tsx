"use client";

import { Photo, Post } from "@/api/types";

interface Props {
  photo: Photo;
  post: Post;
}

const Item = ({ photo, post }: Props) => {
  return (
    <div>
      <p>{post.userId}</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <img src={photo.url} alt={photo.title} width={100} height={100} />
    </div>
  );
};

export default Item;
