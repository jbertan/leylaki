import { ObjectId } from "mongodb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { _Categories } from "./util/type";

interface props {
  checkboxId: number;
  kod: string;
  etiket: string;
  picture: string;
  categories: _Categories;
  _id: ObjectId;
  fileName: string;
}

const EditProducts = (props: props) => {
  const { checkboxId, kod, etiket, picture, categories, _id, fileName } = props;
  const [categoriesCheckBox, setCategoriesCheckBox] = useState<_Categories>(
    _Categories.all
  );
  const [updateKod, setUpdateKod] = useState<string>("");
  const [updateEtiket, setUpdateEtiket] = useState<string>("");

  const saveButtonHandler = async () => {
    console.log(_id);
    const response = await fetch(
      "http://localhost:3000/api/imageUpload/update",
      {
        method: "PUT",
        body: JSON.stringify({
          _id,
          kod: updateKod,
          etiket: updateEtiket,
          categories: categoriesCheckBox,
          fileName,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    console.log(result);
  };

  const deleteButtonHandler = async () => {
    const response = await fetch(
      "http://localhost:3000/api/imageUpload/delete",
      {
        method: "PUT",
        body: JSON.stringify({
          _id,
          fileName,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    if (result) {
      window.location.reload();
    }
    console.log(result);
  };

  useEffect(() => {
    setCategoriesCheckBox(categories);
    setUpdateEtiket(etiket);
    setUpdateKod(kod);
  }, []);
  return (
    <div className="editproducts">
      <button className="editproducts__button-edit" onClick={saveButtonHandler}>
        SAVE
      </button>
      <button
        className="editproducts__button-delete"
        onClick={deleteButtonHandler}
      >
        Delete
      </button>
      <div className="editproducts__image-container">
        <Image
          src={picture}
          width={100}
          height={150}
          alt="Picture"
          style={{ objectFit: "cover" }}
          className="editproducts__image-container__next"
        />
      </div>
      <div className="editproducts__input-group">
        <div className="editproducts__input-group__items">
          <input
            type="text"
            className="editproducts__input-group__items__input"
            id="kod"
            placeholder={updateKod}
            onChange={(e) => setUpdateKod(e.target.value)}
          />

          <label
            htmlFor="kod"
            className="editproducts__input-group__items__label"
          >
            Kod..
          </label>
        </div>
        <div className="editproducts__input-group__items">
          <input
            type="text"
            className="editproducts__input-group__items__input"
            id="name"
            placeholder={updateEtiket}
            onChange={(e) => setUpdateEtiket(e.target.value)}
          />

          <label
            htmlFor="name"
            className="editproducts__input-group__items__label"
          >
            Name...
          </label>
        </div>
        <div className="editproducts__input-group__items">
          <div className="editproducts__input-group__items__dropdown">
            <span>Kategoriler</span>
            <svg className="editproducts__input-group__items__dropdown__svg">
              <use href="/images/sprite.svg#icon-circle-down"></use>
            </svg>
          </div>
          <div className="editproducts__input-group__items__checkboxholder">
            <div className="editproducts__input-group__items__checkboxholder__items">
              <input
                name={"kategori:" + checkboxId}
                type="radio"
                className="editproducts__input-group__items__checkboxholder__items--input"
                id={"taki:" + checkboxId}
                checked={categoriesCheckBox === _Categories.taki ? true : false}
                onChange={() => setCategoriesCheckBox(_Categories.taki)}
              />
              <label
                htmlFor={"taki:" + checkboxId}
                className="editproducts__input-group__items__checkboxholder__items--label"
              ></label>
              <span>Takı</span>
            </div>
            <div className="editproducts__input-group__items__checkboxholder__items">
              <input
                name={"kategori:" + checkboxId}
                type="radio"
                className="editproducts__input-group__items__checkboxholder__items--input"
                id={"hediye:" + checkboxId}
                checked={
                  categoriesCheckBox === _Categories.hediye ? true : false
                }
                onChange={() => setCategoriesCheckBox(_Categories.hediye)}
              />
              <label
                htmlFor={"hediye:" + checkboxId}
                className="editproducts__input-group__items__checkboxholder__items--label"
              ></label>
              <span>Hediyelik Eşya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProducts;
