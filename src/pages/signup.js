import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    phoneNumber: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termAndCondition: false,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, 909);
    if (user.password !== user.confirmPassword) {
      toast.error("Password not matched");
      return;
    }
    try {
      const response = await signUpUser(user);
      console.log(response);
      if (!user.userConfirmed) {
        navigate("/confirm-signup", { state: { user } });
      } else {
        navigate("/signin", { state: { user } });
      }
    } catch (error) {
      const err = JSON.stringify(error);
      toast.error(error.message);
      console.log(err, error.data);
    }
  };

  const signUpUser = (payload) => {
    return new Promise((resolve, reject) => {
      Auth.signUp({
        username: payload.email,
        password: payload.password,
        attributes: {
          email: payload.email,
          phone_number: `+${payload.phoneNumber}`, //   phone_number: '+1234567890',
          updated_at: new Date().getTime().toString(),
          "custom:first_name": payload.firstName,
          "custom:last_name": payload.lastName,
          "custom:role": "user",
        },
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log("Error signing up user", err);
          reject(err);
        });
    });
  };
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Header>
        <Card.Title>
          <center>Signup With Aws Amplify</center>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="6" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                placeholder="Satnam"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                placeholder="Singh"
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>

            <PhoneInput
              inputStyle={{
                width: "100%",
                paddingLeft: "50px",
                height: "40px",
              }}
              country="us"
              enableSearch
              onChange={(e) => {
                handleInput({ target: { name: "phoneNumber", value: e } });
              }}
              value={user.phoneNumber}
              autoFormat={false}
              name="phoneNumber"
              placeholder="Phone Number"
              inputProps={{
                name: "phoneNumber",
                required: true,
              }}
              countryCodeEditable={false}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              placeholder="exmple@exmple.com"
              onChange={handleInput}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                placeholder="XXXXXXXX"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                placeholder="XXXXXXXX"
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Row style={{ marginTop: 15 }}>
            <Col>
              <div className="d-grid gap-2 mt-10">
                <Button variant="primary" size="lg" type="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
      <Link to="/signin">Sign In Here</Link>
      </Card.Footer>
    </Card>
  );
};

export default Signup;
