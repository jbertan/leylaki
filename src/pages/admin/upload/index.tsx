import { GetServerSideProps, NextPage } from "next";
import { useState, useRef } from "react";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session } from "next-auth";
import { Roboto } from "@next/font/google";
import Head from "next/head";
import Categories from "../../../helper/categories";

enum _Categories {
  taki = "taki",
  hediye = "hediye",
  null = "",
}
interface Props {
  //dirs: string[];
}
const roboto = Roboto({
  weight: ["100", "400", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--roboto-font",
});

const UploadFile: NextPage<Props> = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [kategori, setKategori] = useState<_Categories>(_Categories.null);
  const { data: session } = useSession();

  const kodRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  if (session) {
    console.log("Wilcommen Sir");
  } else {
    return <div>No More Enter No</div>;
  }

  const testRef = () => {
    const kod = kodRef.current?.value;
    const name = nameRef.current?.value;
    if (selectedFile != null && kategori != "" && kod != null && name != null) {
      Categories({
        categories: kategori,
        file: selectedFile,
        kod,
        name,
      });
    }

    const kategoriCheck = document.querySelector(
      "input[type=radio]:checked"
    ) as HTMLInputElement;
    kategoriCheck.checked = false;

    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (kodRef.current) {
      kodRef.current.value = "";
    }
  };
  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  return (
    <div className={roboto.variable}>
      <Head>
        <title>Upload</title>
        <meta name="description" content="Upload Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="upload">
        <div className="upload__container">
          <h2 className="upload__container__heading">Upload Files</h2>
          <p className="upload__container__explanation">
            Upload pictures you want to share and add details
          </p>
          <div className="upload__container__draganddrops">
            <label className="upload__container__draganddrops__selectedfile ">
              <input
                type="file"
                hidden
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  className="upload__container__draganddrops__selectedimage"
                  alt=""
                />
              )}
            </label>
            <svg className="upload__container__draganddrops__svg">
              <use href="/images/sprite.svg#icon-cloud-upload"></use>
            </svg>
            <p className="upload__container__draganddrops__explanation">
              Drag and drop files here
            </p>
            <p className="upload__container__draganddrops__explanation">
              - OR -
            </p>
            <button
              onClick={testRef}
              className="upload__container__draganddrops__button"
            >
              Browse Files
            </button>
          </div>
          <div className="upload__container__uploadfiles">
            <h3 className="upload__container__uploadfiles__heading">
              Upload Files
            </h3>
            <div className="upload__container__uploadfiles__labelinput">
              <input
                ref={kodRef}
                type="text"
                className="upload__container__uploadfiles__labelinput__input"
                placeholder="Kod:"
              />
              <label
                htmlFor="kod"
                className="upload__container__uploadfiles__labelinput__label"
              >
                Serial number for products
              </label>
            </div>
            <div className="upload__container__uploadfiles__labelinput">
              <input
                ref={nameRef}
                type="text"
                className="upload__container__uploadfiles__labelinput__input"
                placeholder="Name:"
                id="name"
              />
              <label
                htmlFor="name"
                className="upload__container__uploadfiles__labelinput__label"
              >
                Name of products
              </label>
            </div>
            <div className="upload__container__uploadfiles__container">
              <button className="upload__container__uploadfiles__button">
                <svg className="upload__container__uploadfiles__button__svg">
                  <use href="/images/sprite.svg#icon-circle-down"></use>
                </svg>
                Kategoriler
              </button>
              <div className="upload__container__uploadfiles__dropdown">
                <div className="upload__container__uploadfiles__dropdown__single">
                  <input
                    name="Kategori"
                    type="radio"
                    onChange={(e) => setKategori(_Categories.taki)}
                    value={_Categories.taki}
                    className="upload__container__uploadfiles__dropdown__single--items"
                  />
                  <span>Takı</span>
                </div>
                <div className="upload__container__uploadfiles__dropdown__single">
                  <input
                    name="Kategori"
                    type="radio"
                    onChange={(e) => setKategori(_Categories.hediye)}
                    value={_Categories.hediye}
                    className="upload__container__uploadfiles__dropdown__single--items"
                  />
                  <span>Hediyelik Eşya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  /* return(<div className="square-basic">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="square-basic">
          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>
      <button
        onClick={handleUpload}
        className=""
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
      >
        {uploading ? "uploading..." : "Upload"}
      </button>
    </div>) */
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default UploadFile;
