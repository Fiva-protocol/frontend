import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Market.css';
import ytIcon from '../../assets/icons/ytIcon.svg';
import ptIcon from '../../assets/icons/ptIcon.svg';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import Mint from '../Mint';
import { useCombinedTvlCalculation } from '../../hooks/TVL/useCombinedTvlCalculation';
import { useFivaData } from '../../hooks/useFivaData';
import { useImpliedApy } from '../../hooks/useImpliedAPY';
import { useTsTonUsdtPrice } from '../../hooks/TVL/useTsTonUsdtPrice';
import logo from '../../assets/icons/tokenLogo.svg';
import usePtUsdtPrice from '../../hooks/TVL/usePtUsdtPrice'
import useYtUsdtPrice from '../../hooks/TVL/useYtUsdtPrice ';
import useTonstakersApy from '../../hooks/useTonstakersApy ';
import { calculateDaysToMaturity } from '../../utils/dateCalc';

const Market: React.FC = () => {
  const address = useTonAddress();
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  const combinedTvl = useCombinedTvlCalculation();
  const {date} = useFivaData();
  const results = useImpliedApy();
  const impliedAPY = results?.impliedApy;
  const formattedImpliedAPY = impliedAPY ? (impliedAPY * 100).toFixed(2) + '%' : '0.00%';
  const { tsTonPrice } = useTsTonUsdtPrice();
  const ptResults = usePtUsdtPrice();
  const ptPrice = ptResults.ptPrice;
  const ytResults = useYtUsdtPrice();
  const ytPrice = ytResults.ytPrice;

  const { apy: tonstakersApy, loading: apyLoading, error: apyError } = useTonstakersApy();

  return (
    <>
      <div className="container mx-auto px-6 py-8 flex flex-col gap-8">
        <div className="pool-card gap-4" onClick={() => handleCardClick(type)}>
          <div className="flex flex-row justify-between w-full">
            <div>
              <div className="text-1">tsTON</div>
              <div className="text-gray-400">Tonstakers</div>
            </div>
            <img src={tsTonIcon} alt="tsTON" className="tsTon-icon max-w-7" />
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full">
              <div>Maturity</div>
              <div className="flex flex-row gap-2">
              {date.toDateString()} <div className="text-gray-300">{calculateDaysToMaturity(date.toDateString())} days</div>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Liquidity</div>
              <div className="flex flex-row gap-2">$ {combinedTvl}</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Underlying APY</div>
              <div className="flex flex-row gap-2">{apyLoading ? 'Loading...' : apyError ? 'Error' : `${tonstakersApy?.toFixed(2)}%`}</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Price</div>
              <div className="flex flex-row gap-2">Price $ {tsTonPrice?.toFixed(2)}</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Implied APY</div>
              <div className="flex flex-row gap-2">{formattedImpliedAPY}</div>
            </div>
          </div>

          <div className="w-full">
            <div
              className="flex w-full justify-between market-subdetails"
              onClick={() => handleNavigation('/swap/yt')}
              style={{ cursor: 'pointer' }}
            >
              <div className="market-subdetail flex w-full justify-between">
                <img src={logo} alt="YT Icon" className="subdetail-icon" />
                <div className="subdetail-info">
                  <span className="subdetail-value">Long Yield APY</span>
                  <span className="subdetail-subvalue">Price $ {ytPrice?.toFixed(2)}</span>
                </div>
                {/* <span className="subdetail-value">-100%</span> */}
              </div>
            </div>

            <div
              className="flex w-full justify-between market-subdetails"
              onClick={() => handleNavigation('/swap/pt')}
              style={{ cursor: 'pointer', marginTop: '10px' }}
            >
              <div className="market-subdetail flex w-full justify-between">
                <img src={logo} alt="PT Icon" className="subdetail-icon" />
                <div className="subdetail-info">
                  <span className="subdetail-value">Fixed APY</span>
                  <span className="subdetail-subvalue">Price $ {ptPrice?.toFixed(2)}</span>
                </div>
                <span className="subdetail-value">{formattedImpliedAPY}</span>
              </div>
            </div>
          </div>

        </div>

        <Mint address={address} />
      </div>


    </>
  );
};

export default Market;
