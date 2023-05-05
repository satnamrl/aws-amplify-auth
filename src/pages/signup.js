import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    phoneNumber: "",
    lastName: "",
    emailId: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, 909);
    if (user.password !== user.confirmPassword) {
      toast.error("Password not matched");
    }
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

          <Form.Group className="mb-3" controlId="emailId">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="emailId"
              value={user.emailId}
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
          <Row style={{marginTop:15}}>
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
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Footer>
    </Card>
  );
};

export default Signup;
