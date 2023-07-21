import Typography from "@mui/material/Typography";

type PropsType = {
  error: string;
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
      <Typography variant="h5" color="primary">
        Something went wrong 😔
      </Typography>
      <Typography variant="body1" color="white">
        {error}
      </Typography>
    </div>
  );
};

export default Error;
