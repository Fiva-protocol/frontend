import React, { useState, useEffect } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import './TestTokens.css';
import './CommonButton.css';
import Mint from './Mint';

const TestTokens: React.FC = () => {
  const walletAddress = useTonAddress();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<number | string>('');

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    } else {
      setAddress('Connect your wallet');
    }
  }, [walletAddress]);

  return (
    <div>
      <h1>Fiva Test Tokens</h1>
      <br></br>
      <div className="text-3">1) Connect your testnet wallet 
        <br></br>
        2) Click "Get Test Tokens" button
        <br></br>
        <br></br>
        <div className="text-4">If you need some TON for transactions in Testnet - use @testgiver_ton_bot in Telegram </div>

      </div>
      <br></br>
      <Mint />
    </div>
  );
};

export default TestTokens;