import { getUserPosts } from "@/client/request";
import { getValue } from "@/utils/common";
import { getSession } from "next-auth/react";
import Link from "next/link";

export const getServerSideProps = async (ctx) => {
  try {
    const session = await getSession({ req: ctx.req });
    if (session) {
      const res = await getUserPosts({ id: session.user.id });
      return {
        props: {
          posts: res.body,
          session,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
const UserProfilePage = ({ posts, session }) => {
  const user = getValue(session, ["user"], null);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div style={{ textAlign: "center" }}>
            <h3>{user.name}</h3>
            <p>If you want a writer, please contact me</p>
            <h4>Email: {user.email}</h4>
          </div>
        </div>
        <hr />
      </div>

      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index} style={{ display: "flex", margin: "10px 0" }}>
              <div style={{ marginRight: "20px" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div>
                <div className="user-posts">
                  <h3>{post.title}</h3>
                  <Link
                    href={`/post/${post._id}/${post.slug.toLocaleLowerCase()}`}
                    legacyBehavior
                  >
                    <a style={{ color: "blue" }}> View More</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserProfilePage;
