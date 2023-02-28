import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App bg-slate-900 text-slate-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
