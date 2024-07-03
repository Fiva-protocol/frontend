import { useEffect, useState } from "react";
import { Master } from "../contracts/Master";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

// Simple in-memory cache
const dataCache: { [key: string]: bigint | null } = {};

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

      // Check if the value is already in the cache
      const cacheKey = fivaContract.address.toString();
      if (dataCache[cacheKey] !== undefined) {
        setIndexData(dataCache[cacheKey]);
        return;
      }

      // Fetch the value if not in the cache
      setIndexData(null);
      const val = await fivaContract.getIndex();
      dataCache[cacheKey] = val;  // Store the fetched value in the cache
      setIndexData(val);
    }
    getValue();
  }, [fivaContract]);

  return { 
    index,
    date: new Date("2024-12-31") 
  };
}
