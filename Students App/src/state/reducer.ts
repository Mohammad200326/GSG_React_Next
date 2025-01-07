import { IStudent } from "../types";

interface IState {
  studentsList: IStudent[];
  totalAbsents: number;
}

type Action =
  | { type: "LOAD_DATA"; payload: IState }
  | { type: "REMOVE_FIRST"; payload: IStudent[] }
  | { type: "ADD_STUDENT"; payload: IStudent }
  | { type: "CHANGE_ABSENT"; payload: { id: string; change: number } }
  | { type: "CHANGE_TOTAL_ABSENTS"; payload: number };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "LOAD_DATA": {
      if (state.studentsList.length === 0) {
        return {
          studentsList: action.payload.studentsList,
          totalAbsents: action.payload.totalAbsents,
        };
      }
      return state;
    }
    case "REMOVE_FIRST": {
      action.payload.shift();
      return { ...state, studentsList: action.payload };
    }
    case "ADD_STUDENT": {
      return {
        ...state,
        studentsList: [...state.studentsList, action.payload],
      };
    }
    case "CHANGE_ABSENT": {
      return {
        studentsList: state.studentsList.map((std) =>
          std.id === action.payload.id
            ? { ...std, absents: std.absents + action.payload.change }
            : std
        ),
        totalAbsents: state.totalAbsents + action.payload.change,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
