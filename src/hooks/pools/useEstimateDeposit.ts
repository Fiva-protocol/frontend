import { useState, useEffect } from "react";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "../useTonClient";
import { useAsyncInitialize } from "../useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");

interface EstimateDepositOutResult {
  deposits: [bigint, bigint];
  fairSupply: bigint;
}

export function useEstimateDepositOut(asset1Address: string, amount1: string, asset2Address: string, amount2: string) {
  const client = useTonClient();
  const [result, setResult] = useState<EstimateDepositOutResult | null>(null);

  const factory = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
    return client.open(contract) as OpenedContract<Factory>;
  }, [client]);

  useEffect(() => {
    async function estimateDepositOut() {
      if (!factory || !client) return;

      const asset1 = Asset.jetton(Address.parse(asset1Address));
      const asset2 = Asset.jetton(Address.parse(asset2Address));
      const amount1Nano = toNano(amount1);
      const amount2Nano = toNano(amount2);

      try {
        const pool = client.open(
          await factory.getPool(PoolType.VOLATILE, [asset1, asset2])
        );

        const response = await pool.getEstimateDepositOut([amount1Nano, amount2Nano]);

        setResult({
          deposits: response.deposits,
          fairSupply: response.fairSupply,
        });
      } catch (error) {
        console.error("Error estimating deposit out:", error);
      }
    }

    estimateDepositOut();
  }, [factory, client, asset1Address, amount1, asset2Address, amount2]);

  return result;
}
