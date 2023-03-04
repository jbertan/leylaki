import { NextApiResponse, NextApiRequest } from "next";
import formidable from "formidable";
import { _Categories } from "@/components/util/type";
import path from "path";
import fs from "fs";
import { BuildProduct } from "@/components/util/connectDb";
import { uploadImage } from "@/components/util/connectAws";
export const config = {
  api: {
    bodyParser: false,
  },
};
const Taki = async (req: NextApiRequest, res: NextApiResponse) => {
  const options: formidable.Options = {};
  const time = new Date().getTime().toString();
  //const baseUrl = "/public/images/products";

  options.filename = (name, ext, path, form) => {
    return time + "-" + path.originalFilename?.replace(/\_/, "-");
  };

  const form = formidable(options);

  console.log("Taki.ts");
  form.parse(req, (err, fields, files) => {
    //@ts-ignore
    const newPath = path.join(`${files.myImage.newFilename}`);
    console.log("newFilename:" + newPath);
    const str = {
      kod: fields.kod,
      name: fields.name,
      fileName: newPath,
      categories: fields.categories as _Categories,
    };
    try {
      //@ts-ignore
      const tmpLocation = files.file.filepath;
      uploadImage({ key: newPath, body: fs.createReadStream(tmpLocation) });
      BuildProduct(str);
      res.status(200).json({ message: "Done" });
    } catch (error) {
      res.status(500).json({ message: "error" });
    }
  });
};
export default Taki;
