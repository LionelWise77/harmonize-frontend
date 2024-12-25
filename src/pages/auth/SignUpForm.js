import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setErrors({ password2: ["Passwords do not match"] });
      return;
    }

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(
        err.response?.data || { non_field_errors: ["An error occurred."] }
      );
    }
  };

  return (
    <Container className={styles.FormContainer}>
      <h1 className={styles.Header}>Sign Up</h1>

      <Form onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Group controlId="username">
          <Form.Control
            className={styles.Input}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.username?.map((msg, idx) => (
          <Alert key={idx} variant="warning">
            {msg}
          </Alert>
        ))}

        {/* Password */}
        <Form.Group controlId="password1">
          <Form.Control
            className={styles.Input}
            type="password"
            placeholder="Password"
            name="password1"
            value={password1}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.password1?.map((msg, idx) => (
          <Alert key={idx} variant="warning">
            {msg}
          </Alert>
        ))}

        {/* Confirm Password */}
        <Form.Group controlId="password2">
          <Form.Control
            className={styles.Input}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.password2?.map((msg, idx) => (
          <Alert key={idx} variant="warning">
            {msg}
          </Alert>
        ))}

        {/* Submit Button */}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Wide}`}
          type="submit"
        >
          Sign Up
        </Button>
        {errors.non_field_errors?.map((msg, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {msg}
          </Alert>
        ))}
      </Form>

      {/* Link to Sign In */}
      <div className="mt-3 text-center">
        <Link className={styles.Link} to="/signin">
          Already have an account? <span>Sign In</span>
        </Link>
      </div>
    </Container>
  );
};

export default SignUpForm;
