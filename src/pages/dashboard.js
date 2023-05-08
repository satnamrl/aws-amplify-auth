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
 
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user?.attributes);
    })();
  }, [Auth]);
  
  return (
    <Fragment>
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
                {moment(new Date(currentUser?.updated_at)).format("LLLL")}
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
