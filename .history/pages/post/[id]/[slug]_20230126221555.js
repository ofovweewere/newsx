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
    <div>
      <h1>Post Details Page</h1>
      {JSON.stringify(post)}
      <article className="blog-post">
        <h2 className="blog-post-title mb-1">{post.title}</h2>
        <p className="blog-post-meta">
          {post.createdAt} by <a href="#">{post.user.name}</a>
        </p>
        <Link
          href={`/post/${post._id}/${post.slug.toLocaleLowerCase()}`}
          legacyBehavior
        >
          <a>View more</a>
        </Link>
      </article>
    </div>
  );
};

export default PostDetailsPage;
