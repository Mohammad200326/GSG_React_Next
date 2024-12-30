import "../styles/button.css";

interface IProps {
  value: string;
  className: string;
  onClick: (value: string) => void;
  key: string;
}

const Button = (props: IProps) => {
  return (
    <button
      style={{ border: "none", outline: "none" }}
      className={`button ${props.className}`}
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </button>
  );
};

export default Button;
