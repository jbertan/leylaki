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

const Categories = ({ categories, file, kod, name }: Props) => {
  console.log(categories);
  console.log(file);
  console.log(kod);
  console.log(name);
};
export default Categories;
