// MentorProfile.jsx
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import mentorService from "../../services/mentorService.js";
import BasicInfoSection from "../../components/Sections/BasicInfoSection/BasicInfoSection.jsx";
import {mentorData} from "../../mentorData.js";
import {StructuredListBody, StructuredListWrapper} from "@carbon/react";
import HeaderComponent from "../../components/Header with  Navigation/HeaderComponent.jsx";
import './MentorProfile.scss'
import LocationSection from "../../components/Sections/LocationSection.jsx";

const MentorProfile = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        nida: "",
        expertise: [],
        location_of_work: "",
        location_of_residence: "",
        passport_no: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const data = await mentorService.getMentorProfile();
            setProfileData(data);
            setError(null);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError(error.message);
            toast.error("Could not load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (updateData) => {
        try {
            setLoading(true);
            const updatedProfile = await mentorService.updateMentorProfile(updateData);
            setProfileData(updatedProfile);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profileData.name) {
        return <div>Loading profile data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mentor-profile-container">
            <HeaderComponent/>
            <div className="mentor-profile-content">
                {/*<aside className="sidebar">*/}
                {/*  <ProfileSidebar />*/}
                {/*</aside>*/}
                <main className="main-content">
                    {/*<h2 className="profile-section-title">Basic Information</h2>*/}
                    <StructuredListWrapper>
                        <StructuredListBody>
                            <BasicInfoSection
                                data={profileData}
                                onUpdate={handleProfileUpdate}
                            />
                            <LocationSection
                                title={"Location of Work"}
                                data={profileData.location_of_work}
                                onUpdate={handleProfileUpdate}
                            />

                            <LocationSection
                                title={"Location of Residence"}
                                data={profileData.location_of_residence}
                                onUpdate={handleProfileUpdate}
                            />

                            {/* Add other profile sections here */}
                        </StructuredListBody>
                    </StructuredListWrapper>
                </main>
            </div>
        </div>
    );
};

export default MentorProfile;