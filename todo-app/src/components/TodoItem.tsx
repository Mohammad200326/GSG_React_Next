import { useState } from "react";
import "./styles/todo-item.css";

interface IProps {
  task: { title: string; urgent: boolean; id: number };
  isCompleted: (task: boolean) => void;
  handleDelete: (index: number) => void;
}

const TodoItem = (props: IProps) => {
  const [isCompleted, setCompleted] = useState(false);

  const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCompleted(checked);
    props.isCompleted(checked);
  };

  const handleDelete = (id: number) => {
    props.handleDelete(id);
  };
  return (
    <div className="todo-item">
      <input type="checkbox" checked={isCompleted} onChange={handleComplete} />
      <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {props.task.title}
      </span>
      {props.task.urgent ? <span>&#x1F525;</span> : <span>&#x1F4A7;</span>}
      <button
        onClick={() => handleDelete(props.task.id)}
        style={{
          backgroundColor: "white",
          color: "red",
          width: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          outline: "none",
        }}
      >
        &#128465;
      </button>
    </div>
  );
};

export default TodoItem;
