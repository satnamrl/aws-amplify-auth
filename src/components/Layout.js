import { Container } from "react-bootstrap";

const styles = {
  position: "fixed",
  top: "20%",
};

export default ({ children }) => {
  return (
    <Container className="d-flex justify-content-center" style={styles}>
      {children}
    </Container>
  );
};
