import Header from "../Header";
import Head from "next/head";
import { useStore } from "@/client/context";
import { useEffect } from "react";
const Layout = ({ children }) => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    const authenticated = getValue(state, ["user", "authenticated"], false);
    if (!authenticated) {
    }
  }, []);
  return (
    <>
      <Head>
        <link
          href="https://getbootstrap.com/docs/5.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {/* <Navigation /> */}
      {children}
    </>
  );
};

export default Layout;
