import "./LogInForm.scss";
import React, { useState } from "react";
import {
  FlexGrid,
  Column,
  Row,
  TextInput,
  Button,
  PasswordInput,
  Link,
} from "@carbon/react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom"; // Import login function

export const LogInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(formData);

      if (result.success) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500); // Optional: slight delay to show success message
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexGrid className="FlexGrid">
      <Row>
        <Column className="login-title">
          <h1>Log in to WMA</h1>
        </Column>
      </Row>
      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <TextInput
              id="email"
              labelText="Mentor Email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="text-input-15-style"
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <PasswordInput
              className="text-input-16-style"
              id="password"
              labelText="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="****"
              size="md"
            />
          </Column>
        </Row>
        <Row>
          <Column className="button-wrapper">
            <Button size="lg" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Column>
        </Row>
        {error && (
          <Row>
            <Column>
              <div className="error-message">{error}</div>
            </Column>
          </Row>
        )}
        {success && (
          <Row>
            <Column>
              <div className="success-message">Login successful!</div>
            </Column>
          </Row>
        )}
        {/* Add "Don't have an account?" section */}
        <Row>
          <Column className="create-account-link">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="register-link">
                Create an account →
              </Link>
            </p>
          </Column>
        </Row>
      </form>
    </FlexGrid>
  );
};
