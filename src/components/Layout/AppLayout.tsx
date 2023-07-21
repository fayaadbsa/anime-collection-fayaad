import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div
        css={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 64px 40px 64px",
          height: "80vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
