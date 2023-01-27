import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <article class="blog-post">
            <h2 class="blog-post-title mb-1">Sample blog post</h2>
            <p class="blog-post-meta">
              January 1, 2021 by <a href="#">Mark</a>
            </p>

            <p>This blog post shows a few different types of content</p>
          </article>
        </div>
      </div>
    </div>
  );
}
