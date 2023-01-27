import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  console.log({ query });

  return {
    props: {
      post: {},
    },
  };
};
const PostDetailsPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>Post Details Page</h1>
    </div>
  );
};

export default PostDetailsPage;
