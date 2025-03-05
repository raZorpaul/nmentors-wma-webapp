import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderComponent.scss'
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  SkipToContent,
} from '@carbon/react';

const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  return (
    <Header aria-label="WMA">
      <SkipToContent />
      <HeaderName href="/" prefix="WMA">
        World Mentors Association
      </HeaderName>
      <HeaderNavigation aria-label="WMA Platform Navigation">
        <HeaderMenu
          aria-label="Mentors"
          menuLinkName="Mentors"
        >
          <HeaderMenuItem
            href="#"
            onClick={() => handleMenuItemClick('/profile')}
          >
            Profile
          </HeaderMenuItem>
        </HeaderMenu>

      </HeaderNavigation>
    </Header>
  );
};

export default HeaderComponent;
