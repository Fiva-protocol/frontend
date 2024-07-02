import { useState } from 'react';
import './Pools.css';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import { PoolsDetailsProps } from './pools-details/PoolsDetails';
import { calculateDaysToMaturity } from '../../utils/dateCalc';
import { useTvlCalculation } from '../../hooks/TVL/useTvlCalculation';
import { useFivaData } from '../../hooks/useFivaData';

const Pools = () => {
  const [activeControl, setActiveControl] = useState('active');
  const {index,date} = useFivaData();

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
          {activeControl === 'active' && (
            <>
              <PoolCard type="pt" title="PT tsTON" maturity={date.toDateString()} daysToMaturity={calculateDaysToMaturity(date.toDateString())} />
              <PoolCard type="yt" title="YT tsTON" maturity={date.toDateString()} daysToMaturity={calculateDaysToMaturity(date.toDateString())} />
            </>
          )}
          {activeControl === 'inactive' && (
            <div className="text-gray-400">No inactive pools</div>
          )}
        </div>
      </div>
    </>
  );
};

export function PoolCard({
  type,
  title,
  maturity,
  daysToMaturity,
}: {
  type: PoolsDetailsProps['type'];
  title: string;
  maturity: string;
  daysToMaturity: number;
}) {
  const jettonAddress = type === 'pt' ? 'EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK' : 'EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW';
  const tvl = useTvlCalculation(jettonAddress);
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
          <div>{`TVL: $${tvl}`}</div>
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
