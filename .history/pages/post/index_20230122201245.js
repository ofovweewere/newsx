export const getStaticProps = async () => {
  const post = await fetch("http://jsonplaceholder.typicode.com/posts/5");
  const jsonPost = await post.json();
  return {
    props: {
      post: jsonPost || null,
    },
  };
};
const Post = ({ post }) => {
  return (
    <div>
      <h1>Post</h1>
      <h2>by {post}</h2>
    </div>
  );
};
export default Post;
