import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  SelectItem,
  FormGroup,
  FormLabel,
} from "@carbon/react";

import { countryCodes } from "../../../utils/updatedCountryCodes.js";

const BasicInfoStep = ({ formData, onChange, onValidate }) => {
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    country: false,
    nida: false,
    passport_no: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
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
      case "country":
        return value.trim() === "" ? "Country is required" : "";
      case "nida":
        return value.trim() === "" ? "NIDA is required" : "";
      case "passport_no":
        return value.trim() === "" ? "Passport number is required" : "";
      default:
        return "";
    }
  };

  const validateStep = () => {
    const newErrors = {
      name: touched.name ? validateField("name", formData.name) : "",
      phone: touched.phone ? validateField("phone", formData.phone) : "",
      email: touched.email ? validateField("email", formData.email) : "",
      country: touched.country ? validateField("country", formData.country) : "",
      nida: touched.nida ? validateField("nida", formData.nida) : "",
      passport_no: touched.passport_no
        ? validateField("passport_no", formData.passport_no)
        : "",
    };

    setErrors(newErrors);

    // Check if the step is valid (no errors)
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
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name,
        value,
      },
    });

    // If the field has already been touched, validate it immediately
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    onChange({
      target: {
        name: "country",
        value: selectedCountry,
      },
    });

    // Automatically update the country code based on the selected country
    const countryCode = countryCodes.find(
      (country) => country.name === selectedCountry
    )?.phone;

    if (countryCode) {
      onChange({
        target: {
          name: "phone",
          value: `${countryCode}${formData.phone.replace(/^\+\d+/, "")}`,
        },
      });
    }
  };

  useEffect(() => {
    validateStep();
  }, [formData, touched]);

  return (
    <div className="basic-info-step">
      <h2>Basic Information</h2>

      <FormGroup legendText="">
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
      </FormGroup>

      <FormGroup legendText="">
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
      </FormGroup>

      <FormGroup legendText="">
        <FormLabel>Country</FormLabel>
        <Select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          onBlur={() => handleBlur("country")}
          invalid={touched.country && !!errors.country}
          required
        >
          <SelectItem value="" text="Select a country" />
          {countryCodes.map((countryOption) => (
            <SelectItem
              key={countryOption.code}
              value={countryOption.name}
              text={countryOption.name}
            />
          ))}
        </Select>
      </FormGroup>

      <FormGroup legendText="">
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
      </FormGroup>

      {formData.country === "Tanzania, United Republic of" ? (
        <FormGroup legendText="">
          <TextInput
            id="nida"
            name="nida"
            labelText="NIDA"
            value={formData.nida}
            onChange={handleInputChange}
            onBlur={() => handleBlur("nida")}
            invalid={touched.nida && !!errors.nida}
            invalidText={errors.nida}
            required
          />
        </FormGroup>
      ) : (
        <FormGroup legendText="">
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
        </FormGroup>
      )}
    </div>
  );
};

export default BasicInfoStep;
