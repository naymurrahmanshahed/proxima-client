import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";
import ProjectTitle from "../components/ProjectTitle";
import { useProjectContext } from "../hooks/useProjectContext";
const Home = () => {
  const { projects, dispatch } = useProjectContext();
  useEffect(() => {
    const getAllProject = async () => {
      const res = await fetch("http://localhost:5000/api/projects");
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };
    getAllProject();
  }, [dispatch]);
  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="left col-span-2">
        <ProjectTitle ProjectTitle={"All Projects"} />
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
