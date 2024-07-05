import { FC } from 'react';
import { Address, toNano } from '@ton/core';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { MintToken } from '../api/mint';

interface MintProps {}

const Mint: FC<MintProps> = ({}) => {
    const [tonConnectUI] = useTonConnectUI();
    const userAddress = useTonAddress();

    const onClick = () => {
        if (userAddress) {
            const jettonAddr = Address.parse('EQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2BzcV');
            MintToken(tonConnectUI, jettonAddr, Address.parse(userAddress), toNano(10))
                .then(() => console.log('successfully sent transaction'))
                .catch(console.error);
        }
    };

    return (
   
            <button
                onClick={onClick}
                className="button"
            >
                Get Test Tokens
            </button>
     
    );
};

export default Mint;
