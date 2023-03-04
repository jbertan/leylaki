/* import { ObjectId } from "mongodb";
const type = () => {
  declare global {
    export interface IproductUpdate {
      _id: ObjectId;
      kod: string;
      etiket: string;
      categories: _Categories;
      picture: string;
    }
    export const trialExperimental = "Deneme1";
    export const enum _Categories {
      all = "all",
      hediye = "hediye",
      taki = "taki",
      null = "",
    }
    export interface IproductDelete {
      _id: ObjectId;
    }
  }
};

export {};
 */
import { ObjectId } from "mongodb";

export interface IproductUpdate {
  _id: ObjectId;
  kod: string;
  etiket: string;
  categories: _Categories;
  picture: string;
}
export const trialExperimental = "Deneme1";
export const enum _Categories {
  all = "all",
  hediye = "hediye",
  taki = "taki",
  null = "",
}
export interface IproductDelete {
  _id: ObjectId;
}

export {};
