import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Market.css';
import tsTonIcon from '../assets/icons/tsTonIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import Mint from './Mint';
import { useCombinedTvlCalculation } from '../hooks/TVL/useCombinedTvlCalculation';
import { useFivaData } from '../hooks/useFivaData';
import { useImpliedApy } from '../hooks/useImpliedAPY';
import { useTsTonUsdtPrice } from '../hooks/TVL/useTsTonUsdtPrice';
import logo from '../assets/icons/tokenLogo.svg';
import usePtUsdtPrice from '../hooks/TVL/usePtUsdtPrice'
import useYtUsdtPrice from '../hooks/TVL/useYtUsdtPrice ';
import useTonstakersApy from '../hooks/useTonstakersApy ';

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
    <div className="market">
      <div className="market-header">
        <div className="market-title">
          <h2>tsTON</h2>
          <p>Tonstakers</p>
        </div>
        <img src={tsTonIcon} alt="tsTON" className="tsTon-icon" />
      </div>
      <div className="market-details">
        <div className="market-info">
          <span>Maturity</span>
          <span className="info-value">{date.toDateString()}</span>
        </div>
        <div className="market-info">
          <span>Liquidity</span>
          <span className="info-value">$ {combinedTvl}</span>
        </div>
        <div className="market-info">
          <span>Underlying APY</span>
          <span className="info-value">
            {apyLoading ? 'Loading...' : apyError ? 'Error' : `${tonstakersApy?.toFixed(2)}%`}<span className="info-subvalue">Price $ {tsTonPrice?.toFixed(2)}</span></span>
        </div>
        <div className="market-info">
          <span>Implied APY</span>
          <span className="info-value">{formattedImpliedAPY}</span>
        </div>
      </div>
      <div className="market-subdetails" onClick={() => handleNavigation('/swap/yt')} style={{ cursor: 'pointer' }}>
        <div className="market-subdetail">
          <img src={logo} alt="YT Icon" className="subdetail-icon" />
          <div className="subdetail-info">
            <span className="subdetail-value">Long Yield APY</span>
            <span className="subdetail-subvalue">Price $ {ytPrice?.toFixed(2)}</span>
          </div>
          {/* <span className="subdetail-value">-100%</span> */}
        </div>
      </div>
      <div className="market-subdetails" onClick={() => handleNavigation('/swap/pt')} style={{ cursor: 'pointer', marginTop: '10px' }}>
        <div className="market-subdetail">
          <img src={logo} alt="PT Icon" className="subdetail-icon" />
          <div className="subdetail-info">
            <span className="subdetail-value">Fixed APY</span>
            <span className="subdetail-subvalue">Price $ {ptPrice?.toFixed(2)}</span>
          </div>
          <span className="subdetail-value">{formattedImpliedAPY}</span>
        </div>
      </div>
      <div className="action-button-container">
        <Mint address={address}/>
      </div>
    </div>
  );
};

export default Market;
