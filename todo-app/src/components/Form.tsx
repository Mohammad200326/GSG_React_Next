import { useState } from "react";
import "../styles/form.css";

interface IProps {
  onSubmit: (title: string, urgent: boolean) => void;
}

const Form = (props: IProps) => {
  const [input, setInput] = useState({ title: "", urgent: false });

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, title: e.target.value });
  };
  const handleUrgent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, urgent: e.target.checked });
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.title != "") {
      props.onSubmit(input.title, input.urgent);
      setInput({ title: "", urgent: false });
    }
  };

  return (
    <div className="form">
      <form onSubmit={(e) => addTask(e)}>
        <input
          type="text"
          placeholder="Type Todo here..."
          value={input.title}
          onChange={handleTitle}
        />
        <div>
          <label htmlFor="urgent">Urgent&#x1F525;: </label>
          <input
            type="checkbox"
            name="urgent"
            checked={input.urgent}
            onChange={handleUrgent}
          />
        </div>
        <button>Add Todo</button>
      </form>
    </div>
  );
};

export default Form;
