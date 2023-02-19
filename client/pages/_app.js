import "@/styles/globals.css";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "mandali",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
