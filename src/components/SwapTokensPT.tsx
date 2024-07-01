import { FC, useState } from 'react';
import { Asset, PoolType, ReadinessStatus, Factory, JettonRoot, VaultJetton } from '@dedust/sdk';
import { Address, SenderArguments, Sender } from '@ton/ton';
import { toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '../hooks/useTonClient';

interface SwapTokensProps {}

const SwapTokensPT: FC<SwapTokensProps> = ({}) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();
    const tonClient = useTonClient();

    const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
    const PTAddress = Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK');
    const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');
    const poolAddress = Address.parse('EQDJX39iVmy_pqeYjO47vdT7rYNiYYGzf8f_5duv-4vuYoDW');

    const [swapAmount, setSwapAmount] = useState<string>('');  // State to manage user input
    const [actionType, setActionType] = useState<string>('buy');  // State to manage action type

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
        if (userAddress && tonClient && swapAmount) {
            const sender = createSender();

            const tsTON = Asset.jetton(tsTONAddress);
            const PT = Asset.jetton(PTAddress);

            const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
            const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, PT]));

            if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
                throw new Error('Pool (tsTON, PT) does not exist.');
            }

            const amountIn = toNano(swapAmount); // Convert input to Nano

            if (actionType === 'buy') {
                const tsTONVault = tonClient.open(await factory.getJettonVault(tsTONAddress));
                const tsTONRoot = tonClient.open(JettonRoot.createFromAddress(tsTONAddress));
                const tsTONWallet = tonClient.open(await tsTONRoot.getWallet(Address.parse(userAddress)));

                try {
                    await tsTONWallet.sendTransfer(sender, toNano('0.3'), {
                        amount: amountIn,
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
                        amount: amountIn,
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
        <div className="flex flex-col my-10 mx-5">
            <h1 className="text-2xl mb-2">Swap Tokens tsTON/PT</h1>
            <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="buy">Buy PT</option>
                <option value="sell">Sell PT</option>
            </select>
            <input
                type="text"
                placeholder="Enter amount to swap"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)} // Update state on input change
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleSwapClick}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Swap
            </button>
        </div>
    );
};

export default SwapTokensPT;
