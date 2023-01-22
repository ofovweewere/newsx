import Link from "next/link";
const Navigation = (props) => {
  return (
    <>
      <Link href="">
        <span>Home</span>
      </Link>
      <Link href="/user">
        <span>User</span>
      </Link>
      <Link href="/post">
        <span>Post</span>
      </Link>
      <style>{` 
        span{
          display: inline-block;
          color: blue;
          margin: 10px 20px;
        }
      `}</style>
    </>
  );
};

export default Navigation;
