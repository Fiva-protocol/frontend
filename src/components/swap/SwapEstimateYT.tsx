import React, { useEffect, useState } from "react";
import { useEstimateSwap } from "../../hooks/useEstimateSwap";
import { fromNano } from "@ton/core";

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const YTAddress = "EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW";

interface SwapEstimatorYTProps {
  subTab: 'buy' | 'sell';
  amountIn: string;
}

const SwapEstimatorYT: React.FC<SwapEstimatorYTProps> = ({ subTab, amountIn }) => {
  const [result, setResult] = useState<{
    assetOut: string;
    amountOut: bigint;
    tradeFee: bigint;
  } | null>(null);

  const swapType = subTab === 'buy' ? "YT to tsTON" : "tsTON to YT";

  const assetIn = swapType === "YT to tsTON" ? YTAddress : tsTONAddress;
  const assetOut = swapType === "YT to tsTON" ? tsTONAddress : YTAddress;

  const estimateResult = useEstimateSwap(assetIn, amountIn, assetOut);

  useEffect(() => {
    setResult(estimateResult);
  }, [estimateResult]);

  return (
    <div className="flex flex-col my-10 mx-5">
      <h1 className="text-2xl mb-2">Swap Estimator - {subTab === 'buy' ? 'Buying YT' : 'Selling YT'}</h1>
      {result ? (
        <div className="mb-4 p-2 border border-gray-300 rounded">
          <strong>Estimated Swap Result:</strong>
          <p>Asset Out: {result.assetOut}</p>
          <p>Amount Out: {fromNano(result.amountOut.toString())}</p>
          <p>Trade Fee: {fromNano(result.tradeFee.toString())}</p>
        </div>
      ) : (
        <div className="mb-4 p-2 border border-gray-300 rounded">Loading...</div>
      )}
    </div>
  );
};

export default SwapEstimatorYT;
