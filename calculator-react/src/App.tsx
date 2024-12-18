import { useState } from "react";
import "./App.css";
import Display from "./components/Display";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handleInput = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleResult = () => {
    setResult(eval(input));
  };
  return (
    <div className="app">
      <Display result={result} input={input} />
      <div className="calculator">
        <button className="number" onClick={() => handleInput("1")}>
          1
        </button>
        <button className="number" onClick={() => handleInput("2")}>
          2
        </button>
        <button className="number" onClick={() => handleInput("3")}>
          3
        </button>
        <button className="number" onClick={() => handleInput("4")}>
          4
        </button>
        <button className="number" onClick={() => handleInput("5")}>
          5
        </button>
        <button className="number" onClick={() => handleInput("6")}>
          6
        </button>
        <button className="number" onClick={() => handleInput("7")}>
          7
        </button>
        <button className="number" onClick={() => handleInput("8")}>
          8
        </button>
        <button className="number" onClick={() => handleInput("9")}>
          9
        </button>
        <button className="number" onClick={() => handleInput("0")}>
          0
        </button>
        <button className="operation" onClick={() => handleInput("+")}>
          +
        </button>
        <button className="operation" onClick={() => handleInput("-")}>
          -
        </button>
        <button id="equal" onClick={handleResult}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
