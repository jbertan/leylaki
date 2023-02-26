import Head from "next/head";
import Products from "../../components/products";
import picture2 from "../../static-img/popular2.jpg";
import { Roboto } from "@next/font/google";
import { GetStaticProps, NextPage } from "next";
import { getAllProducts } from "@/components/util/connectDb";
import { ObjectId } from "mongodb";
import fs from "fs/promises";
import path from "path";
import SideBar from "@/components/sidebar";
import Footer from "@/components/footer";
enum _Categories {
  hediye = "hediye",
  taki = "taki",
}
const roboto = Roboto({
  weight: ["100", "400", "700", "900"],
  style: "normal",
  subsets: ["cyrillic"],
  variable: "--roboto-font",
});

interface iProduct {
  kod: string;
  name: string;
  id: ObjectId;
  fileName: string;
}
interface Props {
  products: iProduct[];
}

const Taki: NextPage<Props> = ({ products }) => {
  return (
    <div className={roboto.variable}>
      <Head>
        <title>Takı Sayfaları</title>
        <meta name="description" content="Takı ve Hediyelik Eşya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="products__container">
        <SideBar />
      </div>
      <main className="products__page">
        <h2 className="products__page__h2">KOLYELER</h2>
        <section className="product u-margin-bottom-medium">
          {products.map((product, i) => (
            <Products
              key={i}
              picture={`/images/products/${product.fileName}`}
              kod={product.kod}
              etiket={product.name}
            />
          ))}

          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
          <Products picture={picture2} kod={"EO86"} etiket={"Kolye Demir"} />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts(_Categories.taki);
  console.log(products);
  return { props: { products }, revalidate: 60 };
};
export default Taki;
