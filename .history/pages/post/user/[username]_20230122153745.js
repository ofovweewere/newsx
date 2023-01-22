import { useRouter } from "next/router";
const Username = (props) => {
  const router = useRouter();
  const { usernames } = router.query;
  console.log(router.query);
  return (
    <div>
      <h1>Username - {usernames}</h1>
    </div>
  );
};
export default Username;
