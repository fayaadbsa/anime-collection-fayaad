import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

type PropsType = {
  error?: string;
};

const Error = ({ error }: PropsType) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom variant="h5" color="primary">
        Something went wrong 😔
      </Typography>
      {error && (
        <Typography gutterBottom variant="body1" color="white">
          {error}
        </Typography>
      )}
      <Link to="/">
        <Button variant="contained">Back to Home</Button>
      </Link>
    </div>
  );
};

export default Error;
