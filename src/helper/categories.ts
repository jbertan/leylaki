import axios from "axios";
enum _Categories {
  hediye = "hediye",
  taki = "taki",
  null = "",
}
interface Props {
  categories: _Categories;
  file: File;
  kod: string;
  name: string;
}

const Categories = async ({ categories, file, kod, name }: Props) => {
  console.log(categories);
  console.log(file);
  console.log(kod);
  console.log(name);

  try {
    if (!file && name) return;
    const formData = new FormData();
    formData.append("myImage", file);
    formData.append("categories", categories);
    formData.append("file", file);
    formData.append("kod", kod);
    formData.append("name", name);
    if (categories === _Categories.hediye) {
      const { data } = await axios.post("/api/imageUpload/hediye", formData);
      console.log(data);
    } else if (categories === _Categories.taki) {
      const { data } = await axios.post("/api/imageUpload/taki", formData);
      console.log(data);
    } else return;
  } catch (error: any) {
    console.log(error.response?.data);
  }

  return { message: "ok" };
};

export default Categories;
