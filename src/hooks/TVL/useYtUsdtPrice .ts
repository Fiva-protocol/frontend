import { useState, useEffect } from "react";
import useTonUsdtPrice from "./useTonUsdtPrice";
import { useEstimateSwap } from "../useEstimateSwap";

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const YTAddress = "EQDsmCkmupqZ9mKad3BMQg-LEI5Br5PV0pBZvAH11_Du-xcW";

const cache: { ytPrice: number | null, timestamp: number | null } = {
  ytPrice: null,
  timestamp: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useYtUsdtPrice = () => {
  const { price: tonPrice, loading: tonLoading, error: tonError } = useTonUsdtPrice();
  const [ytPrice, setYtPrice] = useState<number | null>(cache.ytPrice);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const estimateResult = useEstimateSwap(YTAddress, "1", tsTONAddress);

  useEffect(() => {
    const fetchYtPrice = async () => {
      const now = Date.now();

      if (cache.ytPrice !== null && cache.timestamp !== null && (now - cache.timestamp < CACHE_DURATION)) {
        setYtPrice(cache.ytPrice);
        setLoading(false);
        return;
      }

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

        // Update the cache
        cache.ytPrice = calculatedYtPrice;
        cache.timestamp = now;

        setYtPrice(calculatedYtPrice);
        setLoading(false);
      }
    };

    fetchYtPrice();
  }, [tonPrice, estimateResult, tonLoading, tonError]);

  return { ytPrice, loading, error };
};

export default useYtUsdtPrice;
