import { useState, useEffect } from "react";
import { Address, OpenedContract } from "@ton/core";
import { useTonClient } from "../useTonClient";
import { useAsyncInitialize } from "../useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");

const cache: { [key: string]: { fee: number, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useTradeFee(asset1Address: string, asset2Address: string) {
  const client = useTonClient();
  const [tradeFee, setTradeFee] = useState<number | null>(null);

  const factory = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
    return client.open(contract) as OpenedContract<Factory>;
  }, [client]);

  useEffect(() => {
    async function fetchTradeFee() {
      if (!factory || !client) return;

      const cacheKey = `${asset1Address}_${asset2Address}`;
      const now = Date.now();

      // Check if cached value exists and is still valid
      if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        setTradeFee(cache[cacheKey].fee);
        return;
      }

      const asset1 = Asset.jetton(Address.parse(asset1Address));
      const asset2 = Asset.jetton(Address.parse(asset2Address));

      try {
        const pool = client.open(
          await factory.getPool(PoolType.VOLATILE, [asset1, asset2])
        );

        const fee = await pool.getTradeFee();

        setTradeFee(fee);

        // Update cache
        cache[cacheKey] = {
          fee: fee,
          timestamp: now
        };
      } catch (error) {
        console.error("Error fetching trade fee:", error);
      }
    }

    fetchTradeFee();
  }, [factory, client, asset1Address, asset2Address]);

  return tradeFee;
}
