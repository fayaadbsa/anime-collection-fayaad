import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { buttonClasses } from "@mui/material/Button";
// type Props = {
//   children?: React.ReactNode;
// };

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8E2B",
    },
    action: {
      disabledBackground: "main",
      disabled: "main",
    },
  },
  typography: {
    fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.disabled}`]: {
            opacity: 0.3,
          },
        },
      },
    },
  },
});

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <div
          css={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "80px 24px 40px 24px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
