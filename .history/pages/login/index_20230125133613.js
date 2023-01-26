import { useStore } from "@/client/context";
import { authConstants } from "@/client/context/constants";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, dispatch] = useStore();
  const loginHandler = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", { ...payload, redirect: false });
    if (!result.error) {
      const session = await getSession();
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      router.replace("/");
    } else {
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: result.error });
      setErrorMessage(result.error);
    }
  };
  return (
    <main className="form-signin w-100 m-auto">
      <form
        style={{
          margin: "50px 0",
        }}
        onSubmit={loginHandler}
      >
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        {errorMessage && (
          <p style={{ textTransform: "capitalize", color: "red" }}>
            {errorMessage}
          </p>
        )}

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
    </main>
  );
};

export default Login;