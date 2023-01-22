import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="">
        <span>Home</span>
      </Link>
      <Link href="/user">
        <span>User</span>
      </Link>
      <Link href="/post">
        <span>Post</span>
      </Link>
      <style>{` 
        span{
          display: inline-block;
          color: blue;
          margin: 10px 20px;
        }
      `}</style>
    </div>
  );
}
