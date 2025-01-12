import { useState } from "react";
import TodoItem from "./TodoItem";

interface IProps {
  tasks: { title: string; urgent: boolean; id: number; isCompleted: boolean }[];
  numOfCompleted: (numOfCompleted: number) => void;
  handleDelete: (id: number) => void;
}

const AllTodos = (props: IProps) => {
  const [numOfCompleted, setNumOfCompleted] = useState(0);

  const handleCompleted = (isCompleted: boolean) => {
    const updatedNum = isCompleted ? numOfCompleted + 1 : numOfCompleted - 1;
    setNumOfCompleted(updatedNum);
    props.numOfCompleted(updatedNum);
  };

  const handleDeletefromAll = (id: number, isCompleted: boolean) => {
    props.handleDelete(id);
    if (isCompleted) {
      const updateCompleted = numOfCompleted - 1;
      setNumOfCompleted(updateCompleted);
      props.numOfCompleted(updateCompleted);
    }
  };
  return (
    <div className="all-todos" style={{ padding: "5px", margin: "30px auto" }}>
      {props.tasks.map((task) => {
        return (
          <TodoItem
            task={task}
            key={task.id}
            isCompleted={handleCompleted}
            handleDelete={handleDeletefromAll}
          />
        );
      })}
    </div>
  );
};

export default AllTodos;
