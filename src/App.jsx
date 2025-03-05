import './App.scss'
import Providers from "./Providers.jsx";
import {Theme} from "@carbon/react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";

function App() {

  return (
        <Providers>
            <Theme theme={'g10'}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Theme>
        </Providers>
  )
}

export default App
