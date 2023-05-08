import React, { Fragment, useEffect, useState } from "react";

import { Container, Navbar, Badge, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import moment from "moment";
import { toast } from "react-toastify";
const styles = {
  // position: "fixed",
  // top: "20%",
};

export default ({ children }) => {
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
      window.location = "/signin";
    } catch (error) {
      console.log("error signing out: ", error);
      toast.error("Not Logout");
    }
  };
  return (
    <Container className="" style={styles}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Aws/Amplify Auth</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {currentUser?.["custom:first_name"]}{" "}
              {currentUser?.["custom:last_name"]}{" "}
              <Button bg="warning" size="sm" onClick={logout}>
                Logout
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main">{children}</div>
    </Container>
  );
};
