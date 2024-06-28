import React, { useState } from 'react';
import './Dashboard.css';
import ptIcon from '../assets/icons/ptIcon.svg';
import ytIcon from '../assets/icons/ytIcon.svg';
import lpIcon from '../assets/icons/lpIcon.svg';
import infoIcon from '../assets/icons/infoIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('My Positions');
  const [activeSubTab, setActiveSubTab] = useState('All Assets');
  const address = useTonAddress();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <div className="wallet-address">
          {address ? address : 'Connect wallet'}
          <img src={infoIcon} alt="info" className="info-icon" />
        </div>
      </div>
      <div className="dashboard-info">
        <div className="info-item">
          <span>$ My Current Balance</span>
          <span className="info-value">$0.00</span>
        </div>
        <div className="info-item">
          <span>$ My Net P&L</span>
          <span className="info-value">$0.00</span>
        </div>
        <div className="info-item">
          <span>$ My Total Capital</span>
          <img src={infoIcon} alt="info" className="info-icon" />
          <span className="info-value">$0.00</span>
        </div>
        <div className="info-item">
          <span>$ My Claimable Yield</span>
          <span className="info-value">$0.00</span>
        </div>
        <button className="common-button">Claim Yield & Rewards</button>
      </div>
      <div className="dashboard-tabs">
        <button
          className={activeTab === 'My Positions' ? 'active' : ''}
          onClick={() => handleTabClick('My Positions')}
        >
          My Positions
        </button>
        <button
          className={activeTab === 'My Orders' ? 'active' : ''}
          onClick={() => handleTabClick('My Orders')}
        >
          My Orders
        </button>
      </div>
      {activeTab === 'My Positions' && (
        <div>
          <div className="sub-tabs">
            <button
              className={activeSubTab === 'All Assets' ? 'active' : ''}
              onClick={() => handleSubTabClick('All Assets')}
            >
              All Assets
            </button>
            <button
              className={activeSubTab === 'PT' ? 'active' : ''}
              onClick={() => handleSubTabClick('PT')}
            >
              PT
            </button>
            <button
              className={activeSubTab === 'YT' ? 'active' : ''}
              onClick={() => handleSubTabClick('YT')}
            >
              YT
            </button>
            <button
              className={activeSubTab === 'LP' ? 'active' : ''}
              onClick={() => handleSubTabClick('LP')}
            >
              LP
            </button>
          </div>
          <div className="positions-content">
            {activeSubTab === 'All Assets' && (
              <div>
                <div className="info-item">
                  <img src={ptIcon} alt="PT" />
                  <span>PT balance - $0</span>
                </div>
                <div className="info-item">
                  <img src={ytIcon} alt="YT" />
                  <span>YT balance - $0</span>
                </div>
                <div className="info-item">
                  <img src={lpIcon} alt="LP" />
                  <span>LP balance - $0</span>
                </div>
              </div>
            )}
            {activeSubTab === 'PT' && (
              <div className="info-item">
                <img src={ptIcon} alt="PT" />
                <span>PT balance - $0</span>
              </div>
            )}
            {activeSubTab === 'YT' && (
              <div className="info-item">
                <img src={ytIcon} alt="YT" />
                <span>YT balance - $0</span>
              </div>
            )}
            {activeSubTab === 'LP' && (
              <div className="info-item">
                <img src={lpIcon} alt="LP" />
                <span>LP balance - $0</span>
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'My Orders' && (
        <div className="orders-content">
          {/*Content for tab My Orders */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
