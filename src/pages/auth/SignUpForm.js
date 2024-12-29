import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="d-flex justify-content-center">
        <div className={styles.FormContainer}>
          <h1 className={styles.Header}>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {errors.username?.map((message, idx) => (
                <Alert
                  key={idx}
                  variant="warning"
                  className={styles.ErrorMessage}
                >
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                className={styles.Input}
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email?.map((message, idx) => (
                <Alert
                  key={idx}
                  variant="warning"
                  className={styles.ErrorMessage}
                >
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="password1">
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
              {errors.password1?.map((message, idx) => (
                <Alert
                  key={idx}
                  variant="warning"
                  className={styles.ErrorMessage}
                >
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group controlId="password2">
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
              {errors.password2?.map((message, idx) => (
                <Alert
                  key={idx}
                  variant="warning"
                  className={styles.ErrorMessage}
                >
                  {message}
                </Alert>
              ))}
            </Form.Group>

            <Button className={styles.Button} type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          <p className={styles.Link}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpForm;
