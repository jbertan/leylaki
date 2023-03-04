import { GetServerSideProps, NextPage } from "next";
import { useState, useRef, useReducer } from "react";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Roboto } from "@next/font/google";
import Head from "next/head";
import Categories from "../../../helper/categories";
import { _Categories } from "@/components/util/type";
import {
  validateReducer,
  threshold,
  initialState,
  ACTIONTYPE,
} from "@/components/state-management/reducer";

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
  const [validate, dispatch] = useReducer(validateReducer, initialState);
  const { data: session } = useSession();
  /*  console.log(validate.file, validate.kategori, validate.kod, validate.name);
  console.log(
    validate.fileValue,
    validate.kategoriValue,
    validate.kodValue,
    validate.nameValue
  );   console.log(validate.valid);*/

  //Session serverside a taşınacak
  if (session) {
    console.log("Wilcommen Sir");
  } else {
    return <div>No More Enter No</div>;
  }

  if (
    validate.kodValue !== "" &&
    validate.nameValue !== "" &&
    validate.fileValue !== null &&
    validate.kategoriValue !== undefined
  ) {
    !validate.valid && dispatch({ type: threshold.valid });
  } else {
    validate.valid && dispatch({ type: threshold.invalid });
  }
  const validateInput = () => {
    if (validate.file === undefined) {
      dispatch({ type: threshold.invalidFile });
    }
    if (validate.kategori === undefined) {
      dispatch({ type: threshold.invalidKategori });
    }
    if (validate.kod === undefined) {
      dispatch({ type: threshold.invalidKod });
    }
    if (validate.name === undefined) {
      dispatch({ type: threshold.invalidName });
    }
  };
  const submitHandler = async () => {
    console.log("submşt handler");
    setUploading(true);
    if (validate.valid) {
      console.log("Texas");
      console.log(
        validate.fileValue,
        validate.kategoriValue,
        validate.kodValue,
        validate.nameValue
      );
      await Categories({
        categories: validate.kategoriValue!,
        file: validate.fileValue,
        kod: validate.kodValue,
        name: validate.nameValue,
      });
      dispatch({ type: threshold.resetAll });
    }
    setUploading(false);

    setSelectedImage("");
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
            <label
              className={`upload__container__draganddrops__selectedfile ${
                validate.file === false && "invalid__input"
              }`}
            >
              <input
                type="file"
                hidden
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    if (!file) return;
                    if (file.size < 1550000) {
                      setSelectedImage(URL.createObjectURL(file));

                      dispatch({ type: threshold.validFile, payload: file });
                    } else {
                      dispatch({
                        type: threshold.invalidFile,
                        payload: "File Size Bigger Than 1.5MB",
                      });
                    }
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
              {validate.error !== undefined
                ? validate.error
                : "Resim Yüklemek için Dokun"}
            </p>
            <p className="upload__container__draganddrops__explanation">
              - & -
            </p>
            <button
              onClick={
                validate.valid ? () => submitHandler() : () => validateInput()
              }
              /*  */
              className={`upload__container__draganddrops__button  ${
                validate.valid && "button__next"
              }`}
            >
              {!validate.valid ? "Bilgileri Gir" : "Onaylandı"}
            </button>
            <div>{validate.kod}</div>
          </div>
          <div className="upload__container__uploadfiles">
            <h3 className="upload__container__uploadfiles__heading">
              Upload Files
            </h3>
            <div className="upload__container__uploadfiles__labelinput">
              <input
                value={validate.kodValue}
                onChange={(e) =>
                  dispatch({
                    type: threshold.validKod,
                    payload: e.target.value,
                  })
                }
                type="text"
                className={`upload__container__uploadfiles__labelinput__input ${
                  validate.kod !== undefined &&
                  validate.kodValue === "" &&
                  "invalid__input"
                }`}
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
                onChange={(e) =>
                  dispatch({
                    type: threshold.validName,
                    payload: e.target.value,
                  })
                }
                value={validate.nameValue}
                type="text"
                className={`upload__container__uploadfiles__labelinput__input ${
                  validate.name !== undefined &&
                  validate.nameValue === "" &&
                  "invalid__input"
                }`}
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
              <button
                className={`upload__container__uploadfiles__button ${
                  (validate.kategori !== undefined &&
                    validate.kategoriValue === "") ||
                  (validate.kategori === false && "invalid__input")
                } `}
              >
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
                    checked={validate.checked === 1}
                    //onChange={(e) => setKategori(_Categories.hediye)}
                    onChange={() =>
                      dispatch({
                        type: threshold.validKategori,
                        payload: { categories: _Categories.hediye, checked: 1 },
                      })
                    }
                    value={_Categories.hediye}
                    className="upload__container__uploadfiles__dropdown__single--items"
                  />
                  <span>Hediyelik Eşya</span>
                </div>
                <div className="upload__container__uploadfiles__dropdown__single">
                  <input
                    name="Kategori"
                    type="radio"
                    onChange={() =>
                      dispatch({
                        type: threshold.validKategori,
                        payload: { categories: _Categories.taki, checked: 2 },
                      })
                    }
                    checked={validate.checked === 2}
                    value={_Categories.taki}
                    className="upload__container__uploadfiles__dropdown__single--items"
                  />
                  <span>Takı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getServerSession(context.req, context.res, authOptions);
  /* if (session && session !== null) {
    return {
      redirect: {
        destination: "/admin/upload",
        permanent: false,
      },
    };
  } */
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default UploadFile;
