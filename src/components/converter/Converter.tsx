import React, { useState, useEffect, useCallback } from 'react';
import './Converter.css';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import logo from '../../assets/icons/tokenLogo.svg';
import downArrow from '../../assets/icons/downArrow.svg';
import CircleIcon from '../shared/circle-icon/CircleIcon';
import { useTonAddress } from '@tonconnect/ui-react';
import MintFiva from './MintYTPT';
import RedeemFiva from './Redeem';
import { Address, fromNano } from '@ton/core';
import { useJettonBalance } from '../../hooks/useJettonBalance';
import { useFivaData } from '../../hooks/useFivaData';


enum Tab {
  Mint = 'mint',
  Redeem = 'redeem',
}

const Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mint);
  const [inputValue, setInputValue] = useState<number | string>('');
  const userAddress = useTonAddress();


  // const blockchainIndex = 1;  // value from blockchain
  const { index, date } = useFivaData();
  console.log("index", index)
  console.log("date", date)
  const blockchainIndex = index ? (Number(index) / 1000) : 1;
  console.log("blockchainIndex", blockchainIndex)




  const ytBalance = useJettonBalance(Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW'));
  const ptBalance = useJettonBalance(Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK'));
  const tsTONBalance = useJettonBalance(Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf'));

  const formatYtBalance = ytBalance ? Number(fromNano(ytBalance)).toFixed(2) : '0.00';
  // console.log("ytBalance", ytBalance)
  // console.log("ytBalance", formatYtBalance)
  const formatPtBalance = ptBalance ? Number(fromNano(ptBalance)).toFixed(2) : '0.00';
  // console.log("ptBalance", ptBalance)
  // console.log("ptBalance", formatPtBalance)
  const formatTsBalance = tsTONBalance ? Number(fromNano(tsTONBalance)).toFixed(2) : '0.00';
  // console.log("tsBalance", tsTONBalance)
  // console.log("tsBalance", formatTsBalance)
  

  const calculateValues = (value: number) => {
    return {
      tsTon: value,
      pt: (value * blockchainIndex).toFixed(2),
      yt: (value * blockchainIndex).toFixed(2),
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
    return (value / blockchainIndex).toFixed(2);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.Mint:
        return (
          <div className="converter-section">
            <h1>Mint your Tokens</h1>
            <p>Mint SY tokens back into their corresponding.</p>
                <div className="flex rounded-xl space-between" style={{ backgroundColor: '#232336' }}>
                  <span
                    className={`flex m-1 justify-center w-full py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out
                    }`}
                    style={{ backgroundColor: activeTab === Tab.Mint ? '#6161D6' : '' }}
                    onClick={() => {setActiveTab(Tab.Mint); setInputValue('')}}
                  >
                    Mint
                  </span>
                  <span
                    className={`flex m-1  justify-center w-full text-white text-sm py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out 
                    }`}
                    style={{ backgroundColor: activeTab === Tab.Redeem ? '#6161D6' : '' }}
                    onClick={() => {setActiveTab(Tab.Redeem); setInputValue('')}}
                  >
                    Redeem
                  </span>
                </div>
            <br></br>
            <div className="input-group">
              <div>
                <div className="flex flex-row justify-between">
                  <label className="flex pb-1">Input</label>
                  <label className="flex pb-1">Balance: {formatTsBalance}</label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={tsTonIcon} alt="" />
                      <div className="flex flex-col">
                        <div>tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>
                  <input  type="number" className="half-input-right w-1/2" value={inputValue} onChange={handleInputChange} min="0" placeholder='0'></input>
                </div>
              </div>

              
            </div>
            <div>
              <CircleIcon iconPath={downArrow} />
            </div>
            <div className="output-group">
            <div>
              <div className="flex flex-row justify-between">
                <label className="flex pb-1">Output</label>
                <label className="flex pb-1"></label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={logo} alt="" />
                      <div className="flex flex-col">
                        <div>YT tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>

                <input  type="number" className="half-input-right w-1/2" value={ytValue} readOnly placeholder='0.00'></input>
              </div>
            </div>
              <div>
                <br></br>
              <div className="flex flex-row justify-between">
                <label className="flex pb-1"></label>
                <label className="flex pb-1"></label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={logo} alt="" />
                      <div className="flex flex-col">
                        <div>PT tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>

                <input  type="number" className="half-input-right w-1/2" value={ptValue} readOnly placeholder='0.00'></input>
              </div>
            </div>
            </div>
            {userAddress ? (
              <MintFiva inputValue={inputValue.toString()} />  
            ) : (
              <button className="button" onClick={() => {/* wallet connection info ? */}}>
                Please connect wallet
              </button>
            )}
          </div>
        );
        case Tab.Redeem:
          return (
            <div className="converter-section">
              <h1>Redeem your Tokens</h1>
              <p>Redeem SY tokens back into their corresponding.</p>
              
                <div className="flex rounded-xl space-between" style={{ backgroundColor: '#232336' }}>
                  <span
                    className={`flex m-1 justify-center w-full py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out
                    }`}
                    style={{ backgroundColor: activeTab === Tab.Mint ? '#6161D6' : '' }}
                    onClick={() => {setActiveTab(Tab.Mint); setInputValue('')}}
                  >
                    Mint
                  </span>
                  <span
                    className={`flex m-1 justify-center w-full py-2 px-4 cursor-pointer rounded-lg transition duration-200 ease-in-out
                    }`}
                    style={{ backgroundColor: activeTab === Tab.Redeem ? '#6161D6' : '' }}
                    onClick={() => {setActiveTab(Tab.Redeem); setInputValue('')}}
                  >
                    Redeem
                  </span>
                </div>
              
              <br></br>
            <div>
              <div className="flex flex-row justify-between">
                <label className="flex pb-1">Input</label>
                <label className="flex pb-1">Balance: {formatYtBalance}</label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={logo} alt="" />
                      <div className="flex flex-col">
                        <div>YT tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>

                <input  type="number" className="half-input-right w-1/2" value={inputValue} onChange={handleInputChange} min="0" placeholder='0'></input>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <label className="flex pb-1"></label>
                <label className="flex pb-1">Balance: <>{formatPtBalance}</></label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={logo} alt="" />
                      <div className="flex flex-col">
                        <div>PT tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>

                <input  type="number" className="half-input-right w-1/2" value={inputValue} onChange={handleInputChange} min="0" placeholder='0'></input>
              </div>
            </div>
              <div>
                <br></br>
                <CircleIcon iconPath={downArrow} />
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <label className="flex pb-1">Output</label>
                  <label className="flex pb-1"></label>
              </div>
        
              <div className="flex flex-row">
                <div className="half-input-left w-1/2">
                  <div className="flex flex-row items-center gap-2">
                    <img src={tsTonIcon} alt="" />
                      <div className="flex flex-col">
                        <div>tsTON</div>
                        <div className="text-4">Tonstakers</div>
                      </div>
                    </div>
                </div>
                  <input  type="number" className="half-input-right w-1/2" value={calculateTSton(inputValue)} readOnly placeholder='0.00'></input>
                </div>
              </div>
              <div>
                {!userAddress ? (
                  <><br></br>
                  <button className="button" onClick={() => {/* wallet connection info ? */}}>
                  Please connect wallet
                  </button></>
                  ) : (
                    <><br></br>
                    <RedeemFiva inputValue={inputValue.toString()} /></>
                  )}
              </div>
              </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="converter-page">
      <div className="converter-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Converter;
