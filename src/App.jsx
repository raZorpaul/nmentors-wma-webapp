import './App.scss'
import Providers from "./Providers.jsx";
import {Theme} from "@carbon/react";
import {Route, Routes} from "react-router-dom";
import MentorProfile from "./pages/Profile/MentorProfile.jsx";
import {mentorData} from "./mentorData.js";
import {LogInPage} from "./pages/LogInPage/LogInPage.jsx";
import MentorApplicationForm from "./pages/RegisterPage/MentorSignUp.jsx";
import CreatePassword from "./pages/createPassword/CreatePassword.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import FeedNav from "./pages/FeedNav/FeedNav.jsx";
import TenderDetails from "./pages/TenderDetails/TenderDetails.jsx";
import CVUpload from "./components/Steps/uploadCV.jsx";
import CertificateUploader from "./components/Steps/certificateUploader.jsx";

function App() {

  return (
        <Providers>
            <Theme theme={'g10'}>
                <Routes>
                    <Route path="/" element={<LogInPage/>} />
                    <Route path="/profile" element={<MentorProfile initialData={mentorData}/>} />
                    <Route path="/register" element={<MentorApplicationForm/>} />
                    <Route path="/api/mentor/create-password" element={<CreatePassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/feed" element={<FeedNav />} />
                    <Route path="/tenders/:id" element={<TenderDetails />} />
                    <Route path="/certificate"element={<CertificateUploader/>} />

                    {/*<Route path="/upload" element={<CVUpload />} />*/}

                </Routes>
            </Theme>
        </Providers>
  )
}

export default App
