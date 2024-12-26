import { useState } from "react";
import "./App.css";
import AllTodos from "./components/AllTodos";

// Components
import Form from "./components/Form";
import Statistics from "./components/Statistics";

// External libraries
import moment from "moment";

interface Task {
  title: string;
  urgent: boolean;
  id: number;
  isCompleted: boolean;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [numOfCompleted, setNumOfCompleted] = useState(0);

  const handleFormData = (title: string, urgent: boolean) => {
    setTasks([
      ...tasks,
      { title: title, urgent: urgent, id: Date.now(), isCompleted: false },
    ]);
  };
  const createdTasks = tasks.length;

  const urgentTasks = tasks.filter((task) => task.urgent === true).length;

  const getNumOfCompleted = (numOfCompleted: number) => {
    setNumOfCompleted(numOfCompleted);
  };

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#DDDDDD",
        padding: "20px 10px",
        color: "black",
        width: "450px",
      }}
    >
      <h2 className="date" style={{ textAlign: "left" }}>
        <b>{moment().format("dddd")}, </b>
        {moment().format("DD MMM")}
      </h2>
      <Form onSubmit={handleFormData} />
      <Statistics
        createdTasks={createdTasks}
        urgentTasks={urgentTasks}
        completedTasks={numOfCompleted}
      />
      <AllTodos
        tasks={tasks}
        numOfCompleted={getNumOfCompleted}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
