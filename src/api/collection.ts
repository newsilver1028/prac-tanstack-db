import { z } from "zod";
import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { QueryClient } from "@tanstack/react-query";

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const postCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["posts"],
    queryFn: async () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    queryClient: new QueryClient(),
    getKey: (item) => item.id,
    schema: postSchema,
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${original.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(modified),
        }
      );
      if (!response.ok) {
        console.error("update failed");
      }
      return await response.json();
    },
  })
);

const photoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});

export const photoCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["photos"],
    queryFn: async () =>
      fetch("https://jsonplaceholder.typicode.com/photos").then((res) =>
        res.json()
      ),
    queryClient: new QueryClient(),
    getKey: (item) => item.id,
    schema: photoSchema,
  })
);
