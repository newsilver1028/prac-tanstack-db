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
      postCollection.update(post.id, (draft) => {
        draft.completed = true;
        draft.id = post.id;
        draft.userId = post.userId;
        draft.title = "test123";
        draft.body = "test1234";
      });
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {posts.map((post) => (
          <Item key={post.id} {...post} onClickUpdate={onClickUpdate} />
        ))}
      </main>
    </div>
  );
};

export default Posts;
