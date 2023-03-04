import { productUpdate } from "@/components/util/connectDb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const Update = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, kod, etiket, categories, picture, fileName } = req.body;

  const result = await productUpdate({
    kod,
    etiket,
    _id: new ObjectId(_id),
    categories,
    picture: fileName,
  });
  console.log(picture, typeof _id);
  res.status(200).json({ message: "Marveleous" });
};
export default Update;
