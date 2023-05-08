import { Container } from "react-bootstrap";

const styles = {
  // position: "fixed",
  // top: "20%",
};

export default ({ children }) => {
  return (
    <Container className="" style={styles}>
      {children}
    </Container>
  );
};
