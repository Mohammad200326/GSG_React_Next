import "../styles/display.css";

interface IProps {
  result: number;
  input: string;
  isResult: boolean;
}
const Display = (props: IProps) => {
  return (
    <div className="display">
      <div>
        <span>{props.input ? props.input : "0"}</span>
        <span>{props.result ? " = " : ""}</span>
        <span style={{ color: "#36acca" }}>
          {props.result ? props.result : ""}
        </span>
      </div>
    </div>
  );
};

export default Display;
