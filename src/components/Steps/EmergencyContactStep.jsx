import React, { useState, useEffect } from "react";
import { TextInput } from "@carbon/react";

const EmergencyContactStep = ({ formData, onChange, onValidate }) => {
  const [errors, setErrors] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    relationship: false,
    phone: false,
    email: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "relationship":
        return value.trim() === "" ? "Relationship is required" : "";
      case "phone":
        return !value
          ? "Phone is required"
          : !/^\+?[\d\s-]{10,}$/.test(value)
          ? "Invalid phone number"
          : "";
      case "email":
        return !value
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";
      default:
        return "";
    }
  };

  const validateStep = () => {
    const newErrors = {
      name: validateField("name", formData.emergencyContact.name),
      relationship: validateField(
        "relationship",
        formData.emergencyContact.relationship
      ),
      phone: validateField("phone", formData.emergencyContact.phone),
      email: validateField("email", formData.emergencyContact.email),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    onValidate(isValid);
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData.emergencyContact[name]),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange("emergencyContact", name, value);
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  useEffect(() => {
    validateStep();
  }, [formData]);

  return (
    <div className="form-step">
      <h3>Emergency Contact</h3>

      <TextInput
        id="emergency-name"
        name="name"
        labelText="Full Name"
        value={formData.emergencyContact.name}
        onChange={handleInputChange}
        onBlur={() => handleBlur("name")}
        invalid={touched.name && !!errors.name}
        invalidText={errors.name}
        required
      />

      <TextInput
        id="emergency-relationship"
        name="relationship"
        labelText="Relationship"
        value={formData.emergencyContact.relationship}
        onChange={handleInputChange}
        onBlur={() => handleBlur("relationship")}
        invalid={touched.relationship && !!errors.relationship}
        invalidText={errors.relationship}
        required
      />

      <TextInput
        id="emergency-phone"
        name="phone"
        labelText="Phone Number"
        value={formData.emergencyContact.phone}
        onChange={handleInputChange}
        onBlur={() => handleBlur("phone")}
        invalid={touched.phone && !!errors.phone}
        invalidText={errors.phone}
        required
      />

      <TextInput
        id="emergency-email"
        name="email"
        labelText="Email"
        type="email"
        value={formData.emergencyContact.email}
        onChange={handleInputChange}
        onBlur={() => handleBlur("email")}
        invalid={touched.email && !!errors.email}
        invalidText={errors.email}
        required
      />
    </div>
  );
};

export default EmergencyContactStep;
