import React, { useEffect, useReducer, useRef, useState } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import { IStudent } from "../types";
import reducer from "../state/reducer";
import { useSearchParams } from "react-router-dom";

const COURSES_FILTERS = ["Math", "HTML", "CSS", "OOP"];

const Main = () => {
  const lastStdRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    studentsList: [],
    totalAbsents: 0,
  });
  const [params, setParams] = useSearchParams();
  const [filteredList, setFilteredList] = useState<IStudent[]>(
    state.studentsList
  );

  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    const query = params.get("q") || "";
    const graduated = params.get("graduated");
    const courses = params.getAll("courses");
    const stdList: IStudent[] = storedData || [];
    const totalAbs = stdList.reduce((prev, cur) => {
      return prev + cur.absents;
    }, 0);
    dispatch({
      type: "LOAD_DATA",
      payload: { studentsList: stdList, totalAbsents: totalAbs },
    });

    if (query) {
      setFilteredList(
        state.studentsList.filter((std) =>
          std.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredList(state.studentsList);
    }

    if (graduated === "grad") {
      setFilteredList((oldState) => oldState.filter((std) => std.isGraduated));
    } else if (graduated === "non-grad") {
      setFilteredList((oldState) => oldState.filter((std) => !std.isGraduated));
    }

    if (courses.length) {
      setFilteredList(
        state.studentsList.filter((std) =>
          std.coursesList.some((c) => courses.includes(c))
        )
      );
    }
  }, [params, storedData, state.studentsList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (query.length) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    setParams(params);
  };

  const handleGradFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === "all") {
      params.delete("graduated");
    } else {
      params.set("graduated", selected);
    }
    setParams(params);
  };

  const handleCourseFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const course = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      params.append("courses", course);
    } else {
      params.delete("courses", course);
    }
    setParams(params);
  };

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
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={params.get("q") || ""}
        />
        <select
          onChange={handleGradFilter}
          value={params.get("graduated") || "all"}
        >
          <option value="all">All</option>
          <option value="grad">Graduated</option>
          <option value="non-grad">Not Graduated</option>
        </select>
        &nbsp;&nbsp;
        {COURSES_FILTERS.map((c) => {
          return (
            <React.Fragment key={c}>
              <input
                type="checkbox"
                id={c}
                value={c}
                onChange={handleCourseFilter}
                checked={params.getAll("courses").includes(c)}
              />
              <label htmlFor={c}>{c}</label>&nbsp;&nbsp;
            </React.Fragment>
          );
        })}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredList.map((student) => (
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
