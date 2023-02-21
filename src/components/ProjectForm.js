import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import ProjectTitle from "./ProjectTitle";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useProjectContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // data
    const projectObj = { title, tech, budget, duration, manager, dev };
    //post req
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj),
    });
    const json = await res.json();
    //!res.ok set error
    if (!res.ok) {
      setError(json.error);
    }
    // res.ok  reset

    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setDuration("");
      setManager("");
      setDev("");
      setError("");
      dispatch({ type: "CREATE_PROJECT", payload: json });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-5 ">
      <ProjectTitle ProjectTitle={"Add a New Project"} />

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Project Title
        </label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. e-commerce website"
          id="title"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => {
            setTech(e.target.value);
          }}
          type="text"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. react,redux,nodejs"
          id="tech"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="budget"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Budget(in USD)
        </label>
        <input
          value={budget}
          onChange={(e) => {
            setBudget(e.target.value);
          }}
          type="number"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. 500"
          id="budget"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          type="number"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. 2weeks"
          id="duration"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => {
            setManager(e.target.value);
          }}
          type="text"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. monia"
          id="manager"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="dev"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => {
            setDev(e.target.value);
          }}
          type="text"
          className=" bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
          placeholder="e.g.. 9"
          id="dev"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-500 duration-300"
      >
        Add Project
      </button>
    </form>
  );
};

export default ProjectForm;