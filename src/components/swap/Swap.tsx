import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Swap.css';
import downArrow from '../../assets/icons/downArrow.svg';
import CircleIcon from '../shared/circle-icon/CircleIcon';
import DoubleInput from '../shared/double-input/DoubleInput';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import SegmentedControlButton from '../shared/segmented-control/SegmentedControlButton';
import { useEstimateSwap } from '../../hooks/blockchain/useEstimateSwap';
import { Address, fromNano, Sender, SenderArguments, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '../../hooks/useTonClient';
import '../../App.css'

import SwapTokensPT from './SwapTokensPT'; //F
import SwapTokensYT from './SwapTokensYT'; //F
// import CommonButton from '../CommonButton'; //F

const tsTONAddress = 'kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf';
const PTAddress = 'EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK';
const YTAddress = 'EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW';
const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');
const poolAddressPT = Address.parse('EQDJX39iVmy_pqeYjO47vdT7rYNiYYGzf8f_5duv-4vuYoDW');
const poolAddressYT = Address.parse('EQD-7e2KmGadNWp0-QdpTJAkpzBKC9E3e1-zG6Y6_tVzuSwM');

const Swap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'YT' | 'PT'>('YT');
  const [activeSubTab, setActiveSubTab] = useState<'buy' | 'sell'>('buy');

  const [amountIn, setAmountIn] = useState<string>('');

  const userAddress = useTonAddress(); // Placeholder for wallet connection status

  const navigate = useNavigate();
  const location = useLocation();

  const [swapType, setSwapType] = useState<string>('PT to tsTON'); //sell
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
    setActiveSubTab('buy'); // Reset sub-tab to 'buy' when switching main tabs
    switch (tab) {
      case 'YT':
        navigate('/swap/yt');
        break;
      case 'PT':
        navigate('/swap/pt');
        break;
    }
  };

  const [tonConnectUI] = useTonConnectUI();
  const tonClient = useTonClient();
  // const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');
  // const poolAddressPT = Address.parse('EQDJX39iVmy_pqeYjO47vdT7rYNiYYGzf8f_5duv-4vuYoDW');

  // const [swapAmount, setSwapAmount] = useState<string>(''); // State to manage user input
  // const [actionType, setActionType] = useState<string>('buy'); // State to manage action type

  const createSender = (): Sender => {
    return {
      send: async (args: SenderArguments): Promise<void> => {
        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60, // transaction validity time
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64') || '',
            },
          ],
        };

        await tonConnectUI.sendTransaction(transaction);
      },
    };
  };

  //   const handleSwapClickYT = async () => {
  //     if (userAddress && tonClient && amountIn) {
  //         const sender = createSender();

  //         const tsTON = Asset.jetton(Address.parse(tsTONAddress));
  //         const YT = Asset.jetton(Address.parse(YTAddress));

  //         const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
  //         const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, YT]));

  //         if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
  //             throw new Error('Pool (tsTON, YT) does not exist.');
  //         }

  //         // const amountIn = toNano(swapAmount); // Convert input to Nano

  //         if (activeSubTab === 'buy') {
  //             const tsTONVault = tonClient.open(await factory.getJettonVault(Address.parse(tsTONAddress)));
  //             const tsTONRoot = tonClient.open(JettonRoot.createFromAddress(Address.parse(tsTONAddress)));
  //             const tsTONWallet = tonClient.open(await tsTONRoot.getWallet(Address.parse(userAddress)));

  //             try {
  //                 await tsTONWallet.sendTransfer(sender, toNano('0.3'), {
  //                     amount: toNano(amountIn),
  //                     destination: tsTONVault.address,
  //                     responseAddress: Address.parse(userAddress), // return gas to user
  //                     forwardAmount: toNano('0.25'),
  //                     forwardPayload: VaultJetton.createSwapPayload({ poolAddressYT }),
  //                 });
  //                 console.log('Swap transaction successfully sent');
  //             } catch (error) {
  //                 console.error('Error in swap transaction:', error);
  //             }
  //         } else {
  //             const ytVault = tonClient.open(await factory.getJettonVault(Address.parse(YTAddress)));
  //             const ytRoot = tonClient.open(JettonRoot.createFromAddress(Address.parse(YTAddress)));
  //             const ytWallet = tonClient.open(await ytRoot.getWallet(Address.parse(userAddress)));

  //             try {
  //                 await ytWallet.sendTransfer(sender, toNano('0.3'), {
  //                     amount: toNano(amountIn),
  //                     destination: ytVault.address,
  //                     responseAddress: Address.parse(userAddress), // return gas to user
  //                     forwardAmount: toNano('0.25'),
  //                     forwardPayload: VaultJetton.createSwapPayload({ poolAddressYT }),
  //                 });
  //                 console.log('Swap transaction successfully sent');
  //             } catch (error) {
  //                 console.error('Error in swap transaction:', error);
  //             }
  //         }
  //     }
  // };

  //   const handleSwapClickPT = async () => {
  //     if (userAddress && tonClient && amountIn) {
  //       const sender = createSender();

  //       const tsTON = Asset.jetton(Address.parse(tsTONAddress));
  //       const PT = Asset.jetton(Address.parse(PTAddress));

  //       const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
  //       const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, PT]));

  //       if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
  //         throw new Error('Pool (tsTON, PT) does not exist.');
  //       }

  //       // amountIn = toNano(amountIn); // Convert input to Nano

  //       if (activeSubTab === 'buy') {
  //         const tsTONVault = tonClient.open(await factory.getJettonVault(Address.parse(tsTONAddress)));
  //         const tsTONRoot = tonClient.open(JettonRoot.createFromAddress(Address.parse(tsTONAddress)));
  //         const tsTONWallet = tonClient.open(await tsTONRoot.getWallet(Address.parse(userAddress)));

  //         try {
  //           await tsTONWallet.sendTransfer(sender, toNano('0.3'), {
  //             amount: toNano(amountIn),
  //             destination: tsTONVault.address,
  //             responseAddress: Address.parse(userAddress), // return gas to user
  //             forwardAmount: toNano('0.25'),
  //             forwardPayload: VaultJetton.createSwapPayload({ poolAddressPT }),
  //           });
  //           console.log('Swap transaction successfully sent');
  //         } catch (error) {
  //           console.error('Error in swap transaction:', error);
  //         }
  //       } else {
  //         const ptVault = tonClient.open(await factory.getJettonVault(Address.parse(PTAddress)));
  //         const ptRoot = tonClient.open(JettonRoot.createFromAddress(Address.parse(PTAddress)));
  //         const ptWallet = tonClient.open(await ptRoot.getWallet(Address.parse(userAddress)));

  //         try {
  //           await ptWallet.sendTransfer(sender, toNano('0.3'), {
  //             amount: toNano(amountIn),
  //             destination: ptVault.address,
  //             responseAddress: Address.parse(userAddress), // return gas to user
  //             forwardAmount: toNano('0.25'),
  //             forwardPayload: VaultJetton.createSwapPayload({ poolAddressPT }),
  //           });
  //           console.log('Swap transaction successfully sent');
  //         } catch (error) {
  //           console.error('Error in swap transaction:', error);
  //         }
  //       }
  //     }
  //   };

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

        {/* {userAddress ? (
          <div>
            <p>Amount Out: {fromNano(resultYT?.amountOut?.toString() ?? '0')}</p>
            <p>Trade Fee: {fromNano(resultYT?.tradeFee?.toString() ?? '0')}</p>
          </div>
        ) : (
          <p>nie ma</p>
        )} */}

        <SegmentedControlButton
          state1="buy"
          state2="sell"
          label1="Buy"
          label2="Sell"
          onChange={function (value: 'buy' | 'sell'): void {
            setActiveSubTab(value);
          }}
        />

        <DoubleInput
          iconPathInputLeft={tsTonIcon}
          label1InputLeft="tsTON"
          label2InputLeft="Tonstakers"
          label1={'Input'}
          label2={'Balance: 0'}
          isReadOnly={false}
          inputType="number"
          value={'0'}
          onChange={(value) => setAmountIn(value)}
        />
        {/* TODO: change downArrow to changeArrow */}
        <div>
          <CircleIcon iconPath={downArrow} />
          {/* {/* TODO: change to disabled*/}
          <div className="flex flex-col gap-2">
            <DoubleInput
              iconPathInputLeft={tsTonIcon}
              // TODO: change to tsTON dynamically
              label1InputLeft={activeTab === 'YT' && activeSubTab === 'buy' ? 'YT tsTON' : 'Tonstakers'}
              label2InputLeft="Tonstakers"
              label1={'Output'}
              label2={''}
              isReadOnly={true}
              inputType="string"
              value={fromNano(resultYT?.amountOut?.toString() ?? '0')}
              onChange={function (value: string): void {}}
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
            {/* <div className="action-button-container">
              <button
                onClick={() => console.log(`${activeSubTab === 'buy' ? 'Buy' : 'Sell'} ${activeTab} clicked`)}
                className="button"
              >
                Swap
              </button>
            </div> */}
          </>
        ) : (
          <></>
          // <div className="action-button-container">
          //   <button className="button" onClick={() => console.log(`${activeSubTab === 'buy' ? 'Buy' : 'Sell'} ${activeTab} clicked`)}>
          //     {activeSubTab === 'buy' ? `Buy ${activeTab}` : `Sell ${activeTab}`}
          //   </button>
          // </div>
        )}
      </div>

      {/* <div className="swap-page">
        <div className="swap-content">
          <div className="swap-section">
            <div className="input-group">
              <div className="input-row">
                <select className="input-select">
                  <option>Token 1</option>
                </select>
                <input type="number" className="input-number" placeholder="Amount" />
              </div>
              <div className="swap-icon">
                <img src={downArrow} alt="Swap" />
              </div>
              <div className="input-row">
                <select className="input-select">
                  <option>Token 1</option>
                </select>
                <input type="number" className="input-number" placeholder="Amount" />
              </div>
            </div>
          </div>
          <div className="action-button-container">
            <CommonButton
              onClick={() => console.log(`${activeSubTab === 'buy' ? 'Buy' : 'Sell'} ${activeTab} clicked`)}
              text={activeSubTab === 'buy' ? `Buy ${activeTab}` : `Sell ${activeTab}`}
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Swap;
