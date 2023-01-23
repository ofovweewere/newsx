export const getStaticProps = () => {
  return {
    props: {
      name: "Jerry Promise",
    },
  };
};
const Post = (props) => {
  return (
    <div>
      <h1>Post</h1>
    </div>
  );
};
export default Post;
