import AWS from "aws-sdk";
require("dotenv").config();
import formidable, { File } from "formidable";
import fs from "fs";
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

interface uploadImage {
  key: string;
  body: any;
}
interface getImage {
  src: string;
  alt: string;
}
export const _Client = () => {
  AWS.config.update({
    region: region,
    apiVersion: "latest",
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });
  const s3Client = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
  });
  return s3Client;
};

export const uploadImage = async ({ key, body }: uploadImage) => {
  const s3 = _Client();

  await s3
    .upload({
      Bucket: bucketName as string,
      Key: key,
      Body: body,
    })
    .promise()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export const getImage = async ({ src, alt }: getImage) => {
  const s3 = _Client();
  const params = {
    Bucket: bucketName,
    Key: src,
  };
  try {
    const picture = await s3.getSignedUrlPromise("getObject", params);
    return picture;
  } catch (error) {
    console.log(error);
  }
  /* s3.getSignedUrlPromise("getObject", params)
    .then((picture) => {
      return picture;
    })
    .catch((err) => console.log(err)); */
};
/* const uploadedImage = await s3
  .upload({
    Bucket: bucketName as string,
    Key: "test.jpg",
    Body: "File Content",
  })
  .promise()
  .then((data) => console.log(data));
 */
