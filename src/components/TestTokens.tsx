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
    <div className="test-tokens">
      <h2>Get Test Tokens</h2>
      <p>Complete details before submitting.</p>
      <div className="input-group">
        <label>Wallet Address</label>
        <input type="text" value={address} readOnly />
      </div>
      <div className="input-group">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
      </div>
      <Mint address={address} amount={amount} />
    </div>
  );
};

export default TestTokens;