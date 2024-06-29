import React, { useState } from 'react';
import './Pools.css';

const Market = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container px-6 py-8 flex flex-col gap-4">
        <div className="flex flex-col items-start ">
          <h1 className="mb-4">Liquidity Pools</h1>
          <p>Exit anytime at market price.</p>
          <p className="text-4 self-stretch">
            Liquidity provision with minimal IL. Each pool consists of underlying asset and PT (redeemable for underlying at maturity).
          </p>
        </div>
        <div>
          {/* segmented control */}
          <div className="segmented-control">
            <span
              className={`text-4 ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => handleTabClick('active')}
            >
              Active
            </span>
            <span
              className={`text-4 ${activeTab === 'inactive' ? 'active' : ''}`}
              onClick={() => handleTabClick('inactive')}
            >
              Inactive
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Market;
