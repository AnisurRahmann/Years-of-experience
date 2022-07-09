import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Profile from "./pages/Profile";
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
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="edit-profile" element={<EditProfile />} />
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
