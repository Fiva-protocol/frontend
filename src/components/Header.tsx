import React from 'react';
import './Header.css';
import logo from '../assets/icons/fivaLogo.svg';
import { TonConnectButton } from '@tonconnect/ui-react';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <TonConnectButton />
    </header>
  );
};

export default Header;
