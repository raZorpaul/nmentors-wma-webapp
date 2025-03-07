import React from 'react';
import HeaderComponent from './components/Header with  Navigation/HeaderComponent.jsx';
import './Providers.scss';
import {useLocation} from "react-router-dom"; // Import your SCSS file for dynamic styling

const Providers = ({children}) => {
    const location = useLocation();

    // Define routes that should NOT have the header
    const noHeaderRoutes = ['/login', '/', '/register'];

    // Check if the current route is in the noHeaderRoutes list
    const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);
    return (
        <div>
            {shouldShowHeader && <HeaderComponent />}
            <main>{children}</main>
        </div>
    );
};

export default Providers;
