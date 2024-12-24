import { useState } from "react";
import TodoItem from "./TodoItem";

interface IProps {
  tasks: { title: string; urgent: boolean }[];
  numOfCompleted: (numOfCompleted: number) => void;
}

const AllTodos = (props: IProps) => {
  const [numOfCompleted, setNumOfCompleted] = useState(0);

  const handleCompleted = (task: boolean) => {
    const updatedNum = task ? numOfCompleted + 1 : numOfCompleted - 1;
    setNumOfCompleted(updatedNum);
    props.numOfCompleted(updatedNum);
  };
  return (
    <div className="all-todos" style={{ padding: "5px", margin: "30px auto" }}>
      {props.tasks.map((task, index) => {
        return (
          <TodoItem task={task} key={index} isCompleted={handleCompleted} />
        );
      })}
    </div>
  );
};

export default AllTodos;
