import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Box from "@mui/material/Box";

const AppLayout = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: { xs: "80px 24px 40px 24px", sm: "80px 64px 40px 64px" },
          height: "60vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
