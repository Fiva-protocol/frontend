import React from 'react';
import './Dashboard.css';
import lpIcon from '../../assets/icons/lpIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import { useJettonBalance } from '../../hooks/useJettonBalance';
import { useLPBalance } from '../../hooks/pools/useLPBalance';
import { Address, fromNano } from '@ton/core';
import usePtUsdtPrice from '../../hooks/TVL/usePtUsdtPrice';
import useYtUsdtPrice from '../../hooks/TVL/useYtUsdtPrice ';
import logo from '../../assets/icons/tokenLogo.svg';
import { useImpliedApy } from '../../hooks/useImpliedAPY';
import { useClaimTokens } from '../../hooks/useClaimTokens';  // Import the custom hook



const Dashboard: React.FC = () => {
  const address = useTonAddress();

  const ptBalance = useJettonBalance(Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK'));
  const ytBalance = useJettonBalance(Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW'));
  const pTLPBalance = useLPBalance('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf', 'EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK');
  const YTLPBalance = useLPBalance('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf', 'EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW');


  const ptResults = usePtUsdtPrice();
  const ptRate = ptResults.ptPrice || 0;
  const ytResults = useYtUsdtPrice();
  const ytRate = ytResults.ytPrice || 0;

  const ptBalanceUSD = ptBalance ? Number(fromNano(ptBalance)) * ptRate : 0;
  const ytBalanceUSD = ytBalance ? Number(fromNano(ytBalance)) * ytRate : 0;

  const formattedPTLPBalance = pTLPBalance ? Number(fromNano(pTLPBalance)) : 0;
  const formattedYTLPBalance = YTLPBalance ? Number(fromNano(YTLPBalance)) : 0;

  const impliedResults = useImpliedApy();
  const impliedAPY = impliedResults?.impliedApy || 0;
  const formattedImpliedAPY = (impliedAPY * 100).toFixed(2) + '%';

  const totalBalance = (ptBalanceUSD + ytBalanceUSD).toFixed(2);
  const totalLPBalance = (formattedPTLPBalance + formattedYTLPBalance).toFixed(2);

  const {claimTokens} = useClaimTokens();

  // const ptBalanceUSD = (Number(fromNano(ptBalance!)) * ptRate!).toFixed(2)
  // const ytBalanceUSD = Number(ytBalance!) * ytRate! 
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-5)}`;
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-start">
          <h1>My Dashboard</h1>
          <div className="text-gray-400">
            <p>{address ? formatAddress(address) : 'Connect wallet'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4V21M7.5 17.0078L8.8185 17.9414C10.575 19.1867 13.4235 19.1867 15.1815 17.9414C16.9395 16.6962 16.9395 14.6788 15.1815 13.4336C14.304 12.8103 13.152 12.5 12 12.5C10.9125 12.5 9.825 12.1883 8.9955 11.5664C7.3365 10.3212 7.3365 8.30383 8.9955 7.05858C10.6545 5.81333 13.3455 5.81333 15.0045 7.05858L15.627 7.52608"
                  stroke="#C9C9C9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              My Current Balance
            </div>
            <div>$ {totalBalance}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 14.25V16.5M10.5 12V16.5M13.5 9.75V16.5M16.5 7.5V16.5M6 20.25H18C18.5967 20.25 19.169 20.0129 19.591 19.591C20.0129 19.169 20.25 18.5967 20.25 18V6C20.25 5.40326 20.0129 4.83097 19.591 4.40901C19.169 3.98705 18.5967 3.75 18 3.75H6C5.40326 3.75 4.83097 3.98705 4.40901 4.40901C3.98705 4.83097 3.75 5.40326 3.75 6V18C3.75 18.5967 3.98705 19.169 4.40901 19.591C4.83097 20.0129 5.40326 20.25 6 20.25Z"
                  stroke="#C9C9C9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              My LP Balance
            </div>
            <div>LP {totalLPBalance}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.05 4.575C10.05 4.36817 10.0093 4.16336 9.93011 3.97227C9.85096 3.78119 9.73495 3.60756 9.58869 3.46131C9.44244 3.31505 9.26881 3.19904 9.07773 3.11989C8.88664 3.04074 8.68183 3 8.475 3C8.26817 3 8.06336 3.04074 7.87227 3.11989C7.68119 3.19904 7.50756 3.31505 7.36131 3.46131C7.21505 3.60756 7.09904 3.78119 7.01989 3.97227C6.94074 4.16336 6.9 4.36817 6.9 4.575V7.575M10.05 4.575V3.075C10.05 2.65728 10.2159 2.25668 10.5113 1.96131C10.8067 1.66594 11.2073 1.5 11.625 1.5C12.0427 1.5 12.4433 1.66594 12.7387 1.96131C13.0341 2.25668 13.2 2.65728 13.2 3.075V4.575M10.05 4.575L10.125 10.5M6.9 7.575C6.9 7.15728 6.73406 6.75668 6.43869 6.46131C6.14332 6.16594 5.74272 6 5.325 6C4.90728 6 4.50668 6.16594 4.21131 6.46131C3.91594 6.75668 3.75 7.15728 3.75 7.575V15.75C3.75 17.5402 4.46116 19.2571 5.72703 20.523C6.9929 21.7888 8.70979 22.5 10.5 22.5H12.518C13.9103 22.4998 15.2456 21.9466 16.23 20.962L17.962 19.23C18.9466 18.2456 19.4998 16.9103 19.5 15.518L19.503 13.494C19.504 13.317 19.5752 13.1476 19.701 13.023C19.8473 12.8767 19.9633 12.703 20.0425 12.5119C20.1217 12.3208 20.1624 12.1159 20.1624 11.909C20.1624 11.7021 20.1217 11.4972 20.0425 11.3061C19.9633 11.115 19.8473 10.9413 19.701 10.795C19.5547 10.6487 19.381 10.5327 19.1899 10.4535C18.9988 10.3743 18.7939 10.3336 18.587 10.3336C18.3801 10.3336 18.1752 10.3743 17.9841 10.4535C17.793 10.5327 17.6193 10.6487 17.473 10.795C16.7595 11.5076 16.3568 12.4736 16.353 13.482M6.9 7.575V12M13.2 4.575V11.25M13.2 4.575C13.2 4.15728 13.3659 3.75668 13.6613 3.46131C13.9567 3.16594 14.3573 3 14.775 3C15.1927 3 15.5933 3.16594 15.8887 3.46131C16.1841 3.75668 16.35 4.15728 16.35 4.575V15M16.35 15C15.7593 14.9997 15.1744 15.116 14.6287 15.3421C14.083 15.5683 13.5873 15.8999 13.17 16.318M16.35 15H16.352"
                  stroke="#C9C9C9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              My Claimable Yield
            </div>
            <div>$0.00</div>
          </div>
        </div>

        <button className="button"  onClick={claimTokens}>Claim Yield & Rewards</button>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-between market-subdetails px-5">
            <div className="market-subdetail flex w-full justify-between">
              <img src={logo} alt="YT Icon" className="subdetail-icon" />
              <div className="subdetail-info flex flex-col">
                <span className="subdetail-value">YT tsTON</span>
                {/* <span className="text-4">APY</span> */}
              </div>
              <span className="subdetail-value">$ {(ytBalanceUSD).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex w-full justify-between market-subdetails px-5">
            <div className="market-subdetail flex w-full justify-between ">
              <img src={logo} alt="PT Icon" className="subdetail-icon" />
              <div className="subdetail-info  flex flex-col">
                <span className="subdetail-value">PT tsTON</span>
                <span className="text-4">APY {formattedImpliedAPY}</span>
              </div>
              <span className="subdetail-value">$ {(ptBalanceUSD).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex w-full justify-between market-subdetails px-5">
            <div className="market-subdetail flex w-full justify-between">
              <img src={lpIcon} alt="LP Icon" className="subdetail-icon" />
              <div className="subdetail-info  flex flex-col">
                <span className="subdetail-value"> LP PT </span>
              </div>
              <span className="subdetail-value">LP {(formattedPTLPBalance).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex w-full justify-between market-subdetails px-5">
            <div className="market-subdetail flex w-full justify-between">
              <img src={lpIcon} alt="LP Icon" className="subdetail-icon" />
              <div className="subdetail-info  flex flex-col">
                <span className="subdetail-value">LP YT</span>
              </div>
              <span className="subdetail-value">LP {(formattedYTLPBalance).toFixed(2)}</span>
            </div>
          </div>
        </div>

     
      </div>
    </>
  );
};

export default Dashboard;
