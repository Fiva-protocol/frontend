import { FC } from 'react';
import { Asset, PoolType, ReadinessStatus, Factory, JettonRoot, VaultJetton } from '@dedust/sdk';
import { Address, SenderArguments, Sender } from '@ton/ton';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '../../hooks/useTonClient';

interface SwapTokensYTProps {
  subTab: 'buy' | 'sell';
  amountIn: string;
}

const SwapTokensYT: FC<SwapTokensYTProps> = ({ subTab, amountIn }) => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const tonClient = useTonClient();

  const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
  const YTAddress = Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW');
  const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');
  const poolAddress = Address.parse('EQD-7e2KmGadNWp0-QdpTJAkpzBKC9E3e1-zG6Y6_tVzuSwM');

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

  const handleSwapClick = async () => {
    if (userAddress && tonClient && amountIn) {
      const sender = createSender();

      const tsTON = Asset.jetton(tsTONAddress);
      const YT = Asset.jetton(YTAddress);

      const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
      const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, YT]));

      if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
        throw new Error('Pool (tsTON, YT) does not exist.');
      }

      const amountInNano = toNano(amountIn); // Convert input to Nano

      if (subTab === 'buy') {
        const tsTONVault = tonClient.open(await factory.getJettonVault(tsTONAddress));
        const tsTONRoot = tonClient.open(JettonRoot.createFromAddress(tsTONAddress));
        const tsTONWallet = tonClient.open(await tsTONRoot.getWallet(Address.parse(userAddress)));

        try {
          await tsTONWallet.sendTransfer(sender, toNano('0.3'), {
            amount: amountInNano,
            destination: tsTONVault.address,
            responseAddress: Address.parse(userAddress), // return gas to user
            forwardAmount: toNano('0.25'),
            forwardPayload: VaultJetton.createSwapPayload({ poolAddress }),
          });
          console.log('Swap transaction successfully sent');
        } catch (error) {
          console.error('Error in swap transaction:', error);
        }
      } else {
        const ytVault = tonClient.open(await factory.getJettonVault(YTAddress));
        const ytRoot = tonClient.open(JettonRoot.createFromAddress(YTAddress));
        const ytWallet = tonClient.open(await ytRoot.getWallet(Address.parse(userAddress)));

        try {
          await ytWallet.sendTransfer(sender, toNano('0.3'), {
            amount: amountInNano,
            destination: ytVault.address,
            responseAddress: Address.parse(userAddress), // return gas to user
            forwardAmount: toNano('0.25'),
            forwardPayload: VaultJetton.createSwapPayload({ poolAddress }),
          });
          console.log('Swap transaction successfully sent');
        } catch (error) {
          console.error('Error in swap transaction:', error);
        }
      }
    }
  };

  return (
    <button onClick={handleSwapClick} className="button">
      Swap
    </button>
  );
};

export default SwapTokensYT;
