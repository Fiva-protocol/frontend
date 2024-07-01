import React, { useState, useEffect } from 'react';
import './Converter.css';
import './CommonButton.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';
import MintFiva from './MintYTPT';
import RedeemFiva from './Redeem'; // Импортируем RedeemFiva
import { useTonAddress } from '@tonconnect/ui-react';

enum Tab {
  Mint = 'mint',
  Redeem = 'redeem',
}

const Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mint);
  const [inputValue, setInputValue] = useState<number>(10);
  const userAddress = useTonAddress();
  const blockchainIndex = 1;  // value from blockchain

  const calculateValues = (value: number) => {
    return {
      tsTon: value,
      pt: value / blockchainIndex,
      yt: value / blockchainIndex,
    };
  };

  const { tsTon, pt, yt } = calculateValues(inputValue);

  useEffect(() => {
    const { pt, yt } = calculateValues(inputValue);
    setPtValue(pt);
    setYtValue(yt);
  }, [inputValue]);

  const [ptValue, setPtValue] = useState<number>(pt);
  const [ytValue, setYtValue] = useState<number>(yt);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputValue(value);
  };

  const calculateTSton = (value: number) => {
    return blockchainIndex * value;
  };

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
                <input
                  type="number"
                  placeholder="10"
                  className="input-number"
                  value={inputValue}
                  onChange={handleInputChange}
                />
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
                <input
                  type="number"
                  placeholder="0"
                  className="input-number"
                  value={ptValue}
                  readOnly
                />
              </div>
              <div className="input-row">
                <div className="output-label">
                  <span><img src={tsTonIcon} alt="YT tsTON" />YT tsTON</span>
                  <span>25 Jul 2024</span>
                </div>
                <input
                  type="number"
                  placeholder="0"
                  className="input-number"
                  value={ytValue}
                  readOnly
                />
              </div>
            </div>
            {userAddress ? (
              <MintFiva inputValue={inputValue.toString()} />  
            ) : (
              <button className="button" onClick={() => {/* wallet connection info ? */}}>
                Connect Wallet
              </button>
            )}
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
                  <input type="number"
                    placeholder="0"
                    className="input-number"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Balance: 0</label>
                <div className="input-row">
                  <div className="output-label">
                    <span><img src={tsTonIcon} alt="YT tsTON" />YT tsTON</span>
                    <span>25 Jul 2024</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    className="input-number"
                    value={inputValue}
                    readOnly
                  />
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
                  <input
                    type="number"
                    placeholder="0"
                    className="input-number"
                    value={calculateTSton(inputValue)}
                    readOnly
                  />
                </div>
              </div>
              {!userAddress ? (
              <button className="connect-wallet">Connect Wallet</button>
            ) : (
              <RedeemFiva inputValue={inputValue.toString()} />
            )}
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
