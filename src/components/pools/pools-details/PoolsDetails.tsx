import React, { useState } from 'react';
import '../../../App.css';
import './PoolsDetails.css';
import DoubleInput from '../../shared/double-input/DoubleInput';
import plus from '../../../assets/icons/plus.svg';
import CircleIcon from '../../shared/circle-icon/CircleIcon';
import downArrow from '../../../assets/icons/downArrow.svg';
import tsTonIcon from '../../../assets/icons/tsTonIcon.svg';
import logo from '../../../assets/icons/tokenLogo.svg';
import PercentageSlider from '../../shared/percentage-slider/PercentageSlider';
import { useProvideLiquidity } from '../../../hooks/pools/useProvideLiquidity';
import { useEstimateDepositOut } from '../../../hooks/pools/useEstimateDeposit';
import { Address, fromNano } from '@ton/core';
import { useJettonBalance } from '../../../hooks/useJettonBalance';
import { useLPBalance } from '../../../hooks/pools/useLPBalance';
import { usePoolReserves } from '../../../hooks/pools/usePoolReserves';
import { useTradeFee } from '../../../hooks/pools/useTradeFee';
import { useWithdrawLiquidity } from '../../../hooks/pools/useWithdrawLiquidity';
import { formatNumberWithSpaces } from '../../../utils/numberUtils'; // Import the utility function



export interface PoolsDetailsProps {
  type: 'pt' | 'yt';
}

const PoolsDetails: React.FC<PoolsDetailsProps> = (props) => {
  const [liquidityActionType, setLiquidityActionType] = useState<'add' | 'remove'>('add');
//   const [withdrawPercentage, setWithdrawPercentage] = useState<number>(0); // New state for percentage

  const { type } = props;

  const tokenAddresses = {
    pt: {
      jettonAddress: 'EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK',
      jettonName: 'PT'
    },
    yt: {
      jettonAddress: 'EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW',
      jettonName: 'YT'
    }
  };

  const jettonAddress = tokenAddresses[type].jettonAddress;
  const jettonName = tokenAddresses[type].jettonName;

  const {
    tsTONAmount,
    setTsTONAmount,
    assetAmount,
    setAssetAmount,
    handleTsTONClick,
    handleAssetClick: handlePTClick,
  } = useProvideLiquidity(jettonAddress);

  const { withdrawAmount, setWithdrawAmount, handleWithdrawClick } = useWithdrawLiquidity(jettonAddress);

  const estimateResult = useEstimateDepositOut(
    'kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf',
    tsTONAmount,
    jettonAddress,
    assetAmount
  );
  
  const tsTONBalance = useJettonBalance(Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf'));
  const jettonBalance = useJettonBalance(Address.parse(jettonAddress));
  const estimatedOutput = estimateResult ? (Number(fromNano(estimateResult.fairSupply)).toFixed(2)) : '0.00';
  const LPBalance = useLPBalance('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf', jettonAddress);
  const poolReserves = usePoolReserves('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf', jettonAddress);
  const tradeFee = useTradeFee('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf', jettonAddress);

  // const [swapMode, setSwapMode] = useState('buy');
  // const [activeTab, setActiveTab] = useState('swap');

  const formattedReserves = poolReserves
  ? {
      reserve1: formatNumberWithSpaces(Number(fromNano(poolReserves.reserve1))),
      reserve2: formatNumberWithSpaces(Number(fromNano(poolReserves.reserve2))),
    }
  : { reserve1: '0.00', reserve2: '0.00' };
  const formattedTradeFee = tradeFee ? `${(tradeFee * 100).toFixed(2)}%` : '0.00%';
  const formattedLPBalance = LPBalance ? Number(fromNano(LPBalance)).toFixed(2) : '0.00';
  
  const handlePercentageChange = (percentage) => {
    setWithdrawPercentage(percentage);
    if (formattedLPBalance !== '0.00') {
      setWithdrawAmount(((percentage / 100) * Number(formattedLPBalance)).toFixed(2));
    }
  };
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
              <LiquidityAddView 
              type={props.type}
              tsTONAmount = {tsTONAmount}
              setTsTONAmount={setTsTONAmount}
              assetAmount={assetAmount}
              setAssetAmount={setAssetAmount}
              handlePTClick={handlePTClick}
              handleTsTONClick={handleTsTONClick}
              estimatedOutput={estimatedOutput}
              tsTONBalance={tsTONBalance}
              jettonBalance={jettonBalance}
              LPBalance={LPBalance}
              reserves={formattedReserves}
              tradeFee={formattedTradeFee}
              jettonName={jettonName}
              />
            ) : (
              <LiquidityRemoveView 
              type={props.type} 
              withdrawAmount={withdrawAmount}
              setWithdrawAmount={setWithdrawAmount}
              handleWithdrawClick={handleWithdrawClick}
              tsTONBalance={tsTONBalance}
              jettonBalance={jettonBalance}
              LPBalance={LPBalance}
              reserves={formattedReserves}
              tradeFee={formattedTradeFee}
              onPercentageChange={handlePercentageChange}
              jettonName={jettonName}
            />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export function LiquidityAddView({
  type,
  tsTONAmount,
  setTsTONAmount,
  assetAmount,
  setAssetAmount,
  handlePTClick,
  handleTsTONClick,
  estimatedOutput,
  tsTONBalance,
  jettonBalance,
  LPBalance,
  reserves,
  tradeFee,
  jettonName,
}: {
  type: PoolsDetailsProps['type'];
  tsTONAmount: string;
  setTsTONAmount: (value: string) => void;
  assetAmount: string;
  setAssetAmount: (value: string) => void;
  handlePTClick: () => Promise<void>;
  handleTsTONClick: () => Promise<void>;
  estimatedOutput: string;
  tsTONBalance: bigint | null;
  jettonBalance: bigint | null;
  LPBalance: bigint | null;
  reserves: { reserve1: string; reserve2: string };
  tradeFee: string;
  jettonName: string
}) {
  const formattedTsTONBalance = tsTONBalance ? Number(fromNano(tsTONBalance)).toFixed(2) : '0.00';
  const formattedjettonBalance = jettonBalance ? Number(fromNano(jettonBalance)).toFixed(2) : '0.00';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="tsTON"
          label2InputLeft="31 Dec 2024"
          label1={'Underlying Input'}
          label2={`Balance: ${formattedTsTONBalance}`}
          value={tsTONAmount}
          onChange={(value) => setTsTONAmount(value)}
        />
      </div>
      <CircleIcon iconPath={plus} />
      <div>
        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft={`${jettonName} tsTON`}
          label2InputLeft="31 Dec 2024"
          label1={`${jettonName} Input`}
          label2={`Balance: ${formattedjettonBalance}`}
          value={assetAmount}
          onChange={(value) => setAssetAmount(value)}
        />
      </div>
      <CircleIcon iconPath={downArrow} />
      <div className="flex flex-col gap-2">
        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft="LP PT"
          label2InputLeft="31 Dec 2024"
          label1={'Output'}
          value={estimatedOutput}
          onChange={() => {}}
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
            <div style={{ color: '#D9D9D9' }}>Reserves</div>
            <div>{`tsTON: ${reserves.reserve1}, ${jettonName}: ${reserves.reserve2}`}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div style={{ color: '#D9D9D9' }}>Trade Fee</div>
            <div>{tradeFee}</div>
          </div>
        </div>
      </div>

      <button className="button" onClick={handlePTClick}>Add Liquidity {jettonName}</button>
      <button className="button" onClick={handleTsTONClick}>Add Liquidity tsTON</button>
    </div>
  );
}


export function LiquidityRemoveView({
  type,
  withdrawAmount,
  setWithdrawAmount,
  handleWithdrawClick,
  // tsTONBalance,
  // jettonBalance,
  LPBalance,
  reserves,
  tradeFee,
  onPercentageChange,
  jettonName
}: {
  type: PoolsDetailsProps['type'];
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  handleWithdrawClick: () => Promise<void>;
  // tsTONBalance: bigint | null;
  // jettonBalance: bigint | null;
  LPBalance: bigint | null;
  reserves: { reserve1: string; reserve2: string };
  tradeFee: string;
  onPercentageChange: (percentage: number) => void;
  jettonName:string;
}) {
  // const formattedTsTONBalance = tsTONBalance ? Number(fromNano(tsTONBalance)).toFixed(2) : '0.00';
  // const formattedjettonBalance = jettonBalance ? Number(fromNano(jettonBalance)).toFixed(2) : '0.00';
  const formattedLPBalance = LPBalance ? Number(fromNano(LPBalance)).toFixed(2) : '0.00';
    return (
        <div className="flex flex-col gap-4">
          <div>
            <DoubleInput
              iconPathInputLeft={logo}
              label1InputLeft={`LP ${jettonName}`}
              label2InputLeft="31 Dec 2024"
              label1={''}
              label2={`Balance: ${formattedLPBalance}`}
              value={withdrawAmount}
              onChange={(value) => setWithdrawAmount(value)}
            />
          </div>
          <PercentageSlider onPercentageChange={onPercentageChange} />
          {/* <CircleIcon iconPath={downArrow} /> */}
          {/* <div>
            <DoubleInput
              iconPathInputLeft={logo}
              label1InputLeft="PT tsTON"
              label2InputLeft="31 Dec 2024"
              label1={'Output'}
              label2={''}
              value={'0'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <DoubleInput
              iconPathInputLeft={tsTonIcon}
              label1InputLeft="tsTON"
              label2InputLeft="31 Dec 2024"
              label1={''}
              label2={''}
              value={'0'}
              onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            />
            <div className="text-4" style={{ color: '#6161D6' }}>
            </div>
          </div> */}
    
          {/* outlined card */}
          <div className="flex flex-col gap-2">
            <div
              className="rounded-lg px-4 py-3 gap-2 flex flex-col"
              style={{ border: '1px solid var(--white-35, rgba(228, 228, 240, 0.35))' }}
            >
            <div className="flex flex-row justify-between">
              <div style={{ color: '#D9D9D9' }}>Reserves</div>
              <div>{`tsTON: ${reserves.reserve1}, ${jettonName}: ${reserves.reserve2}`}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div style={{ color: '#D9D9D9' }}>Trade Fee</div>
              <div>{tradeFee}</div>
            </div>
            </div>
          </div>
    
          <button className="button" onClick={() => handleWithdrawClick()}>Remove Liquidity</button>
        </div>
      );
}

export default PoolsDetails;