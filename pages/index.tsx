import Head from "next/head";
import styles from "@/styles/Home.module.scss";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <>
      <Head>
        <title>Binary Vision - Dev Test</title>
        <meta name="description" content="Dev Test for Binary Vision" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero />
        <Intro />
      </main>
    </>
  );
}
