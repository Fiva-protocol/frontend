import { FC } from 'react';
import { Address, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { MintPTYT } from '../api/mintPTYT';


interface MintProps {}

const MintFiva: FC<MintProps> = ({}) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();

    const onClick = () => {
        if (userAddress) {
            const masterAddr = Address.parse('EQBwKHH77hKzDcaDgcbqHOWvDOHLZ8ItRkl34TxqSfRyggna');
            const ytAddr = Address.parse('EQCbNMzxiIDNVbqH3-t1CVPfX7YwdA3gGg0V2Xec7rVCGUGm');
            const ptAddr =Address.parse('EQA7y4XyByQkri_JIxfn4jBU-DzoDGfhIVavR_eMj3RHLKa_');


            MintPTYT(tonConnectUI, masterAddr,ytAddr, ptAddr, Address.parse(userAddress), toNano(10))
                .then(() => console.log('successfully sent transaction'))
                .catch(console.error);
        }
    };

    return (
        <div className="flex flex-col my-10 mx-5">
            <h1 className="text-2xl mb-2">Mint testnet PT/YT tokens</h1>
            <button
                onClick={onClick}
                className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            >
                Mint 10 PT/YT tsTON
            </button>
        </div>
    );
};

export default MintFiva;
