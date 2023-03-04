import Button from "./button";
import { Router } from "next/router";
import { useRouter } from "next/router";
const Carousel = () => {
  const router = useRouter();
  const onSubmitEvent = () => {
    console.log("kolleksiyontest");
    router.push("/taki");
  };
  return (
    <div className="carousel">
      <h2 className="carousel__text u-margin-bottom-small">Leylaki Takı</h2>
      <h3 className="carousel__alt-text u-margin-bottom-small">
        Takı Kolleksiyonu
      </h3>

      <Button buttonName="media500absolute" onClick={onSubmitEvent}>
        Kolleksiyon &rarr;
      </Button>
    </div>
  );
};
export default Carousel;
