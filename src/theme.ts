import { createTheme } from "@mui/material/styles";
import { buttonClasses } from "@mui/material/Button";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00dc5a",
    },
    info: {
      main: "#24262b",
    },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
    action: {
      disabledBackground: "main",
      disabled: "main",
    },
  },
  // typography: {
  //   fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,
  // },
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

export default theme;
