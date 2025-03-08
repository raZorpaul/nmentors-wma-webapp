import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AuthService from "../../services/authService"; // Import the AuthService

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false); // Track token validity
  const [loading, setLoading] = useState(false); // Track loading state
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // Get the token from the query string

  // Validate the token with the backend when the component loads
  useEffect(() => {
    const validateToken = async () => {
      const response = await AuthService.validateResetToken(token);

      if (response.success) {
        setIsTokenValid(true); // Token is valid
      } else {
        setError(response.message);
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

      setLoading(true);

    // Send the password and token to the backend
    const response = await AuthService.resetPassword(token, password);

    if (response.success) {
      setSuccessMessage(response.message);
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page after success
      }, 2000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while validating the token
  }

  if (!isTokenValid) {
    return <p style={{ color: "red" }}>{error}</p>; // Show an error message if the token is invalid
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <div>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}> {/* Disable button while loading */}
        {loading ? "Resetting Password..." : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPassword;
