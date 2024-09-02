
import { Head, Html, NextScript, Main } from "next/document";
import { Analytics } from "@vercel/analytics/react"


export default function RootLayout() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Analytics/>
        <NextScript />
      </body>
    </Html>
  );
}
