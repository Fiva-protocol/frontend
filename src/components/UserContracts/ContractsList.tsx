import { useEffect, useState } from 'react';
import { CollectUserContractAddresses } from '../../api/indexer';
import { ContractItem } from './ContractItem';

export const ContractsList = () => {
    const [contracts, setContracts] = useState<string[]>([]);

    useEffect(() => {
        async function fetchUserContracts() {
            setContracts(await CollectUserContractAddresses(10));
        }
        fetchUserContracts();
    }, []);

    return (
        <div className="mx-5">
            <h1 className="text-2xl m-7">All contracts with orders:</h1>
            <ul className="list-disc mx-4">
                {contracts.map((c, i) => (
                    <ContractItem key={i} address={c} />
                ))}
            </ul>
        </div>
    );
};
