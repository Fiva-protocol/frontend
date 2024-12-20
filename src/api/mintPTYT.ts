import { Address, beginCell, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';
import { Opcodes } from './Opcodes';

export async function MintPTYT(
    tonConnectUI: TonConnectUI,
    userWalletAddress: Address,
    toAddress:Address,
    viaAddress:Address,
    fwdAmount:bigint,
    jettonAmount: bigint,
    yieldMinterAddress: Address,
    principleMinterAddress: Address,
    userAddress: Address,
) {
    const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages:[
           { amount: toNano(0.2).toString(),
            address: userWalletAddress.toString(),
            payload: beginCell()
            .storeUint(0xf8a7ea5, 32)
            .storeUint(Date.now(), 64)
            .storeCoins(jettonAmount)
            .storeAddress(toAddress)
            .storeAddress(viaAddress)
            .storeUint(0, 1)
            .storeCoins(fwdAmount)
            .storeUint(0, 1)
            .storeRef(
                beginCell()
                .storeUint(Opcodes.supply, 32)
                .storeUint(11, 64)
                .storeAddress(userAddress)
                .storeCoins(jettonAmount)
                .storeAddress(yieldMinterAddress)
                .storeAddress(principleMinterAddress)
                .endCell()
            )
            .endCell()
            .toBoc()
            .toString('base64')
            },
        ],

    });


    console.log(`Result is: ${result.boc}`);
}
