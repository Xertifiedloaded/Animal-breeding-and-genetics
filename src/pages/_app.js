import { AuthProvider } from "@/context-provider/AuthProvider"
import { ApiProvider } from "@/context-provider/ApiProvider"
import "../styles/global.css"
import { Poppins } from "next/font/google"
import SessionWrapper from "../context-provider/SessionWrapper"

const poppin = Poppins({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={`${poppin.className}`}>
        <SessionWrapper>
          <AuthProvider>
            <ApiProvider>
              <Component {...pageProps} />
            </ApiProvider>
          </AuthProvider>
        </SessionWrapper>
      </div>
    </>
  )
}
