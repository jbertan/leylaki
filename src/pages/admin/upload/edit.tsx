import Head from "next/head";
import SideBar from "@/components/sidebar";
import Footer from "@/components/footer";

import picture2 from "../../static-img/popular2.jpg";
import { Roboto } from "@next/font/google";
import { GetServerSideProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";
import { _Client } from "@/components/util/connectDb";
import { ObjectId } from "mongodb";
import { getAllProducts } from "@/components/util/connectDb";
import EditProducts from "@/components/EditProducts";
enum _Categories {
  all = "all",
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
  _id: ObjectId;
  fileName: string;
  categories: _Categories;
}
interface Props {
  products: iProduct[];
}

const EditPage: NextPage<Props> = ({ products }) => {
  console.log(products);
  return (
    <main className={roboto.variable}>
      <Head>
        <title>Takı Sayfaları</title>
        <meta name="description" content="Takı ve Hediyelik Eşya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="products__container">
        <SideBar />
      </div>
      <main className="products__page ">
        <h2 className="products__page__h2">Edit Page</h2>
        <div className="product u-margin-bottom-big ">
          {products !== null &&
            products.map((product, i) => (
              //Key =i not acceptable chaged to ObjectId first need to convert to string
              <EditProducts
                key={i}
                picture={`/images/products/${product.fileName}`}
                kod={product.kod}
                etiket={product.name}
                checkboxId={i}
                categories={product.categories}
                _id={product._id}
              />
            ))}
        </div>
        <Footer />
      </main>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const hediye = "hediye";
  const products = await getAllProducts(_Categories.all);
  console.log(products);
  return { props: { products } };
};
export default EditPage;
