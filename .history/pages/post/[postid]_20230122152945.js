import { useRouter } from "next/router";
const PostDetails = (props) => {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <div>
      <h1>PostDetails - postId</h1>
    </div>
  );
};
export default PostDetails;
