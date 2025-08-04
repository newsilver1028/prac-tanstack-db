"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "../page.module.css";
import Posts from "./posts";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.page}>
        <Posts />
      </div>
    </QueryClientProvider>
  );
};

export default Page;
