import { FC, useState } from 'react';
import { Asset, Factory, JettonRoot, PoolType, VaultJetton } from '@dedust/sdk';
import { toNano } from '@ton/core';
import { Address,  SenderArguments, Sender } from '@ton/ton';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useJettonMinter } from '../hooks/useJettonMinter';
import { useTonClient } from '../hooks/useTonClient';

interface ProvideLiquidityForYTProps {}

const ProvideLiquidityForYT: FC<ProvideLiquidityForYTProps> = ({}) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();
    const tonClient = useTonClient();

    const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
    const YTAddress = Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW');
    const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');

    const { jettonWalletAddress: tsTONWallet } = useJettonMinter(tsTONAddress, Address.parse(userAddress));
    const { jettonWalletAddress: YTWallet } = useJettonMinter(YTAddress, Address.parse(userAddress));

    const [tsTONAmount, setTsTONAmount] = useState<string>('5');
    const [YTAmount, setYTAmount] = useState<string>('5');

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

    const handleTsTONClick = async () => {
        if (userAddress && tsTONWallet && tonClient) {
            const sender = createSender();
            const tsTONAmountBN = toNano(tsTONAmount); // Convert input to Nano

            const tsTON = Asset.jetton(tsTONAddress);
            const YT = Asset.jetton(YTAddress);
            const assets: [Asset, Asset] = [tsTON, YT];
            const targetBalances: [bigint, bigint] = [tsTONAmountBN, toNano(YTAmount)];

            const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
            const tsTONVault = tonClient.open(await factory.getJettonVault(tsTONAddress));
            const tsTONRoot = tonClient.open(JettonRoot.createFromAddress(tsTONAddress));
            const userTsTONWallet = tonClient.open(await tsTONRoot.getWallet(Address.parse(userAddress)));

            try {
                await userTsTONWallet.sendTransfer(sender, toNano('0.6'), {
                    amount: tsTONAmountBN,
                    destination: tsTONVault.address,
                    responseAddress: Address.parse(userAddress),
                    forwardAmount: toNano('0.5'),
                    forwardPayload: VaultJetton.createDepositLiquidityPayload({
                        poolType: PoolType.VOLATILE,
                        assets,
                        targetBalances,
                    }),
                });
                console.log('tsTON transaction successfully sent');
            } catch (error) {
                console.error('Error in tsTON transaction:', error);
            }
        }
    };

    const handleYTClick = async () => {
        if (userAddress && YTWallet && tonClient) {
            const sender = createSender();
            const YTAmountBN = toNano(YTAmount); // Convert input to Nano

            const tsTON = Asset.jetton(tsTONAddress);
            const YT = Asset.jetton(YTAddress);
            const assets: [Asset, Asset] = [tsTON, YT];
            const targetBalances: [bigint, bigint] = [toNano(tsTONAmount), YTAmountBN];

            const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
            const YTVault = tonClient.open(await factory.getJettonVault(YTAddress));
            const YTRoot = tonClient.open(JettonRoot.createFromAddress(YTAddress));
            const userYTWallet = tonClient.open(await YTRoot.getWallet(Address.parse(userAddress)));

            try {
                await userYTWallet.sendTransfer(sender, toNano('0.6'), {
                    amount: YTAmountBN,
                    destination: YTVault.address,
                    responseAddress: Address.parse(userAddress),
                    forwardAmount: toNano('0.5'),
                    forwardPayload: VaultJetton.createDepositLiquidityPayload({
                        poolType: PoolType.VOLATILE,
                        assets,
                        targetBalances,
                    }),
                });
                console.log('YT transaction successfully sent');
            } catch (error) {
                console.error('Error in YT transaction:', error);
            }
        }
    };

    return (
        <div className="flex flex-col my-10 mx-5">
            <h1 className="text-2xl mb-2">Provide Liquidity for YT Token</h1>
            <input
                type="text"
                placeholder="Enter tsTON amount"
                value={tsTONAmount}
                onChange={(e) => setTsTONAmount(e.target.value)} // Update state on input change
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Enter YT amount"
                value={YTAmount}
                onChange={(e) => setYTAmount(e.target.value)} // Update state on input change
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleTsTONClick}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Provide Liquidity for tsTON
            </button>
            <button
                onClick={handleYTClick}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Provide Liquidity for YT
            </button>
        </div>
    );
};

export default ProvideLiquidityForYT;
