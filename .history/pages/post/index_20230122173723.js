export const getStaticProps = () => {
  return {
    props: {
      name: "Jerry Goodie",
    },
  };
};
const Post = ({ name }) => {
  return (
    <div>
      <h1>Post</h1>
      <h2>by {name}</h2>
    </div>
  );
};
export default Post;
