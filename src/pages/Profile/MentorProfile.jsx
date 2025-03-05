// MentorProfile.jsx
import { useState } from "react";
import { StructuredListBody, StructuredListWrapper } from "@carbon/react";
import "./MentorProfile.scss";
import HeaderComponent from "../../components/Header with  Navigation/HeaderComponent.jsx";
import BasicInfoSection from "../../components/Sections/BasicInfoSection/BasicInfoSection.jsx";

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

            </StructuredListBody>
          </StructuredListWrapper>
        </main>
      </div>
    </div>
  );
};

export default MentorProfile;
