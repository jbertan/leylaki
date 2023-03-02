import Image from "next/image";
import { getImage } from "./util/connectAws";
interface Props {
  picture: any;
  kod: string;
  etiket: string;
}

const Products = (props: Props) => {
  return (
    <div className="product__container">
      <picture className="product__container__img">
        <Image
          src={props.picture}
          width={200}
          height={300}
          alt={props.etiket}
          style={{ objectFit: "contain" }}
          data-testid="img-test"
        />
      </picture>
      <span className="product__container__kod">{props.kod}</span>
      <p className="product__container__etiket">{props.etiket}</p>
    </div>
  );
};
export default Products;
