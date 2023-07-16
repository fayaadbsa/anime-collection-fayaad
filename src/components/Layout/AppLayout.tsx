type Props = {
  // children: string | JSX.Element | JSX.Element[] | () => JSX.Element
};

const AppLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default AppLayout;
