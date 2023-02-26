import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { productDelete } from "@/components/util/connectDb";
import fs from "fs/promises";
import path from "path";
const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, picture } = req.body;
  const newPath = path.join("./public" + picture);
  console.log(picture);
  fs.rm(newPath);
  try {
    const result = await productDelete({ _id: new ObjectId(_id) });
    await fs.rm(newPath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default Delete;
