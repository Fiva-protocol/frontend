// src/components/Market.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Market.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import ptIcon from '../assets/icons/ptIcon.svg';
import ytIcon from '../assets/icons/ytIcon.svg';
import './CommonButton.css';
import CommonButton from './CommonButton';



const Market = () => {
  const navigate = useNavigate();
  return (
    <div className="market">
      <div className="market-header">
        <img src={tsTonIcon} alt="tsTON" className="tsTon-icon" />
        <div className="market-title">
          <h2>tsTON</h2>
          <p>Tonstakers</p>
        </div>
      </div>
      <div className="market-details">
        <div className="market-info">
          <div>Maturity</div>
          <div className="info-value">27 Jun 2024</div>
          <div className="info-subvalue">15 days</div>
        </div>
        <div className="market-info">
          <div>Liquidity</div>
          <div className="info-value">$34,868,190.62</div>
        </div>
        <div className="market-info">
          <div>Underlying APY</div>
          <div className="info-value">2.448%</div>
          <div className="info-subvalue">Price $3,552.24</div>
        </div>
        <div className="market-info">
          <div>Implied APY</div>
          <div className="info-value">18.67%</div>
        </div>
      </div>
      <div className="market-subdetails">
        <div className="market-subdetail">
          <img src={ytIcon} alt="YT" className="subdetail-icon" />
          <div className="subdetail-info">
            <div>Long Yield APY</div>
            <div className="subdetail-value">-100%</div>
            <div className="subdetail-subvalue">Price $26.23</div>
          </div>
        </div>
        <div className="market-subdetail">
          <img src={ptIcon} alt="PT" className="subdetail-icon" />
          <div className="subdetail-info">
            <div>Fixed APY</div>
            <div className="subdetail-value">18.67%</div>
            <div className="subdetail-subvalue">Price $3,526.51</div>
          </div>
        </div>
      </div>
      <div className="action-button-container">
        <CommonButton onClick={() => navigate('/test-tokens')} text="Get test tokens" />
      </div>
    </div>
  );
};

export default Market;
