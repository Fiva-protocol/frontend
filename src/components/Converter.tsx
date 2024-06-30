import React, { useState } from 'react';
import './Converter.css';
import './CommonButton.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';

enum Tab {
  Mint = 'mint',
  Redeem = 'redeem',
}

const Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mint);

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.Mint:
        return (
          <div className="converter-section">
            <h1>Mint your Tokens</h1>
            <p>Mint SY tokens back into their corresponding.</p>
            <div className="tabs">
              <button
                className={`tab ${activeTab === Tab.Mint ? 'active' : ''}`}
                onClick={() => setActiveTab(Tab.Mint)}
              >
                Mint
              </button>
              <button
                className={`tab ${activeTab === Tab.Redeem ? 'active' : ''}`}
                onClick={() => setActiveTab(Tab.Redeem)}
              >
                Redeem
              </button>
            </div>
            <br></br>
            <div className="input-group">
              <label>Input Balance: 0</label>
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
            <button className="button">Mint</button>
          </div>
        );
      case Tab.Redeem:
        return (
          <div className="converter-section">
            <h1>Redeem your Tokens</h1>
            <p>Redeem SY tokens back into their corresponding.</p>
            <div className="tabs">
              <button
                className={`tab ${activeTab === Tab.Mint ? 'active' : ''}`}
                onClick={() => setActiveTab(Tab.Mint)}
              >
                Mint
              </button>
              <button
                className={`tab ${activeTab === Tab.Redeem ? 'active' : ''}`}
                onClick={() => setActiveTab(Tab.Redeem)}
              >
                Redeem
              </button>
            </div>
            <br></br>
            <div className="input-group">
              <label>Input Balance: 0</label>
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="PT tsTON" />PT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input type="number" placeholder="0" className="input-number" />
              </div>
              <label>Balance: 0</label>
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
            <button className="button">Redeem</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="converter-page">
      <div className="converter-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Converter;
