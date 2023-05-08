import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";

import { Auth } from "aws-amplify";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmSignup = ({ props }) => {
  const { state } = useLocation();
  useEffect(() => {
  }, [state?.user]);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleresendotp = async (e) => {
    e.preventDefault();
    await resendOtp(state?.user?.email);
    toast.success("New otp has been shared");
  };
  const handleValidateOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      return;
    }
    try {
      const data = await confirmOtp(state?.user?.email, otp);
      if (data === "SUCCESS") {
        toast.success("User Verify Successfully");
        navigate("/signin");
      } else {
        toast.success("Something wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect otp entered");
    }
  };

  const confirmOtp = async (Username, otp) =>
    await new Promise((resolve, reject) => {
      Auth.confirmSignUp(Username, otp)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  const resendOtp = async (Username) =>
    await new Promise((resolve, reject) => {
      Auth.resendSignUp(Username)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Header>
        <Card.Title>
          <center>Validate OTP</center>
        </Card.Title>
        <Card.Subtitle>
          <center> Please enter the 6 digit OTP sent to your email ID</center>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleValidateOtp}>
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

          <Row style={{ marginTop: 15 }}>
            <Col>
              <div className="d-grid gap-2 mt-10">
                <Button variant="primary" size="lg" type="submit">
                  Validate
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Card.Link href="#" onClick={handleresendotp}>
          Resend OTP
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};

export default ConfirmSignup;
