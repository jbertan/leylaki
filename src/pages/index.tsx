import Head from "next/head";
import Image from "next/image";
import SideBar from "@/components/sidebar";
import Footer from "@/components/footer";
import { Roboto } from "@next/font/google";
import Button from "../components/button";
import SmallBadge from "../components/smallBadge";
import Carousel from "../components/carousel";
import Popular from "../components/popular";
import picture1 from "../static-img/popular10.jpg";
import picture2 from "../static-img/popular9.jpg";

const roboto = Roboto({
  weight: ["100", "400", "700", "900"],
  style: "normal",
  subsets: ["cyrillic"],
  variable: "--roboto-font",
});

export default function Home() {
  return (
    <div className={roboto.variable}>
      <Head>
        <title>Leylaki Takı</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <SideBar />
        <section className="slider">
          <Carousel />
        </section>
        <section className="popular u-margin-bottom-medium">
          <Popular />
        </section>
        {/* <section className="categories">
          <picture className="categories__item">
            <Image src={picture1} width={500} height={250} alt="Takı" />
          </picture>
          <picture className="categories__item">
            <Image src={picture2} width={500} height={250} alt="Takı" />
          </picture>
        </section> */}

        <Footer />
      </main>
    </div>
  );
}
