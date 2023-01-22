import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="">Home</Link>
      <Link href="/user">User</Link>
      <Link href="/post">Post</Link>
    </div>
  );
}
