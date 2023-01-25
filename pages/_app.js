import { StoreProvider } from "@/client/context";
import "@/styles/globals.css";
import Layout from "../components/Layout";
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
