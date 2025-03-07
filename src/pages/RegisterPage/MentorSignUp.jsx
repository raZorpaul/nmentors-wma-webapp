import React, { useState } from "react";
import {
  Form,
  Button,
  ProgressIndicator,
  ProgressStep,
  InlineNotification,
} from "@carbon/react";

import "./MentorSignUp.scss";
import BasicInfoStep from "../../components/Steps/BasicInfoStep.jsx";
import LocationStep from "../../components/Steps/LocationStep.jsx";
import EmergencyContactStep from "../../components/Steps/EmergencyContactStep.jsx";
import mentorService from "../../services/mentorService";

const MentorApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    expertise: [],
    cv_url: "",
    nida: "",
    passport_no: "",

    // Location of Residence
    location_of_residence: {
      city: "",
      state: "",
      district: "",
      ward: "",
      street: "",
    },

    // Location of Work
    location_of_work: {
      city: "",
      state: "",
      district: "",
      ward: "",
      street: "",
    },

    // Emergency Contact
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },

    // Education
    education: [
      {
        level: "",
        institution: "",
        location: "",
        start_year: "",
        end_year: "",
        degree: "",
        certifications: [],
      },
    ],

    // Hobbies
    hobbies: [],

    // Certifications
    certifications: [
      {
        type: "",
        certification_number: "",
        issued_by: "",
        issue_date: "",
        expiry_date: "",
        proof_url: "",
      },
    ],
  });

  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 4;

  // Centralized validation logic
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 4:
        const { name, relationship, phone, email } = formData.emergencyContact;
        return name && relationship && phone && email;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setIsStepValid(true);
      setCurrentStep(currentStep + 1);
    } else {
      setIsStepValid(false);
    }
  };

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  // Create a copy of formData and remove empty fields
  const payload = { ...formData };

  // Remove empty education and certifications
  if (payload.education.length === 0) {
    delete payload.education;
  }
  if (payload.certifications.length === 0) {
    delete payload.certifications;
  }

  try {
    const response = await mentorService.registerMentor(payload);
    console.log("Registration successful:", response);
    setSubmitSuccess(true);
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.response && error.response.status === 400) {
      const { message, errors } = error.response.data;

      // Handle validation errors
      const fieldErrors = {};
      errors.forEach((err) => {
        const match = err.match(/Path `(.+?)` is required/);
        if (match) {
          const fieldName = match[1];
          fieldErrors[fieldName] = err;
        }
      });

      setSubmitError(message);
      setFieldErrors(fieldErrors);
    } else {
      setSubmitError(error.message || "Registration failed. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            onValidate={setIsStepValid}
          />
        );
              case 2:
        return (
          <LocationStep
            formData={formData}
            onChange={handleInputChange}
            onValidate={setIsStepValid}
            type="location_of_residence"
          />
        );
      case 3:
        return (
          <LocationStep
            formData={formData}
            onChange={handleInputChange}
            onValidate={setIsStepValid}
            type="location_of_work"
          />
        );
      case 4:
        return (
          <EmergencyContactStep
            formData={formData}
            onChange={handleInputChange}
            onValidate={setIsStepValid}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mentor-application">
      <h1>Mentor Application Form</h1>

      <ProgressIndicator currentIndex={currentStep - 1} spaceEqually>
        <ProgressStep label="Basic Info" complete={currentStep > 1} />
        <ProgressStep
          label="Residence Location"
          complete={currentStep > 2}
          current={currentStep === 2}
        />
        <ProgressStep
          label="Work Location"
          complete={currentStep > 3}
          current={currentStep === 3}
        />
        <ProgressStep
          label="Emergency Contact"
          complete={currentStep > 4}
          current={currentStep === 4}
        />
      </ProgressIndicator>

      {submitError && (
        <InlineNotification
          kind="error"
          title="Error"
          subtitle={submitError}
          hideCloseButton={false}
          onCloseButtonClick={() => setSubmitError(null)}
        />
      )}

      {submitSuccess && (
        <InlineNotification
          kind="success"
          title="Success"
          subtitle="Your application has been submitted successfully. It is now pending approval."
          hideCloseButton={false}
          onCloseButtonClick={() => setSubmitSuccess(false)}
        />
      )}

      <Form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="button-container">
          {currentStep > 1 && (
            <Button
              kind="secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < totalSteps && (
            <Button onClick={handleNextStep} disabled={!isStepValid}>
              Next
            </Button>
          )}
          {currentStep === totalSteps && (
            <Button type="submit" disabled={isSubmitting || !isStepValid}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MentorApplicationForm;
