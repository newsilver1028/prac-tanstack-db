"use client";

import styles from "../page.module.css";
import Posts from "./posts";

const Page = () => {
  return (
    <div className={styles.page}>
      <Posts />
    </div>
  );
};

export default Page;
