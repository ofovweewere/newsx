import { useRouter } from "next/router";
const Username = (props) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>Username - {username}</h1>
    </div>
  );
};
export default Username;
