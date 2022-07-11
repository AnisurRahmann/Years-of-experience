import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Register from "./pages/Register";

import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Register />} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
