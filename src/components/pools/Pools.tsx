import { useState } from 'react';
import './Pools.css';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';

const Market = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <h1 className="mb-4">Liquidity Pools</h1>
          <div>Exit anytime at market price.</div>
          <div className="text-4 text-justify">
            Liquidity provision with minimal IL. Each pool consists of underlying asset and PT (redeemable for
            underlying at maturity).
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {' '}
          {/* second part of ui */}
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
          <PoolCard title="PT tsTON" value="15.61" tvl="$1000" maturity="27 Jun 2024" daysToMaturity="100" />
          <PoolCard title="YT tsTON" value="15.21" tvl="$2000" maturity="27 Jun 2024" daysToMaturity="80" />
        </div>
      </div>
    </>
  );
};

export function PoolCard({
  title,
  value,
  tvl,
  maturity,
  daysToMaturity,
}: {
  title: string;
  value: string;
  tvl: string;
  maturity: string;
  daysToMaturity: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="pool-card gap-3">
        <div className="flex flex-row justify-between w-full">
          <div>
            <div className="text-1">{title}</div>
            <div className="text-gray-400">Tonstakers</div>
          </div>
          <img src={tsTonIcon} alt="tsTON" className="tsTon-icon max-w-7" />
        </div>

        <div className="">
          <div>{value}%</div>
          <div className="text-gray-400">{tvl} TVL</div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>Maturity</div>
          <div className="flex flex-row gap-2">
            <div>{maturity}</div>
            <div className="text-gray-400">{daysToMaturity} days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
