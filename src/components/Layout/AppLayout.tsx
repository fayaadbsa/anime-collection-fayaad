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
          padding: "80px 24px 40px 24px",
          height: "80vh",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
