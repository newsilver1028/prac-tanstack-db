"use client";

import { useLiveQuery } from "@tanstack/react-db";
import { postCollection } from "@/api/collection";
import { Post } from "@/api/types";
import Item from "../components/item";
import styles from "../page.module.css";

const Posts = () => {
  const { data: posts } = useLiveQuery((q) =>
    q.from({ posts: postCollection })
  );

  const onClickUpdate = (post: Post) => {
    const isExist = postCollection.get(post.id);
    if (isExist) {
      postCollection.update(
        post.id,
        // { optimistic: false }, // default: false
        (draft: Post) => {
          draft.id = post.id;
          draft.userId = post.userId;
          draft.title = "title을 수정해보았습니다.";
          draft.body = "body를 수정해보았습니다.";
        }
      );
    }
  };

  return (
    <main className={styles.main}>
      {posts.map((post) => (
        <Item key={post.id} {...post} onClickUpdate={onClickUpdate} />
      ))}
    </main>
  );
};

export default Posts;
