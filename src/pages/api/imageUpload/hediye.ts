import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import { NextRequest } from "next/server";
import path, { resolve } from "path";
import fs from "fs/promises";
import { BuildProduct } from "@/components/util/connectDb";
export const config = {
  api: {
    bodyParser: false,
  },
};
const readFile = async (
  req: NextApiRequest,
  saveLocally?: boolean /* => {
  let fieldForm = "";
  const form = new formidable.IncomingForm();
  const time = new Date().getTime().toString();
  form.parse(req);
  console.log(req.query);
  form.on("fileBegin", function (name, file) {
    file.filepath = path.join(
      process.cwd() +
        "/public" +
        "/images" +
        "/hediye" +
        `/${time}` +
        `${file.originalFilename?.replace(/\_/, "-")}`
    );
  });
}; */
): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
}> => {
  const options: formidable.Options = {};
  const time = new Date().getTime().toString();
  const baseUrl = "/public/images/products";
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), baseUrl);
    options.filename = (name, ext, path, form) => {
      return time + "-" + path.originalFilename?.replace(/\_/, "-");
    };
  }
  const form = formidable(options);

  return new Promise((resolve, reject) => {
    console.log("Hediye.ts");
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      //@ts-ignore
      const newPath = path.join(`${files.myImage.newFilename}`);
      console.log(newPath);
      const str = {
        kod: fields.kod,
        name: fields.name,
        fileName: newPath,
        categories: fields.categories,
      };
      try {
        //@ts-ignore
        BuildProduct(str);
      } catch (error) {}
      resolve({ fields, files });
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/images", "/products")
    );
  } catch (error) {
    await fs.mkdir(
      path.join(process.cwd() + "/public", "/images", "/products")
    );
  }

  await readFile(req, true);
  res.json({ done: "ok" });
};

export default handler;
