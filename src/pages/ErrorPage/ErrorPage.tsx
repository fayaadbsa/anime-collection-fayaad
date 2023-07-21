import Error from "@/components/Error";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const ErrorPage = () => {
  return (
    <div css={{ textAlign: "center" }}>
      <Error error={"404 Page Not Found"} />
      <Link to="/">
        <Button variant="contained">Back to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
