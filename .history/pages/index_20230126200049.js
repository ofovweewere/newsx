import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "../components/Header";
import { getAllPosts } from "@/client/request";
const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async (ctx) => {
  const res = await getAllPosts();
  if (!res.hasError) {
    return {
      props: {
        posts: res.body,
      },
    };
  }
};
export default function Home({ posts }) {
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {JSON.stringify(posts)}
      <div className="row">
        <div className="col">
          <article class="blog-post">
            <h2 class="blog-post-title mb-1">Sample blog post</h2>
            <p class="blog-post-meta">
              January 1, 2021 by <a href="#">Mark</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
