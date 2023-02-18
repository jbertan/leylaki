import Button from "./button";
import SmallBadge from "./smallBadge";
import ImageHolder from "./imageholder";
import popular2 from "../static-img/popular2.jpg";
import popular3 from "../static-img/popular3.jpg";
import popular4 from "../static-img/popular4.jpg";
import popular5 from "../static-img/popular5.jpg";
import popular6 from "../static-img/popular6.jpg";
const Popular = () => {
  return (
    <>
      <div className="popular__wheretonext">
        <div className="popular__wheretonext__style"></div>
        <p className="popular__wheretonext__text">
          Nereden başlayacağıma emin değilim ?
        </p>
      </div>
      <div className="popular__img popular__img__item--1">
        <ImageHolder picture={popular2} />
      </div>
      <div className="popular__img popular__img__item--2">
        <ImageHolder picture={popular3} />
      </div>
      <div className="popular__img popular__img__item--3">
        <ImageHolder picture={popular4} />
        <SmallBadge badgeName="Metal" />
      </div>
      <div className="popular__img popular__img__item--4">
        <ImageHolder picture={popular5} />
        <SmallBadge badgeName="Metal" />
      </div>
      <div className="popular__img popular__img__item--5">
        <ImageHolder picture={popular6} />
        <SmallBadge badgeName="Metal" />
      </div>
      <div className="popular__img popular__img__item--6 "></div>

      <div className="popular__explore">
        <h2 className="popular__explore__h2">Şu Anda En Popüler Olanlar</h2>
        <h3 className="popular__explore__h3">
          Takılar içerisinde, size en çok yakışanı bulun.
        </h3>
        <Button onClick={() => console.log("test")} buttonName={"Keşfet"}>
          KEŞFET &rarr;
        </Button>
      </div>
    </>
  );
};
export default Popular;
