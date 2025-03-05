// MentorProfile.jsx
import { useState } from "react";
import { StructuredListBody, StructuredListWrapper } from "@carbon/react";
import "./MentorProfile.scss";
import HeaderComponent from "../Header with Navigation/HeaderComponent.jsx";

const MentorProfile = ({ initialData }) => {
  const [mentorData, setMentorData] = useState(initialData);

  const handleUpdateSection = (section, newData) => {
    setMentorData((prev) => ({
      ...prev,
      [section]: newData,
    }));
  };

  return (
    <div className="mentor-profile-container">
      <HeaderComponent />
      <div className="mentor-profile-content">
        {/*<aside className="sidebar">*/}
        {/*  <ProfileSidebar />*/}
        {/*</aside>*/}
        <main className="main-content">
          {/*<h2 className="profile-section-title">Basic Information</h2>*/}
          <StructuredListWrapper>
            <StructuredListBody>
              <BasicInfoSection
                data={mentorData.basicInfo}
                onUpdate={(newData) => handleUpdateSection("basicInfo", newData)}
              />

              <LocationSection
                data={mentorData.locationOfResidence}
                title="Location Of Residence"
                onUpdate={(newData) => handleUpdateSection("location", newData)}
                />

              <LocationSection
                data={mentorData.locationOfWork}
                title="Location Of Work"
                onUpdate={(newData) => handleUpdateSection("location", newData)}
                />

              <CertificationsSection
                data={mentorData.certifications}
                title="Certifications"
                onUpdate={(newData) => handleUpdateSection("certifications", newData)}
                />

              <HobbiesSection
                data={mentorData.hobbies}
                title="Hobbies"
                onUpdate={(newData) => handleUpdateSection("hobbies", newData)}
                />

              <EmergencyContactSection
                data={mentorData.emergencyContact}
                title="Emergency Contact"
                onUpdate={(newData) => handleUpdateSection("emergencyContact", newData)}
                />
            </StructuredListBody>
          </StructuredListWrapper>
        </main>
      </div>
    </div>
  );
};

export default MentorProfile;
