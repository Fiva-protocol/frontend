import React, { FC, useState } from 'react';
import { Address, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { MintPTYT } from '../api/mintPTYT';
import { useJettonMinter } from '../hooks/useJettonMinter';

interface MintProps {
    inputValue: number;
}

const MintFiva: FC<MintProps> = ({ inputValue }) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();
    const jettonMinterAddress = Address.parse("kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf");
    const { jettonWalletAddress } = useJettonMinter(jettonMinterAddress, Address.parse(userAddress));

    const onClick = async () => {
        if (userAddress && jettonWalletAddress) {
            const masterAddress = Address.parse('EQAHmEAgPST8XV4GN6r6E4NesuLs7lDbzsSW1ougMxItut9S');
            const yieldMinterAddress = Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW');
            const principleMinterAddress = Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK');
            const amount = toNano(inputValue);  // Конвертируем ввод пользователя в Nano

            try {
                await MintPTYT(
                    tonConnectUI,
                    jettonWalletAddress,
                    masterAddress,
                    jettonWalletAddress,
                    toNano(0.15),
                    amount,  // Используем введенное пользователем значение
                    yieldMinterAddress,
                    principleMinterAddress,
                    Address.parse(userAddress)
                );
                console.log('successfully sent transaction');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex flex-col my-10 mx-5">
            <button
                onClick={onClick}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Mint {inputValue || 10} PT/YT tsTON  {/* Отображаем ввод пользователя или значение по умолчанию */}
            </button>
        </div>
    );
};

export default MintFiva;
