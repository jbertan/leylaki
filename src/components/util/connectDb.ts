global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
enum _Db {
  database = "leylaki",
  products = "products",
  admin = "admin",
}
enum _Categories {
  all = "all",
  hediye = "hediye",
  taki = "taki",
}

interface iProduct {
  kod: string;
  name: string;
  fileName: string;
  categories: string;
}
interface iCategories {
  taki: _Categories.taki;
  hediye: _Categories.hediye;
}
type categoryType = _Categories.hediye | _Categories.taki | _Categories.all;

export const _Client = () => {
  const uri = process.env.DB_URI!;
  const client = new MongoClient(uri);
  return client;
};

export const BuildProduct = async ({
  kod,
  name,
  fileName,
  categories,
}: iProduct) => {
  const client = _Client();

  try {
    const database = client.db(_Db.database);
    const products = database.collection(_Db.products);
    const query = { kod, name, fileName, categories };
    const product = await products.insertOne(query);
    client.close();
  } catch (error) {
    console.log(error);
    client.close();
  }
};
//typescript touch needed
export const getAllProducts = async (categories: categoryType) => {
  const client = _Client();
  try {
    const db = client.db(_Db.database);
    const productsCollection = db.collection(_Db.products);
    let result;
    if (categories === _Categories.all) {
      result = await productsCollection.find().toArray();
    } else {
      result = await productsCollection
        .find({ categories: categories })
        .toArray();
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return { error };
  }
};
//admin login for upload and edit section
export const adminLogin = async (userName: string) => {
  const client = _Client();
  try {
    const db = client.db(_Db.database);
    const adminCollection = db.collection(_Db.admin);
    const result = await adminCollection.findOne({ userName: userName });
    //client.close();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    client.close();
    return { error };
  }
};
//update Product inside editproduct
export const productUpdate = async ({
  kod,
  etiket,
  _id,
  categories,
}: IproductUpdate) => {
  const client = _Client();
  try {
    const db = client.db(_Db.database);
    const products = db.collection(_Db.products);
    const result = await products.updateOne(
      { _id },
      { $set: { kod, name: etiket, categories } }
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return { error };
  }
};
//Delete Product inside editproduct
export const productDelete = async ({ _id }: IproductDelete) => {
  const client = _Client();

  try {
    const db = client.db(_Db.database);
    const products = db.collection(_Db.products);
    const result = await products.deleteOne({ _id });
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return { error };
  }
};
