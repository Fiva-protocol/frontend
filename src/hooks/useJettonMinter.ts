import { JettonMinter } from "../contracts/JettonMinter";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useState, useEffect } from "react";

export function useJettonMinter(JettonMinterAddress: Address, address: Address) {
  const client = useTonClient();

  const [userAddress, setUserAddress] =  useState<Address | null>(null);

  const tstonMaster = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new JettonMinter(
      JettonMinterAddress // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<JettonMinter>;
  }, [client]);

  // console.log(tstonMaster?.address)
    useEffect(() => {
      async function getValue() {
        if (!tstonMaster) return;
        setUserAddress(null);
        const val = await tstonMaster.getWalletAddress(address);
        setUserAddress(val);
      }
      getValue();
    }, [tstonMaster]);



  return {
    jettonWalletAddress: userAddress
  };
}