import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    if (!user.email || !user.password) {
      toast.error("Fill Email and Password");
      return;
    }
    try {
      const response = await signInUser(user);
      console.log(response);
      if (response) {
        if (response?.preferredMFA === "NOMFA") {
          localStorage.setItem(
            "user",
            JSON.stringify(response?.signInUserSession)
          );
          toast.success("Sign in Successfully");
          navigate("/dashboard", { state: { user } });
        } else {
          navigate("/verify", { state: { user } });
        }
      } else {
        toast.error("Something wrong");
        navigate("/signin", { state: { user } });
      }
    } catch (error) {
      const err = JSON.stringify(error);
      toast.error(error.message);
      console.log(err, error.data);
    }
  };

  const signInUser = (payload) => {
    const { email, password } = payload;
    return new Promise((resolve, reject) => {
      Auth.signIn(email, password)
        .then((user) => {
          console.log("User signed in", user);
          resolve(user);
        })
        .catch((err) => {
          reject(err);
          console.log("Error signing in user", err);
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              placeholder="XXXXXXXX"
              onChange={handleInput}
            />
          </Form.Group>

          <Row style={{ marginTop: 15 }}>
            <Col>
              <div className="d-grid gap-2 mt-10">
                <Button variant="primary" size="lg" type="submit">
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Link to="/signup">Sign Up Here</Link>
        <Link to="/forgot-password">Forgot Password</Link>
      </Card.Footer>
    </Card>
  );
};

export default Signin;
