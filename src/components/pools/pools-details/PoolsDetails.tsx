import React, { useState } from 'react';
import '../../../App.css';
import './PoolsDetails.css'

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
              Active
            </span>
            <span
              className={`text-3 ${liquidityActionType === 'remove' ? 'active' : ''}`}
              onClick={() => setLiquidityActionType('remove')}
            >
              Inactive
            </span>
          </div>

          <div>
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
    <div>
        <input className="main-input" style={{ backgroundColor: 'black', border: '1px solid white' }}></input>
        {type === 'pt' ? 'PT' : 'YT'}
    </div>
);
}

export function LiquidityRemoveView(type: PoolsDetailsProps['type']) {
  return <div>B{type === 'pt' ? 'PT' : 'YT'}</div>;
}

export default PoolsDetails;
