import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    InlineNotification,
    ProgressIndicator,
    ProgressStep,
} from "@carbon/react";

import "./MentorSignUp.scss";
import BasicInfoStep from "../../components/Steps/BasicInfoStep.jsx";
import LocationStep from "../../components/Steps/LocationStep.jsx";
import EmergencyContactStep from "../../components/Steps/EmergencyContactStep.jsx";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService.js";
import CVUpload from "../../components/Steps/uploadCV.jsx";
import CertificateUploader from "../../components/Steps/certificateUploader.jsx";

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
        certificate_files: [],
        cv_key: "",
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

    const totalSteps = 6; // Updated to include the certificates step

    // Update highest step visited whenever current step changes
    useEffect(() => {
        if (currentStep > highestStepVisited) {
            setHighestStepVisited(currentStep);
        }
    }, [currentStep, highestStepVisited]);

    // Centralized validation logic
    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.name && formData.email && formData.phone;
            case 4: {
                const { name, relationship, phone, email } = formData.emergencyContact;
                return name && relationship && phone && email;
            }
            case 5:
                return !!formData.cv_key; // Ensure CV is uploaded
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
            const response = await authService.registerMentor(formData);
            console.log("Registration successful:", response);
            setSubmitSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (error) {
            console.error("Registration failed:", error);

            if (error.response && error.response.status === 400) {
                const { message } = error.response.data;
                setSubmitError(message);
            } else {
                setSubmitError(error.message || "Registration failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // CV Upload Success Handler
    const handleUploadSuccess = (cv_key) => {
        setFormData((prev) => ({
            ...prev,
            cv_key: cv_key, // Update the cv_key in formData
        }));
    };

    // Certificate Upload Success Handler
    const handleCertificateSuccess = (uploadedCertificates) => {
        setFormData((prev) => ({
            ...prev,
            certificate_files: uploadedCertificates, // Update the certificates in formData
        }));
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
            case 5:
                return <CVUpload onUploadSuccess={handleUploadSuccess} />;
            case 6:
                return (
                    <CertificateUploader
                        onUploadSuccess={handleCertificateSuccess}
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
                <ProgressStep
                    label="Upload CV"
                    complete={currentStep > 5}
                    current={currentStep === 5}
                />
                <ProgressStep
                    label="Upload Certificates"
                    complete={currentStep > 6}
                    current={currentStep === 6}
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
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isStepValid || submitSuccess}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default MentorApplicationForm;
