import { useState, useEffect } from "react";
import { Address, OpenedContract, toNano, fromNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";
import { useFivaData } from "./useFivaData";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");
const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const PTAddress = "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK";

interface ImpliedApyResult {
  exchangeRate: number;
  impliedApy: number;
}

// Simple in-memory cache
const cache: { [key: string]: ImpliedApyResult | null } = {};

export function useImpliedApy() {
  const client = useTonClient();
  const { index, date } = useFivaData();
  const [result, setResult] = useState<ImpliedApyResult | null>(null);

  const factory = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
    return client.open(contract) as OpenedContract<Factory>;
  }, [client]);

  useEffect(() => {
    async function calculateImpliedApy() {
      if (!factory || !client || !index) return;

      // Cache key based on index and date
      const cacheKey = `${index.toString()}-${date.toISOString()}`;
      if (cache[cacheKey]) {
        setResult(cache[cacheKey]);
        return;
      }

      const assetIn = Asset.jetton(Address.parse(tsTONAddress));
      const assetOut = Asset.jetton(Address.parse(PTAddress));
      const amountInNano = toNano("1");
      const timeToExpiry = (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365); // Time to expiry in years
      const normalizedIndex = Number(index) / 1000;

      try {
        const pool = client.open(
          await factory.getPool(PoolType.VOLATILE, [assetIn, assetOut])
        );

        const response = await pool.getEstimatedSwapOut({
          assetIn: assetIn,
          amountIn: amountInNano
        });

        const amountOut = response.amountOut;
        const exchangeRate = Number(fromNano(amountOut)) / 1; // Since amountIn is always 1
        
        const impliedRate = Math.pow(exchangeRate, 1 / timeToExpiry);
        const impliedApy = Math.pow(impliedRate, normalizedIndex) - 1;

        const result = {
          exchangeRate: exchangeRate,
          impliedApy: impliedApy,
        };

        // Store the result in the cache
        cache[cacheKey] = result;

        setResult(result);
      } catch (error) {
        console.error("Error calculating implied APY:", error);
      }
    }

    calculateImpliedApy();
  }, [factory, client, index, date]);

  return result;
}
