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
  return (
    <div>
      <h1>Post Details Page</h1>
    </div>
  );
};

export default PostDetailsPage;
