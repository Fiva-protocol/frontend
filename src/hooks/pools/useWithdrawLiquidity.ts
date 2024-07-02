import { useState, useCallback } from "react";
import { Asset, Factory, PoolType } from "@dedust/sdk";
import { toNano } from "@ton/core";
import { Address, SenderArguments, Sender } from "@ton/ton";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonClient } from "../useTonClient";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");
const tsTONAddress = Address.parse('kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf');

export const useWithdrawLiquidity = (assetAddressStr: string) => {
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const tonClient = useTonClient();
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const assetAddress = Address.parse(assetAddressStr);

  const createSender = useCallback((): Sender => {
    return {
      send: async (args: SenderArguments): Promise<void> => {
        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64") || "",
            },
          ],
        };

        await tonConnectUI.sendTransaction(transaction);
      },
    };
  }, [tonConnectUI]);

  const handleWithdrawClick = useCallback(async () => {
    if (userAddress && tonClient && withdrawAmount) {
      const sender = createSender();

      const tsTON = Asset.jetton(tsTONAddress);
      const asset = Asset.jetton(assetAddress);

      const factory = tonClient.open(Factory.createFromAddress(FACTORY_TESTNET_ADDR));
      const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [tsTON, asset]));
      const lpWallet = tonClient.open(await pool.getWallet(Address.parse(userAddress)));

      try {
        const amountToWithdraw = toNano(withdrawAmount);
        await lpWallet.sendBurn(sender, toNano("0.2"), {
          amount: amountToWithdraw,
        });
        console.log("Withdrawal transaction successfully sent");
      } catch (error) {
        console.error("Error in withdrawal transaction:", error);
      }
    }
  }, [createSender, userAddress, tonClient, withdrawAmount, assetAddress]);

  return {
    withdrawAmount,
    setWithdrawAmount,
    handleWithdrawClick,
  };
};
