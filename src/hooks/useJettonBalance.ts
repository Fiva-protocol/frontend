import { useEffect, useState, useCallback } from "react";
import { Address, OpenedContract } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useJettonMinter } from "./useJettonMinter";
import { JettonWallet } from "../contracts/JettonWallet";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useJettonBalance(jettonMinterAddress: string, userAddress: string) {
  const client = useTonClient();
  const [balance, setBalance] = useState<bigint | null>(null);

  const { jettonWalletAddress } = useJettonMinter(Address.parse(jettonMinterAddress), Address.parse(userAddress));

  const jettonWallet = useAsyncInitialize(async () => {
    if (!client || !jettonWalletAddress) return null;
    const contract = new JettonWallet(jettonWalletAddress);
    return client.open(contract) as OpenedContract<JettonWallet>;
  }, [client, jettonWalletAddress]);

  const getBalance = useCallback(async () => {
    if (!jettonWallet || !jettonWalletAddress) return;

    const walletBalance = await jettonWallet.getBalance();
    setBalance(walletBalance);
  }, [jettonWallet]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
}
