import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Market.css';
import ytIcon from '../assets/icons/ytIcon.svg';
import ptIcon from '../assets/icons/ptIcon.svg';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import Mint from './Mint';


const Market: React.FC = () => {
  const address = useTonAddress();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="market">
      <div className="market-header">
        <div className="market-title">
          <h2>tsTON</h2>
          <p>Tonstakers</p>
        </div>
        <img src={tsTonIcon} alt="tsTON" className="tsTon-icon" />
      </div>
      <div className="market-details">
        <div className="market-info">
          <span>Maturity</span>
          <span className="info-value">27 Jun 2024</span>
        </div>
        <div className="market-info">
          <span>Liquidity</span>
          <span className="info-value">$34,868,190.62</span>
        </div>
        <div className="market-info">
          <span>Underlying APY</span>
          <span className="info-value">2.448%<span className="info-subvalue">Price $3,552.24</span></span>
        </div>
        <div className="market-info">
          <span>Implied APY</span>
          <span className="info-value">18.67%</span>
        </div>
      </div>
      <div className="market-subdetails" onClick={() => handleNavigation('/swap/yt')} style={{ cursor: 'pointer' }}>
        <div className="market-subdetail">
          <img src={ytIcon} alt="YT Icon" className="subdetail-icon" />
          <div className="subdetail-info">
            <span className="subdetail-value">Long Yield APY</span>
            <span className="subdetail-subvalue">Price $26.23</span>
          </div>
          <span className="subdetail-value">-100%</span>
        </div>
      </div>
      <div className="market-subdetails" onClick={() => handleNavigation('/swap/pt')} style={{ cursor: 'pointer', marginTop: '10px' }}>
        <div className="market-subdetail">
          <img src={ptIcon} alt="PT Icon" className="subdetail-icon" />
          <div className="subdetail-info">
            <span className="subdetail-value">Fixed APY</span>
            <span className="subdetail-subvalue">Price $3,526.51</span>
          </div>
          <span className="subdetail-value">18.67%</span>
        </div>
      </div>
      <div className="action-button-container">
        <Mint address={address}/>
      </div>
    </div>
  );
};

export default Market;
