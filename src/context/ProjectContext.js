import { createContext, useReducer } from "react";

const initialState = {
  projects: null,
};

export const ProjectContext = createContext();

export const projectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECT":
      return {
        projects: action.payload,
      };
    case "CREATE_PROJECT": {
      return {
        projects: [action.payload, ...state.projects],
      };
    }
    default:
      return state;
  }
};

// provider top level er jinis gulare wrap krbe

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  console.log(state);
  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
