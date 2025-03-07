import './App.scss'
import Providers from "./Providers.jsx";
import {Theme} from "@carbon/react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MentorProfile from "./pages/Profile/MentorProfile.jsx";
import {mentorData} from "./mentorData.js";
import {LogInPage} from "./pages/LogInPage/LogInPage.jsx";
import MentorApplicationForm from "./pages/RegisterPage/MentorSignUp.jsx";

function App() {

  return (
        <Providers>
            <Theme theme={'g10'}>
                <Routes>
                    <Route path="/" element={<LogInPage/>} />
                    <Route path="/profile" element={<MentorProfile initialData={mentorData}/>} />
                    <Route path="/register" element={<MentorApplicationForm/>} />
                </Routes>
            </Theme>
        </Providers>
  )
}

export default App
