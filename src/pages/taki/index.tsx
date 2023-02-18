import Head from "next/head";
import Products from "../../components/products";
import picture2 from "../../static-img/popular2.jpg";
import { Roboto } from "@next/font/google";
import { GetStaticProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";

const roboto = Roboto({
  weight: ["100", "400", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--roboto-font",
});

interface Props {
  dirs: string[];
}

const Takı: NextPage<Props> = ({ dirs }) => {
  return (
    <div className={roboto.variable}>
      <Head>
        <title>Takı Sayfaları</title>
        <meta name="description" content="Takı ve Hediyelik Eşya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="products__container">
        <section className="sidebar">
          <picture className="sidebar__logo">
            <div className="sidebar__logo--mask">Leylaki</div>
          </picture>
          <a href="#" className="sidebar__takilar">
            Takilar
          </a>
          <a href="#" className="sidebar__hediyelik-esyalar">
            Hediyelik Esyalar
          </a>
        </section>
      </div>
      <main className="products__page">
        <h2 className="products__page__h2">KOLYELER</h2>
        <section className="product">
          {dirs.map((item, i) => (
            <Products
              key={i}
              picture={"/images/taki/" + item}
              kod={"EO86"}
              etiket={"Kolye Demir"}
            />
          ))}

          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dirs = await fs.readdir(
      path.join(process.cwd(), "/public/images/taki")
    );
    return { props: { dirs }, revalidate: 60 };
  } catch (error) {
    return { props: { error } };
  }
};
export default Takı;
