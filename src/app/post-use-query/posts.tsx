"use client";

import styles from "../page.module.css";
import Item from "../components/item";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/api/types";

const Posts = () => {
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["posts-use-query"],
    queryFn: async () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  const updatePostMutation = useMutation({
    mutationFn: async (newPost) => {
      console.log({ title: newPost.title, body: newPost.body });

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${newPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(newPost),
        }
      );
      if (!response.ok) {
        console.error("update failed");
      }
      return await response.json();
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: ["posts-use-query"],
      });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) => [...(old || []), newPost]);

      return { previousTodos };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-use-query"],
      });
    },
  });

  const onClickUpdate = (post: Post) => {
    updatePostMutation.mutate({
      id: post.id,
      userId: post.userId,
      title: "title을 수정했습니다.",
      body: "body를 수정했습니다.",
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {posts?.map((post: Post) => (
          <Item key={post.id} {...post} onClickUpdate={onClickUpdate} />
        ))}
      </main>
    </div>
  );
};

export default Posts;
