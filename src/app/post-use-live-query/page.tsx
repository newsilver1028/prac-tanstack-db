"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Posts from "./posts";

const Page = () => {
  return (
    <div className={styles.page}>
      <div>
        <Link href="/post-use-live-query/post-with-photo">
          go to post with photo
        </Link>
      </div>
      <Posts />
    </div>
  );
};

export default Page;
