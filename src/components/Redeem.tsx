import { FC, useState } from 'react';
import { Address, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { redeem } from '../api/redeem';
import { useJettonMinter } from '../hooks/useJettonMinter';
import { useConctractMaster } from '../hooks/useConctractMaster';

interface MintProps {}

const RedeemFiva: FC<MintProps> = ({}) => {
    const masterAddress = Address.parse('EQAHmEAgPST8XV4GN6r6E4NesuLs7lDbzsSW1ougMxItut9S');
    const yieldMinterAddress = Address.parse('EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW');
    const principleMinterAddress = Address.parse('EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK');
    const tstonMinter =Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf')

    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();
    const userAddressParse = Address.parse(userAddress);

    const { contractAddress } = useConctractMaster(masterAddress, userAddressParse);
    const { jettonWalletAddress: userYTWallet } = useJettonMinter(yieldMinterAddress, userAddressParse);
    const { jettonWalletAddress: userPTWallet } = useJettonMinter(principleMinterAddress, userAddressParse);
    const { jettonWalletAddress: contracYTWallet } = useJettonMinter(yieldMinterAddress, contractAddress!);
    const { jettonWalletAddress: contractPTWallet } = useJettonMinter(principleMinterAddress, contractAddress!);
    const { jettonWalletAddress: masterTstonAddress} = useJettonMinter(tstonMinter,masterAddress);
    
    console.log(contractAddress?.toString());

    const [inputValue, setInputValue] = useState<string>('');  // State to manage user input

    const onClickFirst = async () => {
        if (userAddress) {
            const amount = toNano(inputValue);  // Convert user input to Nano

            try {
                await redeem(
                    tonConnectUI,
                    userYTWallet!, // user jetton wallet address
                    contractAddress!, // contract address
                    userAddressParse!, // who execesses
                    toNano(0.15),
                    amount,  // Jetton amount
                    contractPTWallet!, // contractPTAddress
                    contracYTWallet!, // contractYTAddress
                    masterTstonAddress! // masterTstonAddress
                );
                console.log('First transaction successfully sent');
            } catch (error) {
                console.error('Error in first transaction:', error);
            }
        }
    };

    const onClickSecond = async () => {
        if (userAddress) {
            const amount = toNano(inputValue);  // Convert user input to Nano

            try {
                await redeem(
                    tonConnectUI,
                    userPTWallet!, // user jetton wallet address
                    contractAddress!, // contract address
                    contractAddress!, // doesn't matter
                    toNano(0.15),
                    amount,  // Jetton amount
                    contractPTWallet!, // contractPTAddress
                    contracYTWallet!, // contractYTAddress
                    masterTstonAddress! // masterTstonAddress
                );
                console.log('Second transaction successfully sent');
            } catch (error) {
                console.error('Error in second transaction:', error);
            }
        }
    };

    return (
        <div className="flex flex-col my-10 mx-5">
            <h1 className="text-2xl mb-2">Redeem testnet PT/YT tokens</h1>
            <input
                type="text"
                placeholder="Enter amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}  // Update state on input change
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={onClickFirst}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Redeem {inputValue || 0} YT tsTON  {/* Display user input or default value */}
            </button>
            <button
                onClick={onClickSecond}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
                Redeem {inputValue || 0} PT tsTON  {/* Display user input or default value */}
            </button>
        </div>
    );
};

export default RedeemFiva;
