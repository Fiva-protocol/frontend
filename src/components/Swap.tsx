import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Swap.css';
import CommonButton from './CommonButton';
import downArrow from '../assets/icons/downArrow.svg';

const Swap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'YT' | 'PT'>('YT');
  const [activeSubTab, setActiveSubTab] = useState<'buy' | 'sell'>('buy');
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/swap/pt') {
      setActiveTab('PT');
    } else {
      setActiveTab('YT');
    }
  }, [location]);

  const handleTabClick = (tab: 'YT' | 'PT') => {
    setActiveTab(tab);
    setActiveSubTab('buy'); // Reset sub-tab to 'buy' when switching main tabs
    if (tab === 'PT') {
      navigate('/swap/pt');
    } else {
      navigate('/swap');
    }
  };

  return (
    <div className="swap-page">
      <div className="swap-content">
        <div className="swap-section">
          <div>
            <h1>Swap {activeTab}</h1>
            <p>Swap your tokens here.</p>
            <br />
          </div>
          <div className="segmented-control">
            <span
              className={`${activeTab === 'YT' ? 'active' : ''}`}
              onClick={() => handleTabClick('YT')}
            >
              YT
            </span>
            <span
              className={`${activeTab === 'PT' ? 'active' : ''}`}
              onClick={() => handleTabClick('PT')}
            >
              PT
            </span>
          </div>
          <div className="swap-buttons sub-tabs">
            <button
              className={`swap-button ${activeSubTab === 'buy' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('buy')}
            >
              Buy {activeTab}
            </button>
            <button
              className={`swap-button ${activeSubTab === 'sell' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('sell')}
            >
              Sell {activeTab}
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
            onClick={() => console.log(`${activeSubTab === 'buy' ? 'Buy' : 'Sell'} ${activeTab} clicked`)}
            text={activeSubTab === 'buy' ? `Buy ${activeTab}` : `Sell ${activeTab}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Swap;