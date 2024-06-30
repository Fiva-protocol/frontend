import React, { useState } from 'react';
import './Dashboard.css';
import ptIcon from '../assets/icons/ptIcon.svg';
import ytIcon from '../assets/icons/ytIcon.svg';
import lpIcon from '../assets/icons/lpIcon.svg';
import infoIcon from '../assets/icons/infoIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';

const Dashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'All Assets' | 'PT' | 'YT' | 'LP'>('All Assets');
  const address = useTonAddress();

  const handleSubTabClick = (subTab: 'All Assets' | 'PT' | 'YT' | 'LP') => {
    setActiveSubTab(subTab);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-5)}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>{address ? formatAddress(address) : 'Connect wallet'}</p>
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
            <div className="asset-item">
              <div className="asset-info">
                <img src={ptIcon} alt="PT" />
                <div className="asset-details">
                  <span className="asset-balance">PT balance</span>
                  <span className="asset-apy">APY 18.67%</span>
                </div>
              </div>
              <span className="info-value">$0.00</span>
            </div>
            <div className="asset-item">
              <div className="asset-info">
                <img src={ytIcon} alt="YT" />
                <div className="asset-details">
                  <span className="asset-balance">YT balance</span>
                  <span className="asset-apy">APY 18.67%</span>
                </div>
              </div>
              <span className="info-value">$0.00</span>
            </div>
            <div className="asset-item">
              <div className="asset-info">
                <img src={lpIcon} alt="LP" />
                <div className="asset-details">
                  <span className="asset-balance">LP balance</span>
                  <span className="asset-apy">APY 18.67%</span>
                </div>
              </div>
              <span className="info-value">$0.00</span>
            </div>
          </div>
        )}
        {activeSubTab === 'PT' && (
          <div className="asset-item">
            <div className="asset-info">
              <img src={ptIcon} alt="PT" />
              <div className="asset-details">
                <span className="asset-balance">PT balance</span>
                <span className="asset-apy">APY 18.67%</span>
              </div>
            </div>
            <span className="info-value">$0.00</span>
          </div>
        )}
        {activeSubTab === 'YT' && (
          <div className="asset-item">
            <div className="asset-info">
              <img src={ytIcon} alt="YT" />
              <div className="asset-details">
                <span className="asset-balance">YT balance</span>
                <span className="asset-apy">APY 18.67%</span>
              </div>
            </div>
            <span className="info-value">$0.00</span>
          </div>
        )}
        {activeSubTab === 'LP' && (
          <div className="asset-item">
            <div className="asset-info">
              <img src={lpIcon} alt="LP" />
              <div className="asset-details">
                <span className="asset-balance">LP balance - $0</span>
                <span className="asset-apy">APY 18.67%</span>
              </div>
            </div>
            <span className="info-value">$0.00</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;