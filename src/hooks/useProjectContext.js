import { useContext } from "react";

import { ProjectContext } from "../context/ProjectContext";

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "You must useProjectContext inside a ProjectContextProject"
    );
  }
  return context;
};
