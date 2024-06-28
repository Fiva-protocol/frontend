// src/components/TonConnectButton.js
import React, { useEffect, useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';

const tonConnect = new TonConnect();

const TonConnectButton = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Восстановление подключения при загрузке компонента
    tonConnect.restoreConnection().then(wallet => {
      setWallet(wallet);
    });

    // Слушатель изменений статуса подключения
    tonConnect.onStatusChange(wallet => {
      setWallet(wallet);
    });
  }, []);

  const connectWallet = async () => {
    try {
      await tonConnect.connect();
      const connectedWallet = tonConnect.wallet;
      setWallet(connectedWallet);
    } catch (error) {
      console.error('Failed to connect wallet', error);
    }
  };

  const disconnectWallet = () => {
    tonConnect.disconnect();
    setWallet(null);
  };

  return (
    <button onClick={wallet ? disconnectWallet : connectWallet}>
      {wallet ? `Connected: ${wallet.address}` : 'Connect Wallet'}
    </button>
  );
};

export default TonConnectButton;

