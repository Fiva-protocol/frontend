import { useEffect, useState } from "react";
import { Master } from "../contracts/Master";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

export function useFivaData() {
  const client = useTonClient();
  const [index, setIndexData] = useState<null | BigInt>(null);

  const fivaContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Master(
      Address.parse("EQAHmEAgPST8XV4GN6r6E4NesuLs7lDbzsSW1ougMxItut9S")
    );
    return client.open(contract) as OpenedContract<Master>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!fivaContract) return;
      setIndexData(null);
      const val = await fivaContract.getIndex();
      setIndexData(val);
    }
    getValue();
  }, [fivaContract]);

  return { 
    index,
    date: new Date("2024-12-31") 
  };
}
