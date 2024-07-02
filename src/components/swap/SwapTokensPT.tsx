import { FC } from 'react';
import { Asset, PoolType, ReadinessStatus, Factory, JettonRoot, VaultJetton } from '@dedust/sdk';
import { Address, SenderArguments, Sender } from '@ton/ton';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '../../hooks/useTonClient';
import '../../App.css';

interface SwapTokensPTProps {
  subTab: 'buy' | 'sell';
  amountIn: string;
}

const SwapTokensPT: FC<SwapTokensPTProps> = ({ subTab, amountIn }) => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const tonClient = useTonClient();

  const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
  const PTAddress = Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK');
  const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');
  const poolAddress = Address.parse('EQDJX39iVmy_pqeYjO47vdT7rYNiYYGzf8f_5duv-4vuYoDW');

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
      const PT = Asset.jetton(PTAddress);

      const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
      const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, PT]));

      if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
        throw new Error('Pool (tsTON, PT) does not exist.');
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
        const ptVault = tonClient.open(await factory.getJettonVault(PTAddress));
        const ptRoot = tonClient.open(JettonRoot.createFromAddress(PTAddress));
        const ptWallet = tonClient.open(await ptRoot.getWallet(Address.parse(userAddress)));

        try {
          await ptWallet.sendTransfer(sender, toNano('0.3'), {
            amount: amountInNano,
            destination: ptVault.address,
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

export default SwapTokensPT;
