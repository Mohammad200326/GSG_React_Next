import { useState } from "react";
import "./styles/todo-item.css";

interface IProps {
  task: { title: string; urgent: boolean };
  isCompleted: (task: boolean) => void;
}

const TodoItem = (props: IProps) => {
  const [isCompleted, setCompleted] = useState(false);

  const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCompleted(checked);
    props.isCompleted(checked);
  };
  return (
    <div className="todo-item">
      <input type="checkbox" checked={isCompleted} onChange={handleComplete} />
      <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
        {props.task.title}
      </span>
      {props.task.urgent ? <span>&#x1F525;</span> : <span>&#x1F4A7;</span>}
    </div>
  );
};

export default TodoItem;
