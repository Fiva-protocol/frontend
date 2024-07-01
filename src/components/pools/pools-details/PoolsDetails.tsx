import React, { useState } from 'react';
import '../../../App.css';
import './PoolsDetails.css';
import DoubleInput from '../../shared/double-input/DoubleInput';
import plus from '../../../assets/icons/plus.svg';
import CircleIcon from '../../shared/circle-icon/CircleIcon';
import downArrow from '../../../assets/icons/downArrow.svg';
import tsTonIcon from '../../../assets/icons/tsTonIcon.svg';
import PercentageSlider from '../../shared/percentage-slider/PercentageSlider';
import Switch from '../../shared/switch/Switch';

export interface PoolsDetailsProps {
  type: 'pt' | 'yt';
}

const PoolsDetails: React.FC<PoolsDetailsProps> = (props) => {
  const [liquidityActionType, setLiquidityActionType] = useState<'add' | 'remove'>('add');
  //   const [swapMode, setSwapMode] = useState('buy');
  // const [activeTab, setActiveTab] = useState('swap');

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col">
        <div className="flex flex-col items-start gap-6">
          <h1 className="">Liquidity Pools</h1>

          <div className="tab-selector">
            <span
              className={`text-3 ${liquidityActionType === 'add' ? 'active' : ''}`}
              onClick={() => setLiquidityActionType('add')}
            >
              Add Liquidity
            </span>
            <span
              className={`text-3 ${liquidityActionType === 'remove' ? 'active' : ''}`}
              onClick={() => setLiquidityActionType('remove')}
            >
              Remove Liquidity
            </span>
          </div>

          <div className="w-full">
            {liquidityActionType === 'add' ? (
              <LiquidityAddView type={props.type} />
            ) : (
              <LiquidityRemoveView type={props.type} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export function LiquidityAddView(type: PoolsDetailsProps['type']) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="tsTON"
          label2InputLeft="Tonstakers"
          label1={'Underlying Input'}
          label2={'Balance: 0'}
          value={'0'}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <CircleIcon iconPath={plus} />
      <div>
        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="PT tsTON"
          label2InputLeft="25 Jul 2024"
          label1={'PT Input'}
          label2={'Balance: 0'}
          value={'0'}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      <CircleIcon iconPath={downArrow} />
      <div className="flex flex-col gap-2">
        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="LP tsTON"
          label2InputLeft="25 Jul 2024"
          label1={'Output'}
          label2={'Balance: 0'}
          value={'0'}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="text-4" style={{ color: '#6161D6' }}>
          Pool Share: 0%
        </div>
      </div>

      {/* outlined card */}
      <div className="flex flex-col gap-2">
        <div
          className="rounded-lg px-4 py-3 gap-2 flex flex-col"
          style={{ border: '1px solid var(--white-35, rgba(228, 228, 240, 0.35))' }}
        >
          <div className="flex flex-row justify-between">
            <div style={{ color: '#D9D9D9' }}>Implied APY Change</div>
            <div>9.917% - 9.917%</div>
          </div>
          <div className="flex flex-row justify-between">
            <div style={{ color: '#D9D9D9' }}>IMin. Received</div>
            <div>0 LP tsTON</div>
          </div>
        </div>
        <div className="text-4">Last updated 15 seconds ago</div>
      </div>

      <button className="button">Add Liquidity</button>
    </div>
  );
}

export function LiquidityRemoveView(type: PoolsDetailsProps['type']) {
    return (
        <div className="flex flex-col gap-4">
          <div>
            <DoubleInput
              iconPathInputLeft={tsTonIcon}
              label1InputLeft="LP tsTON"
              label2InputLeft="25 Jul 2024"
              label1={''}
              label2={'Balance: 0'}
              value={'0'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <PercentageSlider />
          <Switch />
          <CircleIcon iconPath={downArrow} />
          <div>
            <DoubleInput
              iconPathInputLeft={tsTonIcon}
              label1InputLeft="PT tsTON"
              label2InputLeft="25 Jul 2024"
              label1={'Output'}
              label2={''}
              value={'0'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <DoubleInput
              iconPathInputLeft={tsTonIcon}
              label1InputLeft="LP tsTON"
              label2InputLeft="25 Jul 2024"
              label1={''}
              label2={''}
              value={'0'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
            <div className="text-4" style={{ color: '#6161D6' }}>
              Pool Share: 0%
            </div>
          </div>
    
          {/* outlined card */}
          <div className="flex flex-col gap-2">
            <div
              className="rounded-lg px-4 py-3 gap-2 flex flex-col"
              style={{ border: '1px solid var(--white-35, rgba(228, 228, 240, 0.35))' }}
            >
              <div className="flex flex-row justify-between">
                <div style={{ color: '#D9D9D9' }}>Implied APY Change</div>
                <div>9.917% - 9.917%</div>
              </div>
              <div className="flex flex-row justify-between">
                <div style={{ color: '#D9D9D9' }}>IMin. Received</div>
                <div>0 LP tsTON</div>
              </div>
            </div>
            <div className="text-4">Last updated 15 seconds ago</div>
          </div>
    
          <button className="button">Remove Liquidity</button>
        </div>
      );
}

export default PoolsDetails;