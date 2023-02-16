import { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";

const Home = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const getProject = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/projects/");
        if (!res.ok) throw new Error("Something Went Wrong");
        const data = await res.json();
        setProject(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProject();
  }, []);
  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="left col-span-2">
        <h2 className="title text-4xl font-medium text-sky-400 mb-10">
          All Projects
        </h2>
        <div className="projects-wrapper flex gap-10 flex-wrap">
          {project &&
            project.map((project) => (
              <ProjectDetails
                key={project._id}
                project={project}
              ></ProjectDetails>
            ))}
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Home;
