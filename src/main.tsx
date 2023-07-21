import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { client } from "./graphql/client.ts";
import App from "./App.tsx";
import theme from "./theme.ts";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
