import React, { useState } from 'react';
import './Swap.css';
import CommonButton from './CommonButton';
import downArrow from '../assets/icons/downArrow.svg';

const SwapPage = () => {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="swap-page">
      <div className="swap-content">
        <div className="swap-section">
            <div>
            <h1>Swap</h1>
            <p>Swap your tokens here.</p>
            <br></br>
            </div>
          <div className="swap-buttons">
            <button
              className={`swap-button ${activeTab === 'buy' ? 'active' : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy YT
            </button>
            <button
              className={`swap-button ${activeTab === 'sell' ? 'active' : ''}`}
              onClick={() => setActiveTab('sell')}
            >
              Sell YT
            </button>
          </div>
          <div className="input-group">
            <div className="input-row">
              <select className="input-select">
                <option>Token 1</option>
              </select>
              <input type="number" className="input-number" placeholder="Amount" />
            </div>
            <div className="swap-icon">
              <img src={downArrow} alt="Swap" />
            </div>
            <div className="input-row">
              <select className="input-select">
                <option>Token 1</option>
              </select>
              <input type="number" className="input-number" placeholder="Amount" />
            </div>
          </div>
        </div>
        <div className="action-button-container">
          <CommonButton
            onClick={() => console.log(`${activeTab === 'buy' ? 'Buy' : 'Sell'} YT clicked`)}
            text={activeTab === 'buy' ? 'Buy YT' : 'Sell YT'}
          />
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
