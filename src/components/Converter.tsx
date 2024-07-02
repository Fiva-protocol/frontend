import React, { useState, useEffect, useCallback } from 'react';
import './Converter.css';
import './CommonButton.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';
import DoubleInput from './shared/double-input/DoubleInput';
import CircleIcon from './shared/circle-icon/CircleIcon';
import SegmentedControlButton from './shared/segmented-control/SegmentedControlButton';
import { useTonAddress } from '@tonconnect/ui-react';
import MintFiva from './MintYTPT';
import RedeemFiva from './Redeem';
import logo from '../assets/icons/tokenLogo.svg';

enum Tab {
  Mint = 'mint',
  Redeem = 'redeem',
}

const Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mint);
  const [inputValue, setInputValue] = useState<number>(10);
  const [ytValue, setYtValue] = useState<number>(0);
  const [ptValue, setPtValue] = useState<number>(0);
  const userAddress = useTonAddress();
  const blockchainIndex = 2;  // value from blockchain

  const calculateValues = useCallback((value: number) => {
    return {
      tsTon: value,
      pt: value / blockchainIndex,
      yt: value / blockchainIndex,
    };
  }, [blockchainIndex]);

  useEffect(() => {
    const { pt, yt } = calculateValues(inputValue);
    setPtValue(pt);
    setYtValue(yt);
  }, [inputValue, calculateValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputValue(value);
  };

  const calculateTSton = useCallback((value: number) => {
    return blockchainIndex * value;
  }, [blockchainIndex]);

  const MintTokensTab = ({ inputValue, ytValue, ptValue }) => (
    <>
      <DoubleInput
        iconPathInputLeft={tsTonIcon}
        label1InputLeft="tsTON"
        label2InputLeft="Tonstakers"
        label1="Input"
        label2="Balance: 0"
        value={inputValue}
        onChange={handleInputChange}
        readOnly={false}
      />

      <CircleIcon iconPath={downArrow} />

      <div className="flex flex-col gap-4">
        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft="YT tsTON"
          label2InputLeft="Tonstakers"
          label1="Output"
          label2=""
          value={ytValue}
          readOnly={true}
        />

        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft="PT tsTON"
          label2InputLeft="Tonstakers"
          label1=""
          label2=""
          value={ptValue}
          readOnly={true}
        />
      </div>
      {!userAddress 
      ? ( <button className="connect-wallet">Connect Wallet</button>) 
      : <MintFiva inputValue={inputValue.toString()} /> }
    </>
  );

  const RedeemTokensTab = ({ inputValue }) => (
    <>
      <div className="flex flex-col gap-4">
        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft="YT tsTON"
          label2InputLeft="Tonstakers"
          label1="Input"
          label2="Balance: 0"
          value={inputValue}
          onChange={handleInputChange}
          readOnly={false}
        />

        <DoubleInput
          iconPathInputLeft={logo}
          label1InputLeft="PT tsTON"
          label2InputLeft="Tonstakers"
          label1=""
          label2="Balance: 0"
          value={inputValue}
          onChange={handleInputChange}
          readOnly={false}
        />
      </div>

      <CircleIcon iconPath={downArrow} />

      <DoubleInput
        iconPathInputLeft={tsTonIcon}
        label1InputLeft="tsTON"
        label2InputLeft="Tonstakers"
        label1="Output"
        label2=""
        value={calculateTSton(inputValue)}
        readOnly={true}
      />
      {!userAddress 
      ? ( <button className="connect-wallet">Connect Wallet</button>) 
      : <RedeemFiva inputValue={inputValue.toString()} /> }
    </>
  );

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col items-start">
        <h1>{activeTab === Tab.Mint ? 'Mint Liquidity Pools' : 'Redeem Liquidity Pools'}</h1>
        <div className="text-3">
          {activeTab === Tab.Mint
            ? 'Mint SY tokens back into their corresponding.'
            : 'Redeem SY tokens back into their corresponding.'}
        </div>
      </div>
      <SegmentedControlButton
        state1="mint"
        state2="redeem"
        label1="Mint"
        label2="Redeem"
        onChange={(value: string) => setActiveTab(value as Tab)}
      />
      {activeTab === Tab.Mint ? (
        <MintTokensTab inputValue={inputValue} ytValue={ytValue} ptValue={ptValue} />
      ) : (
        <RedeemTokensTab inputValue={inputValue} />
      )}
    </div>
  );
};

export default Converter;
