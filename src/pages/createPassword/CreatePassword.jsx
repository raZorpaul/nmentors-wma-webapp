import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthService from "../../services/authService.js";
import mentorService from "../../services/mentorService.js";
import {
  Form,
  Stack,
  TextInput,
  Button,
  InlineLoading,
  InlineNotification,
  Grid,
  Column
} from "@carbon/react";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  // Validate the token with the backend when the component loads
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await AuthService.validateToken(token);
        console.log(response);
        if (response.success) {
          setIsTokenValid(true);
        } else {
          setError(response.message || "Invalid or expired token.");
        }
      } catch (err) {
        setError("An error occurred while validating the token.");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear previous errors
    setError("");
    setSuccessMessage("");
    console.log({token, password});

    // Send the password and token to the backend
    try {
      const response = await mentorService.createPassword({ token, password });
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage(response.message || "Password created successfully.");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setError(response.message || "Failed to create password.");
      }
    } catch (err) {
      setError("An error occurred while creating the password.");
    }
  };

  if (loading) {
    return (
      <Grid>
        <Column lg={4} md={4} sm={4} className="mx-auto mt-16">
          <InlineLoading
            description="Validating token..."
            status="active"
          />
        </Column>
      </Grid>
    );
  }

  if (!isTokenValid) {
    return (
      <Grid>
        <Column lg={4} md={4} sm={4} className="mx-auto mt-16">
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            lowContrast
          />
        </Column>
      </Grid>
    );
  }

  return (
    <Grid>
      <Column lg={4} md={4} sm={4} className="mx-auto mt-16">
        <h1 className="mb-6">Create Password</h1>

        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            lowContrast
            className="mb-4"
          />
        )}

        {successMessage && (
          <InlineNotification
            kind="success"
            title="Success"
            subtitle={successMessage}
            lowContrast
            className="mb-4"
          />
        )}

        <Form onSubmit={handleSubmit}>
          <Stack gap={6}>
            <TextInput
              id="password"
              type="password"
              labelText="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextInput
              id="confirmPassword"
              type="password"
              labelText="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </Stack>
        </Form>
      </Column>
    </Grid>
  );
}

export default CreatePassword;