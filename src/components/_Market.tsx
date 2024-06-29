// src/components/Market.js
import React, { useState } from 'react';
import './Market.css';
import './CommonButton.css';
// import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';

const Market = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [swapMode, setSwapMode] = useState('buy');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'swap':
        return (
          <div className="swap-section">
            <div className="swap-buttons">
              <button
                className={`swap-button ${swapMode === 'buy' ? 'active' : ''}`}
                onClick={() => setSwapMode('buy')}
              >
                Buy YT
              </button>
              <button
                className={`swap-button ${swapMode === 'sell' ? 'active' : ''}`}
                onClick={() => setSwapMode('sell')}
              >
                Sell YT
              </button>
            </div>
            <div className="swap-inputs">
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
              <div className="input-group">
                <label>Output</label>
                <div className="input-row">
                  <select className="input-select">
                    <option value="tsTon">tsTON</option>
                    {/* Add other options here */}
                  </select>
                  <input type="number" placeholder="0" className="input-number" />
                </div>
              </div>
            </div>
            <button className="button">Connect Wallet</button>
          </div>
        );
      case 'limit':
        return (
          <div className="limit-section">
            <h2>Limit Orders</h2>
            <p>Functionality for Limit Orders will be here.</p>
          </div>
        );
      case 'mint':
        return (
          <div className="mint-section">
            <h2>Mint Tokens</h2>
            <p>Functionality for Minting Tokens will be here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="market-page">
      <div className="market-content">
        <h1>Market</h1>
        <p>Here you can buy/sell tokens.</p>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'swap' ? 'active' : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            Swap
          </button>
          <button
            className={`tab ${activeTab === 'limit' ? 'active' : ''}`}
            onClick={() => setActiveTab('limit')}
          >
            Limit
          </button>
          <button
            className={`tab ${activeTab === 'mint' ? 'active' : ''}`}
            onClick={() => setActiveTab('mint')}
          >
            Mint
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Market;
