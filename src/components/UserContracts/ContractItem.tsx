interface ContractItemProps {
    address: string;
}

export const ContractItem = ({ address }: ContractItemProps) => {
    return (
        <li>
            <a
                className="m-1 underline text-sm text-blue-600 hover:text-blue-800 visited:text-purple-600"
                href={`/ui?address=${address}`}
            >
                {MinimizeAddress(address)}
            </a>
        </li>
    );
};

function MinimizeAddress(address: string): string {
    return `${address.substring(0, 8)}...${address.substring(40)}`;
}
