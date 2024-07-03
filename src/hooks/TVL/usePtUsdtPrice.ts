import { useState, useEffect } from "react";
import useTonUsdtPrice from "./useTonUsdtPrice";
import { useEstimateSwap } from "../useEstimateSwap";

const tsTONAddress = "kQCwR07mEDg22t_TYI1oXrb5lRkRUBtmJSjpKGdw_TL2B4yf";
const PTAddress = "EQDrQ70VeQ1X8xzszOHVRLq7tAMDrSnPY54O0VKGxZSkAESK";

const cache: { [key: string]: { ptPrice: number, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const usePtUsdtPrice = () => {
  const { price: tonPrice, loading: tonLoading, error: tonError } = useTonUsdtPrice();
  const [ptPrice, setPtPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const estimateResult = useEstimateSwap(PTAddress, "1", tsTONAddress);

  useEffect(() => {
    const fetchPtPrice = async () => {
      const cacheKey = 'ptUsdtPrice';
      const now = Date.now();

      // Check if cached value exists and is still valid
      if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        setPtPrice(cache[cacheKey].ptPrice);
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
        const ptToTonRate = Number(amountOut) / 1e9; // Converting from Nano to regular value
        const calculatedPtPrice = tonPrice * ptToTonRate;

        // Update cache
        cache[cacheKey] = {
          ptPrice: calculatedPtPrice,
          timestamp: now
        };

        setPtPrice(calculatedPtPrice);
        setLoading(false);
      }
    };

    fetchPtPrice();
  }, [tonPrice, estimateResult, tonLoading, tonError]);

  return { ptPrice, loading, error };
};

export default usePtUsdtPrice;
