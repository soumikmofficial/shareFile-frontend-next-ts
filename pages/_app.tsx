import "../styles/globals.scss";
import type { AppProps } from "next/app";
import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_ENDPOINT;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
