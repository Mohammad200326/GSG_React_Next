// import { useState } from "react";
import "../styles/todo-item.css";

interface IProps {
  task: { title: string; urgent: boolean; id: number; isCompleted: boolean };
  isCompleted: (isCompleted: boolean) => void;
  handleDelete: (index: number, isCompleted: boolean) => void;
}

const TodoItem = (props: IProps) => {
  const handleComplete = () => {
    props.task.isCompleted = !props.task.isCompleted;
    props.isCompleted(props.task.isCompleted);
  };

  const handleDelete = (id: number, isCompleted: boolean) => {
    props.handleDelete(id, isCompleted);
  };
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={props.task.isCompleted}
        onChange={handleComplete}
      />
      <span
        style={{
          textDecoration: props.task.isCompleted ? "line-through" : "none",
        }}
      >
        {props.task.title}
      </span>
      {props.task.urgent ? <span>&#x1F525;</span> : <span>&#x1F4A7;</span>}
      <button
        onClick={() => handleDelete(props.task.id, props.task.isCompleted)}
        style={{
          backgroundColor: "white",
          color: "red",
          width: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          outline: "none",
        }}
      >
        <span style={{ fontSize: "20px" }}>&#128465;</span>
      </button>
    </div>
  );
};

export default TodoItem;
