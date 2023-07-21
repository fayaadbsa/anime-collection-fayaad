import Error from "@/components/Error";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "@/components/Navigation/Navbar";

const ErrorPage = () => {
  return (
    <div css={{ textAlign: "center" }}>
      <Navbar />
      <div
        css={{
          paddingTop: "80px",
        }}
      >
        <Error error={"404 Page Not Found"} />
        <Link to="/">
          <Button variant="contained">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
