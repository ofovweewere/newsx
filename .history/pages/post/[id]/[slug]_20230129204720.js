import { getSinglePost } from "@/client/request";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const res = await getSinglePost(query.id);
  if (!res.hasError) {
    return {
      props: {
        post: res.body,
      },
    };
  } else {
    return {
      props: {
        post: null,
      },
    };
  }
};
const PostDetailsPage = ({ post }) => {
  return (
    <div className="container">
      <div className="row">
        <article className="blog-post">
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-meta">
            {post.createdAt} by <a href="#">{post.user.name}</a>
          </p>
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <img src={post.image} alt={post.title} style={{ width: "80%" }} />
          </div>

          <p>{post.desc}</p>
        </article>
      </div>
    </div>
  );
};

export default PostDetailsPage;
