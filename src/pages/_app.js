import { AuthProvider } from "@/context-provider/AuthProvider";
import { ApiProvider } from "@/context-provider/ApiProvider";
import "../styles/global.css";


export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <AuthProvider>
          <ApiProvider>
            <Component {...pageProps} />
          </ApiProvider>
        </AuthProvider>
      </div>
    </>
  );
}
