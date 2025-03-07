import React, { useState, useEffect } from "react";
import { TextInput, ComboBox, MultiSelect } from "@carbon/react";
import { countries } from "./countries.jsx"; // Import your countries array

const BasicInfoStep = ({ formData, onChange, onValidate }) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    expertise: "",
    nida: "",
    passport_no: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    country: false,
    expertise: false,
    nida: false,
    passport_no: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        return !value
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";
      case "phone":
        return !value
          ? "Phone is required"
          : !/^\+?[\d\s-]{10,}$/.test(value)
          ? "Invalid phone number"
          : "";
      case "country":
        return !value ? "Country is required" : "";
      case "expertise":
        return value.length === 0 ? "Please select at least one expertise" : "";
      case "nida":
        return formData.country === "Tanzania" && !value
          ? "NIDA number is required"
          : "";
      case "passport_no":
        return formData.country !== "Tanzania" && !value
          ? "Passport number is required"
          : "";
      default:
        return "";
    }
  };

  const validateStep = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      country: validateField("country", formData.country),
      expertise: validateField("expertise", formData.expertise),
      nida: validateField("nida", formData.nida),
      passport_no: validateField("passport_no", formData.passport_no),
    };

    setErrors(newErrors);

    // Check if all fields are valid (no errors) and required fields are filled
    const isValid =
      Object.values(newErrors).every((error) => error === "") &&
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.country &&
      formData.expertise.length > 0 &&
      (formData.country === "Tanzania" ? formData.nida : formData.passport_no);

    onValidate(isValid); // Pass validation status to parent
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(e);
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleCountryChange = (selection) => {
    if (selection.selectedItem) {
      onChange({
        target: {
          name: "country",
          value: selection.selectedItem,
        },
      });
      if (touched.country) {
        setErrors((prev) => ({
          ...prev,
          country: validateField("country", selection.selectedItem),
        }));
      }
    }
  };

  const handleExpertiseChange = (e) => {
    const value = e.selectedItems;
    onChange({ target: { name: "expertise", value } });
    if (touched.expertise) {
      setErrors((prev) => ({
        ...prev,
        expertise: validateField("expertise", value),
      }));
    }
  };

  // Revalidate the step whenever the form data changes
  useEffect(() => {
    validateStep();
  }, [formData]);

  return (
    <div className="form-step">
      <TextInput
        id="name"
        name="name"
        labelText="Full Name"
        value={formData.name}
        onChange={handleInputChange}
        onBlur={() => handleBlur("name")}
        invalid={touched.name && !!errors.name}
        invalidText={errors.name}
        required
      />

      <TextInput
        id="email"
        name="email"
        labelText="Email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={() => handleBlur("email")}
        invalid={touched.email && !!errors.email}
        invalidText={errors.email}
        required
      />

      <TextInput
        id="phone"
        name="phone"
        labelText="Phone Number"
        value={formData.phone}
        onChange={handleInputChange}
        onBlur={() => handleBlur("phone")}
        invalid={touched.phone && !!errors.phone}
        invalidText={errors.phone}
        required
      />

      <ComboBox
        id="country"
        titleText="Country"
        items={countries()}
        itemToString={(item) => item || ""}
        placeholder="Choose country"
        selectedItem={formData.country || null}
        onChange={handleCountryChange}
        onBlur={() => handleBlur("country")}
        invalid={touched.country && !!errors.country}
        invalidText={errors.country}
        required
      />

      <MultiSelect
        id="expertise"
        titleText="Areas of Expertise"
        label="Select expertise"
        items={[
          "Software Development",
          "Data Science",
          "Project Management",
          "Business Analysis",
          "UI/UX Design",
        ]}
        selectedItems={formData.expertise}
        onChange={handleExpertiseChange}
        onBlur={() => handleBlur("expertise")}
        invalid={touched.expertise && !!errors.expertise}
        invalidText={errors.expertise}
        required
      />

      {formData.country === "Tanzania" ? (
        <TextInput
          id="nida"
          name="nida"
          labelText="NIDA Number"
          value={formData.nida}
          onChange={handleInputChange}
          onBlur={() => handleBlur("nida")}
          invalid={touched.nida && !!errors.nida}
          invalidText={errors.nida}
          required
        />
      ) : (
        <TextInput
          id="passport_no"
          name="passport_no"
          labelText="Passport Number"
          value={formData.passport_no}
          onChange={handleInputChange}
          onBlur={() => handleBlur("passport_no")}
          invalid={touched.passport_no && !!errors.passport_no}
          invalidText={errors.passport_no}
          required
        />
      )}
    </div>
  );
};

export default BasicInfoStep;
