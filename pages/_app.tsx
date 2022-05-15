import "../styles/globals.scss";
import type { AppProps } from "next/app";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
