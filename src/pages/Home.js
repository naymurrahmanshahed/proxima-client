import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import ProjectTitle from "../components/ProjectTitle";
import { useProjectContext } from "../hooks/useProjectContext";

import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { projects, dispatch } = useProjectContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const getAllProject = async () => {
      const res = await fetch("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };
    if (user) {
      getAllProject();
    }
  }, [dispatch, user]);
  return (
    <div className="home container mx-auto py-10 xl:py-20 grid grid-cols-2 xl:grid-cols-3 gap-10">
      <div className="left col-span-1 xl:col-span-2">
        {projects.length > 0 ? (
          <ProjectTitle ProjectTitle={"All Projects"} />
        ) : (
          <p className="flex items-center justify-center translate-y-1/2">
            No Project added
          </p>
        )}

        <div className="projects-wrapper flex gap-10 flex-wrap">
          {projects &&
            projects.map((project) => (
              <ProjectDetails
                key={project._id}
                project={project}
              ></ProjectDetails>
            ))}
        </div>
      </div>
      <ProjectForm />
    </div>
  );
};

export default Home;
