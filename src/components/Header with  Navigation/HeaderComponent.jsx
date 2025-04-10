import React from 'react';
import {useNavigate} from 'react-router-dom';
import './HeaderComponent.scss'
import {Header, HeaderMenuItem, HeaderName, HeaderNavigation, SkipToContent,} from '@carbon/react';

const HeaderComponent = () => {
    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        navigate(path);
    };

    return (
        <Header aria-label="WMA">
            <SkipToContent/>
            <HeaderName href="/" prefix="WMA">
                World Mentors Association
            </HeaderName>
            <HeaderNavigation aria-label="WMA Platform Navigation">
                <HeaderMenuItem
                    aria-label="Mentors"
                    menuLinkName="Mentors"
                    onClick={() => handleMenuItemClick('/profile')}
                >
                    Profile
                </HeaderMenuItem>

                <HeaderMenuItem
                    aria-label="Mentors"
                    menuLinkName="Mentors"
                    onClick={() => handleMenuItemClick('/feed')}
                >
                    Feed
                </HeaderMenuItem>
            </HeaderNavigation>
        </Header>
    );
};

export default HeaderComponent;
