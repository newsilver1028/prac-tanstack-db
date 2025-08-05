"use client";

import { eq, useLiveQuery } from "@tanstack/react-db";
import { photoCollection, postCollection } from "@/api/collection";
import Item from "./item";
import styles from "../../page.module.css";

const PostWithPhoto = () => {
  const { data: postwithPhoto } = useLiveQuery((q) =>
    q
      .from({ post: postCollection })
      .innerJoin({ photo: photoCollection }, ({ photo, post }) =>
        eq(photo.id, post.id)
      )
  );

  console.log({ postwithPhoto });

  return (
    <main className={styles.main}>
      {postwithPhoto.map((item) => (
        <Item key={item.post.id} photo={item.photo} post={item.post} />
      ))}
    </main>
  );
};

export default PostWithPhoto;
