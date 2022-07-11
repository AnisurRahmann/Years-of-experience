import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FunctionComponent = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
