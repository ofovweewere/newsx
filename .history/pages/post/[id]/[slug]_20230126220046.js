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
  }
  return {
    props: {
      post: {},
    },
  };
};
const PostDetailsPage = () => {
  return (
    <div>
      <h1>Post Details Page</h1>
    </div>
  );
};

export default PostDetailsPage;
