import { useState, useEffect, useCallback } from "react";
import { Address, OpenedContract } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";
import { JettonWallet } from "../contracts/JettonWallet";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");

export function useLPBalance(asset1Address: string, asset2Address: string, userAddress: string) {
  const client = useTonClient();
  const [balance, setBalance] = useState<bigint | null>(null);

  const factory = useAsyncInitialize(async () => {
    if (!client) return null;
    const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
    return client.open(contract) as OpenedContract<Factory>;
  }, [client]);

  const getBalance = useCallback(async () => {
    if (!factory || !client || !userAddress) return;

    const asset1 = Asset.jetton(Address.parse(asset1Address));
    const asset2 = Asset.jetton(Address.parse(asset2Address));
    const userAddr = Address.parse(userAddress);

    try {
      const pool = client.open(
        await factory.getPool(PoolType.VOLATILE, [asset1, asset2])
      );

      const poolWallet = await pool.getWallet(userAddr);

      const walletContract = new JettonWallet(poolWallet.address);
      const openedWallet = client.open(walletContract) as OpenedContract<JettonWallet>;

      const walletBalance = await openedWallet.getBalance();
      setBalance(walletBalance);
    } catch (error) {
      console.error("Error getting wallet balance:", error);
    }
  }, [factory, client, asset1Address, asset2Address, userAddress]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
}
