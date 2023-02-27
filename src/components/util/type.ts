import { ObjectId } from "mongodb";
declare global {
  export interface IproductUpdate {
    _id: ObjectId;
    kod: string;
    etiket: string;
    categories: _Categories;
    picture: string;
  }
  export enum _Categories {
    all = "all",
    hediye = "hediye",
    taki = "taki",
  }
  export interface IproductDelete {
    _id: ObjectId;
  }
}
