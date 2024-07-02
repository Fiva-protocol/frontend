import { useCallback } from 'react';
import { Address, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useJettonMinter } from './useJettonMinter';
import { claim } from '../utils/claim';

export const useClaimTokens = () => {
  const [tonConnectUI] = useTonConnectUI();

  const jettonMinterAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
  const userAddress = useTonAddress();

  const { jettonWalletAddress } = useJettonMinter(
    jettonMinterAddress,
    Address.parse(userAddress ? userAddress : 'kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf')
  );

  const masterAddress = Address.parse('EQAHmEAgPST8XV4GN6r6E4NesuLs7lDbzsSW1ougMxItut9S');
  const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
  const { jettonWalletAddress: tsTONMasterWallet } = useJettonMinter(tsTONAddress, masterAddress);

  const claimTokens = useCallback(async () => {
    if (userAddress && jettonWalletAddress) {
      const amount = toNano('0.2'); // doesn't matter

      try {
        await claim(tonConnectUI, masterAddress, tsTONMasterWallet!, amount);
        console.log('Successfully sent transaction');
      } catch (error) {
        console.error(error);
      }
    }
  }, [tonConnectUI, userAddress, jettonWalletAddress, masterAddress, tsTONMasterWallet]);

  return { claimTokens };
};
