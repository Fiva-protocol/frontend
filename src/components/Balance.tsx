// src/components/Balance.js
import React from 'react';
import './Balance.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import ptIcon from '../assets/icons/ptIcon.svg';
import ytIcon from '../assets/icons/ytIcon.svg';

const Balance = () => {
  return (
    <div className="balance">
      <div className="balance-header">
        <img src={tsTonIcon} alt="tsTON" className="tsTon-icon" />
        <div className="balance-title">
          <h2>tsTON</h2>
          <p>Tonstakers</p>
        </div>
      </div>
      <div className="balance-details">
        <div className="balance-info">
          <div>Maturity</div>
          <div className="info-value">27 Jun 2024</div>
          <div className="info-subvalue">15 days</div>
        </div>
        <div className="balance-info">
          <div>Liquidity</div>
          <div className="info-value">$34,868,190.62</div>
        </div>
        <div className="balance-info">
          <div>Underlying APY</div>
          <div className="info-value">2.448%</div>
          <div className="info-subvalue">Price $3,552.24</div>
        </div>
        <div className="balance-info">
          <div>Implied APY</div>
          <div className="info-value">18.67%</div>
        </div>
      </div>
      <div className="balance-subdetails">
        <div className="balance-subdetail">
          <img src={ytIcon} alt="YT" className="subdetail-icon" />
          <div className="subdetail-info">
            <div>Long Yield APY</div>
            <div className="subdetail-value">-100%</div>
            <div className="subdetail-subvalue">Price $26.23</div>
          </div>
        </div>
        <div className="balance-subdetail">
          <img src={ptIcon} alt="PT" className="subdetail-icon" />
          <div className="subdetail-info">
            <div>Fixed APY</div>
            <div className="subdetail-value">18.67%</div>
            <div className="subdetail-subvalue">Price $3,526.51</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
