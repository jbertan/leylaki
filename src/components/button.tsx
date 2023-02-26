interface props {
  children: React.ReactNode;
  onClick: () => void;
  buttonName: string;
}

const Button = (props: props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`button-explorer ${props.buttonName}`}
      >
        {props.children}
      </button>
    </>
  );
};
export default Button;
