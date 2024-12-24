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
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [numOfCompleted, setNumOfCompleted] = useState(0);

  const handleFormData = (title: string, urgent: boolean) => {
    setTasks([...tasks, { title: title, urgent: urgent }]);
  };
  const createdTasks = tasks.length;

  const urgentTasks = tasks.filter((task) => task.urgent === true).length;

  const getNumOfCompleted = (numOfCompleted: number) => {
    setNumOfCompleted(numOfCompleted);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#DDDDDD",
        padding: "20px 10px",
        color: "black",
        width: "300px",
      }}
    >
      <div className="date" style={{ textAlign: "left" }}>
        <b>{moment().format("dddd")}, </b>
        {moment().format("DD MMM")}
      </div>
      <Form onSubmit={handleFormData} />
      <Statistics
        createdTasks={createdTasks}
        urgentTasks={urgentTasks}
        completedTasks={numOfCompleted}
      />
      <AllTodos tasks={tasks} numOfCompleted={getNumOfCompleted} />
    </div>
  );
}

export default App;
