import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { productDelete } from "@/components/util/connectDb";
import { deleteImage } from "@/components/util/connectAws";

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, fileName } = req.body;
  console.log(fileName);
  try {
    const result = await productDelete({ _id: new ObjectId(_id) });
    const responseAws = await deleteImage({ key: fileName });
    res.status(200).json(responseAws);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default Delete;
