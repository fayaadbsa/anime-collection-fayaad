import { createTheme } from "@mui/material/styles";
import { buttonClasses } from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00dc5a",
    },
    secondary: {
      main: "#A7A7A7",
    },
    info: {
      main: "#24262b",
    },
    action: {
      disabledBackground: "main",
      disabled: "main",
    },
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

export default theme;
