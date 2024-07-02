import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Market.css';
import ytIcon from '../../assets/icons/ytIcon.svg';
import ptIcon from '../../assets/icons/ptIcon.svg';
import tsTonIcon from '../../assets/icons/tsTonIcon.svg';
import { useTonAddress } from '@tonconnect/ui-react';
import Mint from '../Mint';

const Market: React.FC = () => {
  const address = useTonAddress();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

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
                27 Jun 2024 <div className="text-gray-300">15 days</div>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Liquidity</div>
              <div className="flex flex-row gap-2">$34,868,190.62</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Underlying APY</div>
              <div className="flex flex-row gap-2">2,448%</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Price</div>
              <div className="flex flex-row gap-2">$3,552.24</div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>Implied APY</div>
              <div className="flex flex-row gap-2">18.67%</div>
            </div>
          </div>

          <div className="w-full">
            <div
              className="flex w-full justify-between market-subdetails"
              onClick={() => handleNavigation('/swap/yt')}
              style={{ cursor: 'pointer' }}
            >
              <div className="market-subdetail flex w-full justify-between">
                <img src={ytIcon} alt="YT Icon" className="subdetail-icon" />
                <div className="subdetail-info">
                  <span className="subdetail-value">Long Yield APY</span>
                  <span className="subdetail-subvalue">Price $26.23</span>
                </div>
                <span className="subdetail-value">-100%</span>
              </div>
            </div>

            <div
              className="flex w-full justify-between market-subdetails"
              onClick={() => handleNavigation('/swap/pt')}
              style={{ cursor: 'pointer', marginTop: '10px' }}
            >
              <div className="market-subdetail flex w-full justify-between">
                <img src={ptIcon} alt="PT Icon" className="subdetail-icon" />
                <div className="subdetail-info">
                  <span className="subdetail-value">Fixed APY</span>
                  <span className="subdetail-subvalue">Price $3,526.51</span>
                </div>
                <span className="subdetail-value">18.67%</span>
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
