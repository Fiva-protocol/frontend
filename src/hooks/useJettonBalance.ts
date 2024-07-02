import { useState, useEffect, useCallback } from 'react';
import { Address, OpenedContract } from '@ton/core';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { JettonWallet } from '../contracts/JettonWallet';
import { JettonMinter } from '../contracts/JettonMinter';
import { useTonAddress } from '@tonconnect/ui-react';

export function useJettonBalance(minterAddress: Address) {
  const client = useTonClient();
  const userAddress = useTonAddress();
  const [balance, setBalance] = useState<bigint | null>(null);

  const minter = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = JettonMinter.createFromAddress(minterAddress);
    return client.open(contract) as OpenedContract<JettonMinter>;
  }, [client]);

  const getBalance = useCallback(async () => {
    if (!minter || !client || !userAddress) return;

    const userAddr = Address.parse(userAddress);

    try {
      const walletAddress = await minter.getWalletAddress(userAddr);

      const walletContract = new JettonWallet(walletAddress);
      const openedWallet = client.open(walletContract) as OpenedContract<JettonWallet>;

      const walletBalance = await openedWallet.getBalance();
      setBalance(walletBalance);
    } catch (error) {
      console.error('Error getting wallet balance:', error);
    }
  }, [client, userAddress, minter]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
}
