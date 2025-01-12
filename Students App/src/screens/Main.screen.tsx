import { useEffect, useReducer, useRef } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import { IStudent } from "../types";
import reducer from "../state/reducer";

const Main = () => {
  const lastStdRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    studentsList: [],
    totalAbsents: 0,
  });

  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    const totalAbs = stdList.reduce((prev, cur) => {
      return prev + cur.absents;
    }, 0);
    dispatch({
      type: "LOAD_DATA",
      payload: { studentsList: stdList, totalAbsents: totalAbs },
    });
  }, [storedData]);

  const removeFirst = () => {
    const newList = [...state.studentsList];
    dispatch({ type: "REMOVE_FIRST", payload: newList });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "CHANGE_ABSENT", payload: { id: id, change: change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className="stats">
        <button onClick={removeFirst}>Remove First Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: "12px", fontWeight: 100, color: "gray" }}>
          Total Absents {state.totalAbsents}
        </b>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
        }}
      >
        {state.studentsList.map((student) => (
          <Student
            key={student.id}
            id={student.id}
            name={student.name}
            age={student.age}
            absents={student.absents}
            isGraduated={student.isGraduated}
            coursesList={student.coursesList}
            onAbsentChange={handleAbsentChange}
          />
        ))}
      </div>
      <div ref={lastStdRef}></div>
    </>
  );
};

export default Main;
