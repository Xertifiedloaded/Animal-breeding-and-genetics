
import { Head, Html, NextScript, Main } from "next/document";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Analytics/>
        <SpeedInsights/>
        <NextScript />
      </body>
    </Html>
  );
}
