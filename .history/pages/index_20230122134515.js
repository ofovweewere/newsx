import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Home</h1>
    </div>
  );
}
