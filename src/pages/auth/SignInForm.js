import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/SignInUpForm.module.css";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      setCurrentUser(data.user);
      history.push("/tasks"); // Redirige a la página de tareas
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="d-flex justify-content-center">
        <div className={styles.FormContainer}>
          <h1 className={styles.Header}>Sign In</h1>
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

            <Form.Group controlId="password">
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {errors.password?.map((message, idx) => (
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
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          <p className={styles.Link}>
            Don't have an account? <a href="/signup">Sign up now!</a>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default SignInForm;
