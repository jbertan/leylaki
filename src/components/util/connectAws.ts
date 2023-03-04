import { S3 } from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

interface uploadImage {
  key: string;
  body: any;
}
interface getImage {
  src: string;
  alt: string;
}
interface IdeleteImage {
  key: string;
}
export const _Client = () => {
  const s3Client = new S3({
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
};

export const deleteImage = async ({ key }: IdeleteImage) => {
  const s3 = _Client();
  const response = await s3
    .deleteObject({
      Bucket: bucketName as string,
      Key: key,
    })
    .promise();
  return response;
};
