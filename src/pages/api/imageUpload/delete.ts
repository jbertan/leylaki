import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { productDelete } from "@/components/util/connectDb";
import { deleteImage } from "@/components/util/connectAws";

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, fileName } = req.body;
  console.log(fileName);
  try {
    productDelete({ _id: new ObjectId(_id) }).then((result) => result);
    deleteImage({ key: fileName }).then((result) => result);
    res.status(200).json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default Delete;
