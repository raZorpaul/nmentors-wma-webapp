import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthService from "../../services/authService.js";
import mentorService from "../../services/mentorService.js";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false); // Track token validity
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // Get the token from the query string

  // Validate the token with the backend when the component loads
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await AuthService.validateToken(token);
        console.log(response);
        if (response.success) {
          setIsTokenValid(true); // Token is valid
        } else {
          setError(response.message || "Invalid or expired token.");
        }
      } catch (err) {
        setError("An error occurred while validating the token.");
      } finally {
        setLoading(false); // Stop loading
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
      if (response.success) {
        setSuccessMessage(response.message || "Password created successfully.");
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirect to dashboard after success
        }, 2000);
      } else {
        setError(response.message || "Failed to create password.");
      }
    } catch (err) {
      setError("An error occurred while creating the password.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while validating the token
  }

  if (!isTokenValid) {
    return <p style={{ color: "red" }}>{error}</p>; // Show an error message if the token is invalid
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePassword;
