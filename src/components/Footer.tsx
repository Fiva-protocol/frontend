// src/components/Footer.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import converterIcon from '../assets/icons/convertorIcon.svg';
import marketIcon from '../assets/icons/marketIcon.svg';
import balanceIcon from '../assets/icons/balanceIcon.svg';
import testTokenIcon from '../assets/icons/testToken.svg';
import dashboardIcon from '../assets/icons/dashboardIcon.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <NavLink to="/converter" activeClassName="active">
        <img src={converterIcon} alt="Converter" />
        <span>Converter</span>
      </NavLink>
      <NavLink to="/market" activeClassName="active">
        <img src={marketIcon} alt="Market" />
        <span>Market</span>
      </NavLink>
      <NavLink to="/balance" activeClassName="active">
        <img src={balanceIcon} alt="Balance" />
        <span>Balance</span>
      </NavLink>
      <NavLink to="/test-tokens" activeClassName="active">
        <img src={testTokenIcon} alt="Test Tokens" />
        <span>Test Tokens</span>
      </NavLink>
      <NavLink to="/dashboard" activeClassName="active">
        <img src={dashboardIcon} alt="Dashboard" />
        <span>Dashboard</span>
      </NavLink>
    </footer>
  );
};

export default Footer;
