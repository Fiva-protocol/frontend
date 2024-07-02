import { useState, useEffect } from "react";
import { Address, OpenedContract } from "@ton/core";
import { useTonClient } from "../useTonClient";
import { useAsyncInitialize } from "../useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");

interface PoolReserves {
  reserve1: bigint;
  reserve2: bigint;
}

export function usePoolReserves(asset1Address: string, asset2Address: string) {
  const client = useTonClient();
  const [reserves, setReserves] = useState<PoolReserves | null>(null);

  const factory = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
    return client.open(contract) as OpenedContract<Factory>;
  }, [client]);

  useEffect(() => {
    async function fetchReserves() {
      if (!factory || !client) return;

      const asset1 = Asset.jetton(Address.parse(asset1Address));
      const asset2 = Asset.jetton(Address.parse(asset2Address));

      try {
        const pool = client.open(
          await factory.getPool(PoolType.VOLATILE, [asset1, asset2])
        );

        const response = await pool.getReserves();

        setReserves({
          reserve1: response[0],
          reserve2: response[1],
        });
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    }

    fetchReserves();
  }, [factory, client, asset1Address, asset2Address]);

  return reserves;
}
