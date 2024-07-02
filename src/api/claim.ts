import { Address, beginCell, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';

export async function claim (
    tonConnectUI: TonConnectUI,
    masterAddress: Address,
    tstonMasterAddress:Address,
    amount:bigint,

) {
    const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages:[
           { amount: toNano(0.2).toString(),
            address: masterAddress.toString(), // master address
            payload: beginCell()
            .storeUint(778, 32)
            .storeUint(Date.now(), 64)
            .storeCoins(amount) // not important
            .storeAddress(tstonMasterAddress) // tston master address
            .endCell()
            .toBoc()
            .toString('base64')
            },
        ],

    });


    console.log(`Result is: ${result.boc}`);
}
