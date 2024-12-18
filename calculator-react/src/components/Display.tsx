interface IProps {
  result: number;
  input: string;
}
const Display = (props: IProps) => {
  return (
    <div
      style={{
        backgroundColor: "#f4f6fB",
        color: "#373f41",
        fontWeight: "bold",
        fontSize: "30px",
        padding: "10px 15px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
      }}
    >
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
