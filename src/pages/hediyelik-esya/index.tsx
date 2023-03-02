import Head from "next/head";
import SideBar from "@/components/sidebar";
import Footer from "@/components/footer";
import Products from "../../components/products";
import picture2 from "../../static-img/popular2.jpg";
import { Roboto } from "@next/font/google";
import { GetStaticProps, NextPage } from "next";
import fs from "fs/promises";
import path, { resolve } from "path";
import { getImage } from "@/components/util/connectAws";
import { _Client } from "@/components/util/connectDb";
import { ObjectId } from "mongodb";
import { getAllProducts } from "@/components/util/connectDb";
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
  newFilename: string;
}
interface Props {
  products: iProduct[];
}

const HediyelikEsya: NextPage<Props> = ({ products }) => {
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
          {products !== null &&
            products.map((product, i) => (
              //Key =i not acceptable chaged to ObjectId first need to convert to string
              <Products
                key={i}
                picture={`${product.newFilename}`}
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
  interface iProduct {
    kod: string;
    name: string;
    id: ObjectId;
    fileName: string;
  }
  const hediye = "hediye";
  const products = (await getAllProducts(_Categories.hediye)) as iProduct;
  //@ts-ignore
  const prom = products.map((product) => {
    return getImage({ src: product.fileName, alt: product.fileName }).then(
      (result) => {
        product.newFilename = result;
        return product;
      }
    );
  });
  const prod = await Promise.all(prom).then(function (products) {
    return products;
  });

  return { props: { products: prod }, revalidate: 60 };
};
export default HediyelikEsya;
