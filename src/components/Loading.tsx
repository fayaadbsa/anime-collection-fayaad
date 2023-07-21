import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
