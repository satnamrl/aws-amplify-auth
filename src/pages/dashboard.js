import { Auth } from "aws-amplify";
import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Container,
  Navbar,
  Row,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user, 90);
      setCurrentUser(user?.attributes);
    })();
  }, [Auth]);
  const logout = async () => {
    try {
      await Auth.signOut();
      toast.success("Logout");
      navigate("/signin");
    } catch (error) {
      console.log("error signing out: ", error);
      toast.error("Not Logout");
    }
  };
  return (
    <Fragment>
      <Container>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Aws/Amplify Auth</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {currentUser?.["custom:first_name"]}{" "}
                {currentUser?.["custom:last_name"]}{" "}
                <Badge bg="warning" text="dark" onClick={logout}>
                  Logout
                </Badge>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                {currentUser?.["custom:first_name"]}{" "}
                {currentUser?.["custom:last_name"]}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                #{currentUser?.sub}
              </Card.Subtitle>
              <Card.Text>
                <p>{currentUser?.email}</p>
                <p>{currentUser?.phone_number}</p>
              </Card.Text>
              <Card.Link href="#">
                {moment(currentUser?.updated_at).format("LLLL")}
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
