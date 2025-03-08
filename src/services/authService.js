const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  constructor() {
    this.API_URL = API_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Login a user
   * @param {Object} formData - The login form data (e.g., email and password)
   * @returns {Object} - The response object with success, token, and message
   */
  async login(formData) {
    try {
      console.log(`${this.API_URL}/auth/login`);
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(formData),
      });

      // Check if the response is OK before parsing JSON
      if (!response.ok) {
        return {
          success: false,
          message: `Request failed with status ${response.status}`,
          status: response.status,
        };
      }

      const data = await response.json();

      const isSuccessful =
          response.ok &&
          (data.success ||
              data.message?.toLowerCase().includes("successful") ||
              data.token);

      if (isSuccessful) {
        if (data.token) {
          sessionStorage.clear();
          sessionStorage.setItem("token", data.token);
        }

        return {
          success: true,
          token: data.token,
          message: data.message || "Login successful",
        };
      } else {
        return {
          success: false,
          message: data.message || "Login failed",
          status: response.status,
        };
      }
    } catch (err) {
      console.error("Error during login:", err);
      return {
        success: false,
        message: "Network error or unexpected issue occurred",
        error: err.message,
      };
    }
  }

  /**
   * Register a mentor
   * @param {Object} mentorData - The mentor registration data
   * @returns {Object} - The response data from the server
   */
  async registerMentor(mentorData) {
    try {
      console.log("API_URL:", this.API_URL);
      console.log("Sending registration data:", JSON.stringify(mentorData));
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(mentorData),
      });

      // Log the raw response for debugging
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        console.error("Error status:", response.status);
        console.error("Error response:", responseText);
        throw new Error(
            `Error ${response.status}: ${responseText || response.statusText}`
        );
      }

      // Parse the text response back to JSON
      const responseData = responseText ? JSON.parse(responseText) : {};
      return responseData;
    } catch (error) {
      console.error("Failed to register mentor:", error);
      throw error;
    }
  }

  /**
   * Validate a token
   * @param {string} token - The token to validate
   * @returns {Object} - The response object with success and message
   */
  async validateToken(token) {
    try {
      console.log(`${this.API_URL}/auth/validate-token`);
      const response = await fetch(`${this.API_URL}/auth/validate-token?token=${token}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.error || `Request failed with status ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message || "Token is valid",
      };
    } catch (err) {
      console.error("Error during token validation:", err);
      return {
        success: false,
        message: "Network error or unexpected issue occurred",
        error: err.message,
      };
    }
  }

/**
   * Validate the reset token
   * @param {string} token - The reset token
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async validateResetToken(token) {
    try {
      const response = await fetch(`${this.API_URL}/auth/validate-reset-token?token=${token}`, {
        method: "GET",
        headers: this.headers,
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message || "Token is valid." };
      } else {
        return { success: false, message: data.error || "Invalid or expired token." };
      }
    } catch (err) {
      console.error("Error validating reset token:", err);
      return { success: false, message: "An error occurred while validating the token." };
    }
  }

  /**
   * Reset the password
   * @param {string} token - The reset token
   * @param {string} password - The new password
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async resetPassword(token, password) {
    try {
      const response = await fetch(`${this.API_URL}/auth/reset-password`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message || "Password reset successfully." };
      } else {
        return { success: false, message: data.error || "Failed to reset password." };
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      return { success: false, message: "An error occurred while resetting the password." };
    }
  }

  /**
   * Forgot Password
   * @param {String} email - Mentor's email
   * @returns {Object} - The response object with success and message/error
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(`${this.API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({email}),
      });

      // Check if the response has a body
      let data = {};
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok) {
        return {success: true, message: data.message || "Password reset link sent successfully."};
      } else {
        return {success: false, error: data.error || "An error occurred. Please try again."};
      }
    } catch (err) {
      return {success: false, error: err.message || "An unexpected error occurred."};
    }
  }
}
export default new AuthService();
