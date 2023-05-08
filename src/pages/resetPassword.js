import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";

import { Auth } from "aws-amplify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [new_password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Fill OTP");
      return;
    }
    if (!new_password) {
      toast.error("Fill Password");
      return;
    }
    try {
      const response = await sendForgaotPasswordCode({
        otp,
        new_password,
        username: state,
      });

      if (response) {
        toast.success("Code Sent, Please check email");
        navigate("/signin");
      }
    } catch (error) {
      const err = JSON.stringify(error);
      toast.error(error.message);
      console.log(err, error.data);
    }
  };

  const sendForgaotPasswordCode = (user) => {
    const { username, otp, new_password } = user;
    return new Promise((resolve, reject) => {
      Auth.forgotPasswordSubmit(username, otp, new_password)
        .then((user) => {
          console.log("Password reset Done", user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
          console.log("Error Password reset fail", err);
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
          <Row>
            <Col>
              <OtpInput
                containerStyle="otp-input"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  padding: 10,
                  border: "1px solid #828A9C",
                  borderRadius: 3,
                  width: 40,
                  height: 55,
                }}
              />
            </Col>
          </Row>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={new_password}
              placeholder="XXXXXXXX"
              onChange={(e) => setPassword(e?.target?.value)}
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

export default ResetPassword;
