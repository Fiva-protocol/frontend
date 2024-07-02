import { useState, useEffect } from "react";
import useTonUsdtPrice from "./useTonUsdtPrice";
import { useEstimateSwap } from "../useEstimateSwap";

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const YTAddress = "EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW";

const useYtUsdtPrice = () => {
  const { price: tonPrice, loading: tonLoading, error: tonError } = useTonUsdtPrice();
  const [ytPrice, setYtPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const estimateResult = useEstimateSwap(YTAddress, "1", tsTONAddress);

  useEffect(() => {
    if (tonLoading || !estimateResult) return;

    if (tonError) {
      setError(tonError);
      setLoading(false);
      return;
    }

    const { amountOut } = estimateResult;

    if (tonPrice !== null) {
      const ytToTonRate = Number(amountOut) / 1e9; // Converting from Nano to regular value
      const calculatedYtPrice = tonPrice * ytToTonRate;
      setYtPrice(calculatedYtPrice);
      setLoading(false);
    }
  }, [tonPrice, estimateResult, tonLoading, tonError]);

  return { ytPrice, loading, error };
};

export default useYtUsdtPrice;
