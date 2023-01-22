import { useRouter } from "next/router";
const FullPost = (props) => {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <div>
      <h1>FullPost - {postId}</h1>
    </div>
  );
};
export default FullPost;
