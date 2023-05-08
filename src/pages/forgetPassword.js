import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Fill Email");
      return;
    }
    try {
      const response = await sendForgaotPasswordCode(user);
      console.log(response);
      if (response?.CodeDeliveryDetails) {
        toast.success("Code Sent, Please check email");
        navigate("/reset-password", { state: user });
      }
    } catch (error) {
      const err = JSON.stringify(error);
      toast.error(error.message);
      console.log(err, error.data);
    }
  };

  const sendForgaotPasswordCode = (username) => {
    return new Promise((resolve, reject) => {
      Auth.forgotPassword(username)
        .then((user) => {
          console.log("Code Sent", user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
          console.log("Error Code Sent", err);
        });
    });
  };
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Header>
        <Card.Title>
          <center>Forgot Password</center>
        </Card.Title>
        <Card.Subtitle>
          Enter email and Send Code to Email for set New Password
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              placeholder="exmple@exmple.com"
              onChange={(e) => setUser(e?.target?.value)}
              required
            />
          </Form.Group>

          <Row style={{ marginTop: 15 }}>
            <Col>
              <div className="d-grid gap-2 mt-10">
                <Button variant="primary" size="lg" type="submit">
                  Send Code
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Link to="/signin">Sign In Here</Link>
        <Link to="#" onClick={handleSubmit}>
          Resend Code
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default ForgotPassword;
