import { Address, beginCell, toNano } from '@ton/core';
import { TonConnectUI } from '@tonconnect/ui-react';
import { Opcodes } from './Opcodes';

export async function redeem(
    tonConnectUI: TonConnectUI,
    userWalletAddress: Address,
    toAddress:Address,
    viaAddress:Address,
    fwdAmount:bigint,
    jettonAmount: bigint,
    contractPTAddress: Address,
    contractYTAddress: Address,
    masterTstonAddress: Address,
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
            .storeAddress(toAddress) // user contract address
            .storeAddress(viaAddress)
            .storeUint(0, 1)
            .storeCoins(fwdAmount)
            .storeUint(0, 1)
            .storeRef(
                beginCell()
                .storeUint(Opcodes.redeem, 32)
                .storeUint(Date.now(), 64)
                .storeAddress(contractPTAddress)
                .storeAddress(contractYTAddress)
                .storeAddress(masterTstonAddress)
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
