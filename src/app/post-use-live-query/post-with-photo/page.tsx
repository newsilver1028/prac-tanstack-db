"use client";

import styles from "../../page.module.css";
import PostWithPhoto from "./postWithPhoto";

const Page = () => {
  return (
    <div className={styles.page}>
      <PostWithPhoto />
    </div>
  );
};

export default Page;
