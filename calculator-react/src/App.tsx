import { useState } from "react";
import "./App.css";
import Display from "./components/Display";
import Button from "./components/Button";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [isResult, setIsResult] = useState(false);

  const handleClick = (value: string) => {
    setInput((prevInput) => (isResult ? value : prevInput + value));
    if (isResult) {
      setResult(0);
      setIsResult(false);
    }
  };

  const handleResult = () => {
    setResult(eval(input));
    setIsResult(true);
  };

  const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operations: string[] = ["+", "-"];
  return (
    <div className="app">
      <Display result={result} input={input} isResult={isResult} />
      <div className="calculator">
        {/* Numbers */}
        {numbers.map((number) => (
          <Button
            key={number}
            value={number}
            className="number"
            onClick={handleClick}
          />
        ))}

        {/* Operation */}
        {operations.map((operation) => (
          <Button
            key={operation}
            value={operation}
            className="operation"
            onClick={handleClick}
          />
        ))}

        {/* Equal */}
        <Button key="=" value="=" className="equal" onClick={handleResult} />
      </div>
    </div>
  );
}

export default App;
