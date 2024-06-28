// src/components/Converter.js
import React, { useState } from 'react';
import './Converter.css';
import './CommonButton.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';

const Converter = () => {
  const [activeTab, setActiveTab] = useState('mint');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mint':
        return (
          <div className="converter-section">
            <div className="input-group">
              <label>Input</label>
              <div className="input-row">
                <select className="input-select">
                  <option value="tsTon">tsTON</option>
                  {/* Add other options here */}
                </select>
                <input type="number" placeholder="0" className="input-number" />
              </div>
            </div>
            <div className="swap-icon">
              <img src={downArrow} alt="Swap" />
            </div>
            <div className="output-group">
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="PT tsTON" />PT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input type="number" placeholder="0" className="input-number" />
              </div>
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="YT tsTON" />YT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input type="number" placeholder="0" className="input-number" />
              </div>
            </div>
            <button className="button">Connect Wallet</button>
          </div>
        );
      case 'redeem':
        return (
          <div className="converter-section">
            <div className="input-group">
              <label>Input</label>
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="PT tsTON" />PT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input type="number" placeholder="0" className="input-number" />
              </div>
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="YT tsTON" />YT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input type="number" placeholder="0" className="input-number" />
              </div>
            </div>
            <div className="swap-icon">
              <img src={downArrow} alt="Swap" />
            </div>
            <div className="output-group">
              <label>Output</label>
              <div className="input-row">
                <select className="input-select">
                  <option value="tsTon">tsTON</option>
                  {/* Add other options here */}
                </select>
                <input type="number" placeholder="0" className="input-number" />
              </div>
            </div>
            <button className="button">Connect Wallet</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="converter-page">
      <div className="converter-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'mint' ? 'active' : ''}`}
            onClick={() => setActiveTab('mint')}
          >
            Mint
          </button>
          <button
            className={`tab ${activeTab === 'redeem' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeem')}
          >
            Redeem
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Converter;
