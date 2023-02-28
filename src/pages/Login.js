import { useState } from "react";
import ProjectTitle from "../components/ProjectTitle";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    //login

    await login(email, password);
  };
  return (
    <form
      onSubmit={handleLogin}
      className="login-form flex flex-col gap-5 py-20  mx-auto max-w-sm "
    >
      <div className="text-center">
        <ProjectTitle ProjectTitle={"Login"} />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="email"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Enter Your Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="hello@react.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" bg-transparent border border-slate-500 py-3 px-5 outline-none rounded-xl focus:border-sky-400 duration-300"
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="password"
          className=" cursor-pointer hover:text-sky-400 duration-300 "
        >
          Enter Your Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" bg-transparent border border-slate-500 py-3 px-5 outline-none rounded-xl focus:border-sky-400 duration-300"
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-xl hover:bg-sky-600 duration-300 hover:text-slate-100 "
      >
        Log In
      </button>
      {error && <p className=" rounded-lg text-rose-500   ">*{error}</p>}
    </form>
  );
};

export default Login;
