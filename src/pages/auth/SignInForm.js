import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const setCurrentUser = useSetCurrentUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("api/tasks");
    } catch (err) {
      setErrors(
        err.response?.data || { non_field_errors: ["Invalid credentials."] }
      );
    }
  };

  return (
    <Container className={styles.FormContainer}>
      <h1 className={styles.Header}>Sign In</h1>

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
        <Form.Group controlId="password">
          <Form.Control
            className={styles.Input}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.password?.map((msg, idx) => (
          <Alert key={idx} variant="warning">
            {msg}
          </Alert>
        ))}

        {/* Submit Button */}
        <Button
          className={`${btnStyles.Button} ${btnStyles.Wide}`}
          type="submit"
        >
          Sign In
        </Button>
        {errors.non_field_errors?.map((msg, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {msg}
          </Alert>
        ))}
      </Form>

      {/* Link to Sign Up */}
      <div className="mt-3 text-center">
        <Link className={styles.Link} to="/signup">
          Don't have an account? <span>Sign Up</span>
        </Link>
      </div>
    </Container>
  );
};

export default SignInForm;
