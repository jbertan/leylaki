import Image from "next/image";

interface Props {
  picture: any;
}

const ImageHolder = (props: Props) => {
  return (
    <div className="image-holder">
      <Image
        src={props.picture}
        alt="Takı Hediyelik Eşya"
        width={200}
        height={200}
      />
    </div>
  );
};
export default ImageHolder;
