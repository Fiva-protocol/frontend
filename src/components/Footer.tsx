// src/components/Footer.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import converterIcon from '../assets/icons/convertorIcon.svg';
import marketIcon from '../assets/icons/marketIcon.svg';
import balanceIcon from '../assets/icons/balanceIcon.svg';
import poolsIcon from '../assets/icons/poolsIcon.svg';
import dashboardIcon from '../assets/icons/dashboardIcon.svg';

const Footer = () => {
  return (
    <footer className="footer">
<<<<<<< HEAD
      <NavLink to="/converter">
=======
      <NavLink to="/converter" activeClassName="active">
>>>>>>> 427676e77701ed2676dfc83c0ff9716c8050056b
        <img src={converterIcon} alt="Mint" />
        <span>Mint</span>
      </NavLink>
      <NavLink to="/swap">
        <img src={marketIcon} alt="Swap" />
        <span>Swap</span>
      </NavLink>
      <NavLink to="/market">
        <img src={balanceIcon} alt="Market" />
        <span>Market</span>
      </NavLink>
      <NavLink to="/pools">
        <img src={poolsIcon} alt="Pools" />
        <span>Pools</span>
      </NavLink>
      <NavLink to="/dashboard">
        <img src={dashboardIcon} alt="Dashboard" />
        <span>Dashboard</span>
      </NavLink>
    </footer>
  );
};

export default Footer;
