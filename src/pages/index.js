import FormInfo from "@/components/FormInfo";
import Landing from "@/components/Landing";

import Head from "next/head";
import React from "react";
export default function Home() {
  return (
    <>
      <Head>
        <title>Animal Breeding And Genetics</title>
        <meta name="description" content="Department Of Animal Breeding And Genetics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <main>
        <Landing />
        <FormInfo />
        <footer className="text-center mt-4">
          <small className="block text-[12px] mb-1"> Made with <span className="animate-pulse">❤️</span> by Makinde Olaitan (Xertified)</small>
          <small className="block"> Department of Animal Breeding And Genetics {new Date().getFullYear()}</small>
        </footer>
      </main>
    </>
  );
}
