import Head from "next/head";
import styles from "@/styles/Home.module.scss";

import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Planets, { PlanetDataType } from "@/components/Planets";
import getPlanetData from "@/lib/get-planet-data";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Home({
  planetData,
}: {
  planetData: PlanetDataType[] | [];
}) {
  return (
    <>
      <Head>
        <title>Binary Vision - Dev Test</title>
        <meta name="description" content="Dev Test for Binary Vision" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} + ${roboto.className}`}>
        <Hero />
        <Intro />
        <Planets planetData={planetData} />
      </main>
      <footer className={roboto.className}>
        <Footer />
      </footer>
    </>
  );
}

export async function getStaticProps() {
  try {
    const planetData = await getPlanetData();

    const restructuredData: PlanetDataType[] = planetData.map(
      (planet: any) => ({
        plName: planet.pl_name,
        releaseDate: planet.releasedate,
        plRade: planet.pl_rade,
      })
    );

    restructuredData.sort((a, b) => {
      return (
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    });

    return {
      props: {
        planetData: restructuredData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        planetData: [],
      },
    };
  }
}
