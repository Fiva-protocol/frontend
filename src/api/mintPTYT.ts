import { Address, beginCell, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';

export async function MintPTYT(
    tonConnectUI: TonConnectUI,
    masterAddress: Address,
    YTAddress:Address,
    PTAddress:Address,
    userAddress:Address,
    jettonAmount: bigint
) {
    const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages:[
           { amount: toNano(0.2).toString(),
            address: masterAddress.toString(),
            payload: beginCell()
            .storeUint(12, 32)
            .storeUint(123, 64)
            .storeAddress(YTAddress)
            .storeAddress(PTAddress)
            .storeAddress(userAddress)
            .storeCoins(toNano(0.2))
            .storeCoins(jettonAmount)
            .endCell()
            .toBoc()
            .toString('base64')
            },
        ],

    });

    console.log(`Result is: ${result.boc}`);
}
