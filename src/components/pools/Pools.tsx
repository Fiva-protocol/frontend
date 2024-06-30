import { useState } from 'react';
import './Pools.css';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import { PoolsDetailsProps } from './pools-details/PoolsDetails';

const Pools = () => {
  const [activeControl, setActiveControl] = useState('active');

  const handleSegmentedControlClick = (control: 'active' | 'inactive') => {
    setActiveControl(control);
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
              className={`text-4 ${activeControl === 'active' ? 'active' : ''}`}
              onClick={() => handleSegmentedControlClick('active')}
            >
              Active
            </span>
            <span
              className={`text-4 ${activeControl === 'inactive' ? 'active' : ''}`}
              onClick={() => handleSegmentedControlClick('inactive')}
            >
              Inactive
            </span>
          </div>
          <PoolCard type="pt" title="PT tsTON" value="15.61" tvl="$1000" maturity="27 Jun 2024" daysToMaturity="100" />
          <PoolCard type="yt" title="YT tsTON" value="15.21" tvl="$2000" maturity="27 Jun 2024" daysToMaturity="80" />
        </div>
      </div>
    </>
  );
};

export function PoolCard({
  type,
  title,
  value,
  tvl,
  maturity,
  daysToMaturity,
}: {
  type: PoolsDetailsProps['type'];
  title: string;
  value: string;
  tvl: string;
  maturity: string;
  daysToMaturity: string;
}) {
  const handleCardClick = (type: PoolsDetailsProps['type']) => {
    console.log(type);
    // Navigate to another URL
    window.location.href = '/pools/details/' + type;
  };

  return (
    <>
      <div className="pool-card gap-3" onClick={() => handleCardClick(type)}>
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
    </>
  );
}

export default Pools;
