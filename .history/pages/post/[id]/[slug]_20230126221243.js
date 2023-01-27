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
    </div>
  );
};

export default PostDetailsPage;
