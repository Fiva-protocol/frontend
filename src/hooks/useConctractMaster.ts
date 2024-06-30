import { Master } from "../contracts/Master";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { useState, useEffect } from "react";

export function useConctractMaster(JettonMasterAddress: Address, address: Address) {
  const client = useTonClient();

  const [contractAddress, setContractAddress] =  useState<Address | null>(null);

  const fivaMaster = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Master(
        JettonMasterAddress // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Master>;
  }, [client]);

  // console.log(tstonMaster?.address)
    useEffect(() => {
      async function getValue() {
        if (!fivaMaster) return;
        setContractAddress(null);
        const val = await fivaMaster.getWalletAddress(address);
        setContractAddress(val);
      }
      getValue();
    }, [fivaMaster]);



  return {
    contractAddress : contractAddress
  };
}