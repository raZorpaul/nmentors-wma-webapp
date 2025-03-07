import React, { useState, useEffect } from "react";
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
import {useNavigate} from "react-router-dom";

const MentorApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(1);
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
  });

  const navigate = useNavigate();
  const [isStepValid, setIsStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 4;

  // Update highest step visited whenever current step changes
  useEffect(() => {
    if (currentStep > highestStepVisited) {
      setHighestStepVisited(currentStep);
    }
  }, [currentStep, highestStepVisited]);

  // After component mounts, add click handlers to progress steps
  useEffect(() => {
    // Add click event handlers to the step elements
    const setupClickHandlers = () => {
      const stepElements = document.querySelectorAll('.cds--progress-step');

      stepElements.forEach((element, index) => {
        // Only make steps clickable if they've been visited before
        if (index + 1 <= highestStepVisited) {
          element.style.cursor = 'pointer';

          // Remove existing listener if any to prevent duplicates
          const newElement = element.cloneNode(true);
          element.parentNode.replaceChild(newElement, element);

          newElement.addEventListener('click', () => {
            setCurrentStep(index + 1);
          });
        }
      });
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupClickHandlers();
    }, 100);

    return () => clearTimeout(timer);
  }, [highestStepVisited, currentStep]);

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

    try {
      const response = await mentorService.registerMentor(formData);
      console.log("Registration successful:", response);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
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
        // Remove or implement setFieldErrors if needed
      } else {
        setSubmitError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
  console.log("Current Step:", currentStep);
  console.log("Form Data:", formData);

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
        <ProgressStep
          label="Basic Info"
          complete={currentStep > 1}
        />
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
            <Button type="submit" disabled={isSubmitting || !isStepValid || submitSuccess}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MentorApplicationForm;