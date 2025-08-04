import Link from "next/link";
import styles from "./page.module.css";

const Page = () => {
  return (
    <div className={styles.page}>
      <div>
        <Link href="/post-use-live-query">useLiveQuery</Link>
      </div>
      <div>
        <Link href="/post-use-query">useQuery</Link>
      </div>
    </div>
  );
};

export default Page;
