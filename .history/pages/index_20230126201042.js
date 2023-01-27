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
      {/* {JSON.stringify(posts)} */}
      {posts.length}
      {posts &&
        posts.map((post, index) => {
          {
            ("hey hey");
          }
        })}
    </div>
  );
}
