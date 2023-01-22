import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Navigation from "../components/Navigation";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.main}>
      <Navigation />
    </div>
  );
}
