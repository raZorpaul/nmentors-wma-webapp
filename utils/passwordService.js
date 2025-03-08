export const validatePassword = (password) => {
  const errors = [];

  // Check length
  if (password.length < 12 || password.length > 63) {
    errors.push("Password must be between 12 and 63 characters.");
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }

  // Check for double-byte characters (e.g., non-ASCII characters)
  if (/[\u0100-\uFFFF]/.test(password)) {
    errors.push("Password must not contain double-byte characters.");
  }

  // Return errors if any
  return errors;
};
