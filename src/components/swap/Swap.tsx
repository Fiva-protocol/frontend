import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Swap.css';
import downArrow from '../../assets/icons/downArrow.svg';
import CircleIcon from '../shared/circle-icon/CircleIcon';
import DoubleInput from '../shared/double-input/DoubleInput';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import SegmentedControlButton from '../shared/segmented-control/SegmentedControlButton';
import { useEstimateSwap } from '../../hooks/useEstimateSwap';
import { Address, fromNano } from '@ton/core';
import { useJettonBalance } from '../../hooks/useJettonBalance';
import { useTonAddress } from '@tonconnect/ui-react';
import logo from '../../assets/icons/tokenLogo.svg';
import '../../App.css';

import SwapTokensPT from './SwapTokensPT';
import SwapTokensYT from './SwapTokensYT';

const tsTONAddress = 'kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf';
const PTAddress = 'EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK';
const YTAddress = 'EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW';


const Swap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'YT' | 'PT'>('YT');
  const [activeSubTab, setActiveSubTab] = useState<'buy' | 'sell'>('buy');
  const [amountIn, setAmountIn] = useState<string>('');

  const userAddress = useTonAddress();
  const navigate = useNavigate();
  const location = useLocation();

  const [resultYT, setResultYT] = useState<{
    assetOut: string;
    amountOut: bigint;
    tradeFee: bigint;
  } | null>(null);

  const [resultPT, setResultPT] = useState<{
    assetOut: string;
    amountOut: bigint;
    tradeFee: bigint;
  } | null>(null);


  const ytBalance = useJettonBalance(Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW'));
  const ptBalance = useJettonBalance(Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK'));
  const tsTONBalance = useJettonBalance(Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf'));
  const formatYtBalance = ytBalance ? Number(fromNano(ytBalance)).toFixed(2) : '0.00';
  const formatPtBalance = ptBalance ? Number(fromNano(ptBalance)).toFixed(2) : '0.00';
  const formatTsBalance = tsTONBalance ? Number(fromNano(tsTONBalance)).toFixed(2) : '0.00';
  console.log("ytBalance", ytBalance)
  console.log("ytBalance", formatYtBalance)
  console.log("ptBalance", ptBalance)
  console.log("ptBalance", formatPtBalance)
  console.log("tsBalance", tsTONBalance)
  console.log("tsBalance", formatTsBalance)

  const assetYTIn = activeSubTab === 'sell' ? YTAddress : tsTONAddress;
  const assetYTOut = activeSubTab === 'sell' ? tsTONAddress : YTAddress;

  const assetPTIn = activeSubTab === 'sell' ? PTAddress : tsTONAddress;
  const assetPTOut = activeSubTab === 'sell' ? tsTONAddress : PTAddress;

  const estimateResultYT = useEstimateSwap(assetYTIn, amountIn, assetYTOut);
  const estimateResultPT = useEstimateSwap(assetPTIn, amountIn, assetPTOut);

  useEffect(() => {
    setResultYT(estimateResultYT);
  }, [estimateResultYT]);

  useEffect(() => {
    setResultPT(estimateResultPT);
  }, [estimateResultPT]);

  useEffect(() => {
    if (location.pathname === '/swap/pt') {
      setActiveTab('PT');
    } else {
      setActiveTab('YT');
    }
  }, [location]);

  const handleTabClick = (tab: 'YT' | 'PT') => {
    setActiveTab(tab);
    setActiveSubTab('buy');
    switch (tab) {
      case 'YT':
        navigate('/swap/yt');
        break;
      case 'PT':
        navigate('/swap/pt');
        break;
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-start">
          <h1>Swap</h1>
          <div className="text-3">Swap your tokens here.</div>
        </div>

        <div className="segmented-control">
          <span className={`${activeTab === 'YT' ? 'active' : ''}`} onClick={() => handleTabClick('YT')}>
            YT
          </span>
          <span className={`${activeTab === 'PT' ? 'active' : ''}`} onClick={() => handleTabClick('PT')}>
            PT
          </span>
        </div>

        <SegmentedControlButton
          state1="buy"
          state2="sell"
          label1="Buy"
          label2="Sell"
          onChange={(value: 'buy' | 'sell') => {
            setActiveSubTab(value);
          }}
        />

        <DoubleInput
          iconPathInputLeft={activeSubTab === 'buy' ? tsTonIcon : logo}
          label1InputLeft={activeSubTab === 'buy' ? 'tsTON' : (activeTab === 'YT' ? 'YT tsTON' : 'PT tsTON')}
          label2InputLeft="Tonstakers"
          label1={'Input'}
          label2={`Balance: ${activeSubTab === 'buy' ? formatTsBalance : (activeTab === 'YT' ? formatYtBalance : formatPtBalance)}`}
          isReadOnly={false}
          inputType="number"
          value={'0'}
          onChange={(value) => setAmountIn(value)}
        />

        <div>
          <CircleIcon iconPath={downArrow} />
          <div className="flex flex-col gap-2">
            <DoubleInput
              iconPathInputLeft={activeSubTab === 'buy' ? logo : tsTonIcon}
              label1InputLeft={activeSubTab === 'buy' ? (activeTab === 'YT' ? 'YT tsTON' : 'PT tsTON') : 'tsTON'}
              label2InputLeft="Tonstakers"
              label1={'Output'}
              label2={''}
              isReadOnly={true}
              inputType="string"
              value={activeTab === 'YT' ? fromNano(resultYT?.amountOut?.toString() ?? '0') : fromNano(resultPT?.amountOut?.toString() ?? '0')}
              onChange={() => {}}
            />
            <div className="text-4" style={{ color: '#6161D6' }}>
              Trade fee: {fromNano(resultYT?.tradeFee?.toString() ?? '0')}
            </div>
          </div>
        </div>

        {userAddress ? (
          <>
            {activeTab === 'PT' ? (
              <SwapTokensPT subTab={activeSubTab} amountIn={amountIn} />
            ) : (
              <SwapTokensYT subTab={activeSubTab} amountIn={amountIn} />
            )}
          </>
        ) : (
          <button className="button" onClick={() => {/* wallet connection info ? */}}>
                Please connect wallet
              </button>
        )}
      </div>
    </>
  );
};

export default Swap;
