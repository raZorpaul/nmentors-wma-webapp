import './App.scss'
import Providers from "./Providers.jsx";
import {Theme} from "@carbon/react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MentorProfile from "./pages/Profile/MentorProfile.jsx";
import {mentorData} from "./mentorData.js";

function App() {

  return (
        <Providers>
            <Theme theme={'g10'}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<MentorProfile initialData={mentorData}/>} />
                </Routes>
            </Theme>
        </Providers>
  )
}

export default App
