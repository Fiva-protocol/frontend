import { useState, useEffect } from "react";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Factory, Asset, PoolType } from "@dedust/sdk";

const FACTORY_TESTNET_ADDR = Address.parse("EQDHcPxlCOSN_s-Vlw53bFpibNyKpZHV6xHhxGAAT_21nCFU");

interface EstimateSwapResult {
  assetOut: string;
  amountOut: bigint;
  tradeFee: bigint;
}


export function useEstimateSwap(assetInAddress: string, amountIn: string, assetOutAddress: string) {
    const client = useTonClient();
    const [result, setResult] = useState<EstimateSwapResult | null>(null);
  
    const factory = useAsyncInitialize(async () => {
      if (!client) return null;
      const contract = Factory.createFromAddress(FACTORY_TESTNET_ADDR);
      return client.open(contract) as OpenedContract<Factory>;
    }, [client]);
  
    useEffect(() => {
      async function estimateSwap() {
        if (!factory || !client) return;
  
        const assetIn = Asset.jetton(Address.parse(assetInAddress));
        const assetOut = Asset.jetton(Address.parse(assetOutAddress));
        const amountInNano = toNano(amountIn);
  
        try {
          const pool = client.open(
            await factory.getPool(PoolType.VOLATILE, [assetIn, assetOut])
          );
  
          const response = await pool.getEstimatedSwapOut({
            assetIn: assetIn,
            amountIn: amountInNano
          });
  
          const asset_out = response.assetOut
          const amount_out = response.amountOut;
          const trade_fee = response.tradeFee;
  
          setResult({
            assetOut: asset_out.toString(),
            amountOut: amount_out,
            tradeFee: trade_fee,
          });
        } catch (error) {
          console.error("Error estimating swap:", error);
        }
      }
  
      estimateSwap();
    }, [factory, client, assetInAddress, amountIn, assetOutAddress]);
  
    return result;
  }