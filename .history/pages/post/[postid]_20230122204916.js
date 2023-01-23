import { useRouter } from "next/router";
export const getStaticProps = async () => {
  const post = await fetch("http://jsonplaceholder.typicode.com/posts/5");
  const jsonPost = await post.json();
  return {
    props: {
      post: jsonPost || null,
    },
  };
};
const PostDetails = ({ post }) => {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
export default PostDetails;
