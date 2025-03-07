import React, { useState, useEffect } from "react";
import { TextInput } from "@carbon/react";

const LocationStep = ({ formData, onChange, onValidate, type }) => {
  const [errors, setErrors] = useState({
    city: "",
    state: "",
    district: "",
    ward: "",
    street: "",
  });

  const [touched, setTouched] = useState({
    city: false,
    state: false,
    district: false,
    ward: false,
    street: false,
  });

  const validateField = (name, value) => {
    return value.trim() === "" ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : "";
  };

  const validateStep = () => {
    const locationData = formData[type];
    const newErrors = {
      city: validateField("city", locationData.city),
      state: validateField("state", locationData.state),
      district: validateField("district", locationData.district),
      ward: validateField("ward", locationData.ward),
      street: validateField("street", locationData.street),
    };

    setErrors(newErrors);

    // Check if all fields are valid (no errors)
    const isValid = Object.values(newErrors).every((error) => error === "");
    onValidate(isValid); // Pass validation status to parent
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[type][name]),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(type, name, value);
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  // Revalidate the step whenever the form data changes
  useEffect(() => {
    validateStep();
  }, [formData]);

  return (
    <div className="form-step">
      <h3>{type === "location_of_residence" ? "Residence Location" : "Work Location"}</h3>

      <TextInput
        id={`${type}-city`}
        name="city"
        labelText="City"
        value={formData[type].city}
        onChange={handleInputChange}
        onBlur={() => handleBlur("city")}
        invalid={touched.city && !!errors.city}
        invalidText={errors.city}
        required
      />

      <TextInput
        id={`${type}-state`}
        name="state"
        labelText="State"
        value={formData[type].state}
        onChange={handleInputChange}
        onBlur={() => handleBlur("state")}
        invalid={touched.state && !!errors.state}
        invalidText={errors.state}
        required
      />

      <TextInput
        id={`${type}-district`}
        name="district"
        labelText="District"
        value={formData[type].district}
        onChange={handleInputChange}
        onBlur={() => handleBlur("district")}
        invalid={touched.district && !!errors.district}
        invalidText={errors.district}
        required
      />

      <TextInput
        id={`${type}-ward`}
        name="ward"
        labelText="Ward"
        value={formData[type].ward}
        onChange={handleInputChange}
        onBlur={() => handleBlur("ward")}
        invalid={touched.ward && !!errors.ward}
        invalidText={errors.ward}
        required
      />

      <TextInput
        id={`${type}-street`}
        name="street"
        labelText="Street"
        value={formData[type].street}
        onChange={handleInputChange}
        onBlur={() => handleBlur("street")}
        invalid={touched.street && !!errors.street}
        invalidText={errors.street}
        required
      />
    </div>
  );
};

export default LocationStep;
