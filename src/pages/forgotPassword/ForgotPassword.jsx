import { useState } from "react";
import AuthService from "../../services/authService.js"

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoading(true);
    const result = await AuthService.forgotPassword(email); // Call the service function

    if (result.success) {
      setMessage(result.message);
      setError("");
    } else {
      setError(result.error);
      setMessage("");
    }

      setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
            <button type="submit" disabled={loading}> {/* Disable button while loading */}
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}

export default ForgotPassword;