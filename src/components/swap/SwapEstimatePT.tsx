import React, { useEffect, useState } from "react";
import { useEstimateSwap } from "../../hooks/useEstimateSwap";
import { fromNano } from "@ton/core";

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const PTAddress = "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK";

interface SwapEstimatorPTProps {
  subTab: 'buy' | 'sell';
  amountIn: string;
}

const SwapEstimatorPT: React.FC<SwapEstimatorPTProps> = ({ subTab, amountIn }) => {
  const [result, setResult] = useState<{
    assetOut: string;
    amountOut: bigint;
    tradeFee: bigint;
  } | null>(null);

  const swapType = subTab === 'buy' ? "PT to tsTON" : "tsTON to PT";

  const assetIn = swapType === "PT to tsTON" ? PTAddress : tsTONAddress;
  const assetOut = swapType === "PT to tsTON" ? tsTONAddress : PTAddress;

  const estimateResult = useEstimateSwap(assetIn, amountIn, assetOut);

  useEffect(() => {
    setResult(estimateResult);
  }, [estimateResult]);

  return (
    <div className="flex flex-col my-10 mx-5">
      <h1 className="text-2xl mb-2">{subTab === 'buy' ? 'Buying PT' : 'Selling PT'}</h1>
      {result ? (
        <div className="mb-4 p-2 border border-gray-300 rounded">
          <p>Amount Out: {fromNano(result.amountOut.toString())}</p>
          <p>Trade Fee: {fromNano(result.tradeFee.toString())}</p>
        </div>
      ) : (
        <div className="mb-4 p-2 border border-gray-300 rounded">Loading...</div>
      )}
    </div>
  );
};

export default SwapEstimatorPT;
