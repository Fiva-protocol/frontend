import { useState, useCallback } from 'react';
import { Asset, Factory, JettonRoot, PoolType, VaultJetton } from '@dedust/sdk';
import { toNano } from '@ton/core';
import { Address, SenderArguments, Sender } from '@ton/ton';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useTonClient } from '../useTonClient';

const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');
const FACTORY_TESTNET_ADDR = Address.parse('EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU');

export const useProvideLiquidity = (assetAddressStr: string) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();
    const tonClient = useTonClient();

    const assetAddress = Address.parse(assetAddressStr);

    const [tsTONAmount, setTsTONAmount] = useState<string>('5');
    const [assetAmount, setAssetAmount] = useState<string>('5');

    const createSender = useCallback((): Sender => {
        return {
            send: async (args: SenderArguments): Promise<void> => {
                const transaction = {
                    validUntil: Math.floor(Date.now() / 1000) + 60,
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
    }, [tonConnectUI, userAddress]);

    const handleTsTONClick = useCallback(async () => {
        if (userAddress && tonClient) {
            const sender = createSender();
            const tsTONAmountBN = toNano(tsTONAmount);

            const tsTON = Asset.jetton(tsTONAddress);
            const asset = Asset.jetton(assetAddress);
            const assets: [Asset, Asset] = [tsTON, asset];
            const targetBalances: [bigint, bigint] = [tsTONAmountBN, toNano(assetAmount)];

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
    }, [createSender, userAddress, tonClient, tsTONAmount, assetAmount]);

    const handleAssetClick = useCallback(async () => {
        if (userAddress && tonClient) {
            const sender = createSender();
            const assetAmountBN = toNano(assetAmount);

            const tsTON = Asset.jetton(tsTONAddress);
            const asset = Asset.jetton(assetAddress);
            const assets: [Asset, Asset] = [tsTON, asset];
            const targetBalances: [bigint, bigint] = [toNano(tsTONAmount), assetAmountBN];

            const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
            const assetVault = tonClient.open(await factory.getJettonVault(assetAddress));
            const assetRoot = tonClient.open(JettonRoot.createFromAddress(assetAddress));
            const userAssetWallet = tonClient.open(await assetRoot.getWallet(Address.parse(userAddress)));

            try {
                await userAssetWallet.sendTransfer(sender, toNano('0.6'), {
                    amount: assetAmountBN,
                    destination: assetVault.address,
                    responseAddress: Address.parse(userAddress),
                    forwardAmount: toNano('0.5'),
                    forwardPayload: VaultJetton.createDepositLiquidityPayload({
                        poolType: PoolType.VOLATILE,
                        assets,
                        targetBalances,
                    }),
                });
                console.log(`${assetAddressStr} transaction successfully sent`);
            } catch (error) {
                console.error(`Error in ${assetAddressStr} transaction:`, error);
            }
        }
    }, [createSender, userAddress, tonClient, tsTONAmount, assetAmount]);

    return {
        tsTONAmount,
        setTsTONAmount,
        assetAmount,
        setAssetAmount,
        handleTsTONClick,
        handleAssetClick,
    };
};
