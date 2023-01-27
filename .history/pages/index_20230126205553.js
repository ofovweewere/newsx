import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "../components/Header";
import { getAllPosts } from "@/client/request";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async (ctx) => {
  const res = await getAllPosts();
  if (!res.hasError) {
    return {
      props: {
        posts: res.body,
      },
      revalidate: 5,
    };
  } else {
    return {
      props: {
        posts: [],
        res,
      },
      revalidate: 5,
    };
  }
};
export default function Home({ posts }) {
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index} className="row">
              <div className="col">
                <article class="blog-post">
                  <h2 class="blog-post-title mb-1">{post.title}</h2>
                  <p class="blog-post-meta">
                    {post.createdAt} by <a href="#">Mark</a>
                  </p>
                  <Link href={`/post/${post._id}`} legacyBehavior>
                    <a>View more</a>
                  </Link>
                </article>
              </div>
            </div>
          );
        })}
    </div>
  );
}
