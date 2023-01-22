import { useRouter } from "next/router";
const PostDetails = (props) => {
  const router = useRouter();
  const { postid } = router.query;
  return (
    <div>
      <h1>PostDetails - {postid}</h1>
    </div>
  );
};
export default PostDetails;
