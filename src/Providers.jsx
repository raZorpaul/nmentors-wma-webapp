import React from 'react';
import HeaderComponent from './components/Header with  Navigation/HeaderComponent.jsx';
import './Providers.scss';
import {useLocation} from "react-router-dom"; // Import your SCSS file for dynamic styling

const Providers = ({children}) => {
    const location = useLocation();

    // Define routes that should NOT have the header
    const noHeaderRoutes = ['/login'];

    // Check if the current route is in the noHeaderRoutes list
    const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);
    return (
        <div>
            {/*<Theme theme={theme}>*/}
            {/* HeaderComponent will always be rendered */}
            {shouldShowHeader && <HeaderComponent />}
            {/* Render the children (routes) below the header */}
            <main>{children}</main>
            {/*</Theme>*/}
        </div>
    );
};

export default Providers;
