import { Address, beginCell, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';

export async function MintToken(
    tonConnectUI: TonConnectUI,
    tokenAddr: Address,
    receiverAddr: Address,
    jettonAmount: bigint
) {
    const res = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
            {
                amount: toNano(0.2).toString(),
                address: tokenAddr.toString(),
                payload: beginCell()
                    .storeUint(21, 32)
                    .storeUint(123, 64) // query_id
                    .storeAddress(receiverAddr)
                    .storeCoins(toNano(0.1))
                    .storeRef(
                        beginCell()
                            .storeUint(0x178d4519, 32)
                            .storeUint(123, 64) // query_id
                            .storeCoins(jettonAmount)
                            .storeAddress(tokenAddr)
                            .storeAddress(tokenAddr)
                            .storeCoins(0)
                            .storeUint(0, 1)
                            .endCell()
                    )
                    .endCell()
                    .toBoc()
                    .toString('base64'),
            },
        ],
    });

    console.log(`Result is: ${res.boc}`);
}
