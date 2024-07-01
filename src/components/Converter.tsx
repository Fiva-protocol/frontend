import React, { useState, useEffect } from 'react';
import './Converter.css';
import './CommonButton.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import downArrow from '../assets/icons/downArrow.svg';
import DoubleInput from './shared/double-input/DoubleInput';
import CircleIcon from './shared/circle-icon/CircleIcon';
import SegmentedControlButton from './shared/segmented-control/SegmentedControlButton';
import { useTonAddress } from '@tonconnect/ui-react';

enum Tab {
  Mint = 'mint',
  Redeem = 'redeem',
}

const Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mint);
  const [inputValue, setInputValue] = useState<number>(10);
  const userAddress = useTonAddress();
  const blockchainIndex = 1;  // value from blockchain

  const calculateValues = (value: number) => {
    return {
      tsTon: value,
      pt: value / blockchainIndex,
      yt: value / blockchainIndex,
    };
  };

  const { tsTon, pt, yt } = calculateValues(inputValue);

  useEffect(() => {
    const { pt, yt } = calculateValues(inputValue);
    setPtValue(pt);
    setYtValue(yt);
  }, [inputValue]);

  const [ptValue, setPtValue] = useState<number>(pt);
  const [ytValue, setYtValue] = useState<number>(yt);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInputValue(value);
  };

  const calculateTSton = (value: number) => {
    return blockchainIndex * value;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mint':
        return <MintTokensTab />;
      case 'redeem':
        return <ReedemTokensTab />;
      default:
        return null;
    }
  };

  const MintTokensTab = () => {
    return (
      <>
        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="tsTON"
          label2InputLeft="Tonstakers"
          label1={'Input'}
          label2={'Balance: 0'}
          value={'0'}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />

        <CircleIcon iconPath={downArrow} />

        <div className="flex flex-col gap-4">
          <DoubleInput
            iconPathInputLeft={tsTonIcon}
            label1InputLeft="tsTON"
            label2InputLeft="Tonstakers"
            label1={'Output'}
            label2={''}
            value={'0'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />

          <DoubleInput
            iconPathInputLeft={tsTonIcon}
            label1InputLeft="tsTON"
            label2InputLeft="Tonstakers"
            label1={''}
            label2={''}
            value={'0'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>

        <button className="button">Mint</button>
      </>
    );
  };

  const ReedemTokensTab = () => {
    return (
      <>
        <div className="flex flex-col gap-4">
          <DoubleInput
            iconPathInputLeft={tsTonIcon}
            label1InputLeft="tsTON"
            label2InputLeft="Tonstakers"
            label1={'Input'}
            label2={'Balance: 0'}
            value={'0'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />

          <DoubleInput
            iconPathInputLeft={tsTonIcon}
            label1InputLeft="tsTON"
            label2InputLeft="Tonstakers"
            label1={''}
            label2={'Balance: 0'}
            value={'0'}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>

        <CircleIcon iconPath={downArrow} />

        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="tsTON"
          label2InputLeft="Tonstakers"
          label1={'Output'}
          label2={''}
          value={'0'}
          onChange={function (value: string): void {
            throw new Error('Function not implemented.');
          }}
        />

        <button className="button">Redeem</button>
      </>
    );
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-start">
          <h1>{activeTab === 'mint' ? 'Mint Liquidity Pools' : 'Redeem Liquidity Pools'}</h1>
          <div className="text-3">
            {activeTab === 'mint'
              ? 'Mint SY tokens back into their corresponding.'
              : 'Redeem SY tokens back into their corresponding.'}{' '}
          </div>
        </div>
        <SegmentedControlButton
          state1="mint"
          state2="redeem"
          label1="Mint"
          label2="Redeem"
          onChange={function (value: string): void {
            setActiveTab(value);
          }}
        />
        {renderTabContent()}
      </div>
    </>
  );
};

export default Converter;
