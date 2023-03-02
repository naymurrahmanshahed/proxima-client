import { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import ProjectTitle from "./ProjectTitle";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectForm = ({ project, setIsOverlayOpen, setIsModalOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useProjectContext();
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    // if no user

    if (!user) {
      setError("You Must Be Log In");
      return;
    }

    // data
    const projectObj = { title, tech, budget, duration, manager, dev };

    // if there is no project,send post req
    if (!project) {
      //post req
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();
      console.log(json);
      //!res.ok set error
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      // res.ok  reset

      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_PROJECT", payload: json });
      }
      return;
    }
    // if there is a project
    if (project) {
      // send patch req
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );
      const json = await res.json();
      console.log(json);
      //res.ok
      if (res.ok) {
        setError(null);
        setEmptyFields([]);

        //close overlay & modal
        setIsModalOpen(false);
        setIsOverlayOpen(false);
        //dispatch
        dispatch({ type: "UPDATE_PROJECT", payload: json });
      }

      //!res.ok
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-2 ">
      <ProjectTitle
        ProjectTitle={project ? "Update Project" : "Add a New Project"}
      />

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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
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
          className={`bg-transparent border  py-2 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("dev")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
          placeholder="e.g.. 9"
          id="dev"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-2 rounded-lg hover:bg-sky-500 duration-300"
      >
        {project ? "Confirm Update" : "Add Project"}
      </button>
      {error && <p className=" rounded-lg text-rose-500   ">*{error}</p>}
    </form>
  );
};

export default ProjectForm;
